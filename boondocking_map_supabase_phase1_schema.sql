-- Tod's Boondocking & Camping Maps — Supabase Phase 1 SAFE v2
-- Project-specific account/community tables for the shared Supabase project.
-- Creates/updates: profiles, favorites/visited/loved, site comments, and correction submissions.
-- No storage buckets are created in this phase.
-- Safety notes:
--   * No DROP TABLE / DELETE / TRUNCATE statements.
--   * Only project-prefixed policies/triggers/functions are dropped/replaced.
--   * User profile updates do NOT allow users to promote themselves to moderator/admin.

-- v23.1.87 note: this migration intentionally creates the boondocking_map_*
-- community tables in the public schema. The deployed app config.js must use
-- schema: 'public' unless this SQL is deliberately rewritten to create the
-- same tables in another exposed Supabase API schema. A mismatch such as
-- config.js schema 'camping' with public.* tables causes PostgREST schema-cache
-- errors like: Could not find the table 'camping.boondocking_map_site_favorites'.

-- v23.1.88 note: adds admin bootstrap/elevation tools and admin hidden-site flags.
-- Primary admin bootstrap email: tpoirier@nmu.edu.
-- Re-run this migration after installing v23.1.88 so the admin RPC and hidden-site
-- flag table exist before using the new Admin panel.

create extension if not exists pgcrypto;

create table if not exists public.boondocking_map_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.boondocking_map_profiles enable row level security;

-- Helper: staff check. SECURITY DEFINER avoids recursive RLS trouble when policies check role.
create or replace function public.boondocking_map_is_staff(check_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.boondocking_map_profiles p
    where p.id = check_user_id
      and p.role in ('admin','moderator')
  );
$$;

-- Helper: admin check. Use for role-management paths later.
create or replace function public.boondocking_map_is_admin(check_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.boondocking_map_profiles p
    where p.id = check_user_id
      and p.role = 'admin'
  );
$$;

-- Admin helper: elevate an existing Supabase Auth user by email.
-- The target user must already have created an account in Supabase Auth.
create or replace function public.boondocking_map_set_user_role_by_email(target_email text, target_role text default 'admin')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  requester uuid := auth.uid();
  normalized_email text := lower(trim(coalesce(target_email,'')));
  safe_role text := lower(trim(coalesce(target_role,'admin')));
  user_rec record;
begin
  if requester is null or not public.boondocking_map_is_admin(requester) then
    raise exception 'Only boondocking map admins can change user roles';
  end if;
  if normalized_email = '' then
    raise exception 'Target email is required';
  end if;
  if safe_role not in ('user','moderator','admin') then
    raise exception 'Invalid boondocking map role: %', safe_role;
  end if;
  select id, email into user_rec
  from auth.users
  where lower(email) = normalized_email
  limit 1;
  if user_rec.id is null then
    return jsonb_build_object('ok', false, 'message', 'No Supabase Auth user found for ' || normalized_email || '. They must create an account first.');
  end if;
  insert into public.boondocking_map_profiles (id, display_name, role)
  values (user_rec.id, user_rec.email, safe_role)
  on conflict (id) do update
    set role = excluded.role,
        display_name = coalesce(public.boondocking_map_profiles.display_name, excluded.display_name),
        updated_at = now();
  return jsonb_build_object('ok', true, 'email', user_rec.email, 'role', safe_role, 'message', user_rec.email || ' is now ' || safe_role || '.');
end;
$$;

-- Trigger helper for timestamps.
create or replace function public.boondocking_map_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger helper: prevent ordinary users from changing their own role.
-- Admins can change roles through SQL/dashboard or a future admin UI.
create or replace function public.boondocking_map_prevent_self_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if auth.uid() = new.id and not public.boondocking_map_is_admin(auth.uid()) then
      raise exception 'Users may not change their own boondocking map role';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists boondocking_map_profiles_prevent_self_role_escalation on public.boondocking_map_profiles;
create trigger boondocking_map_profiles_prevent_self_role_escalation
before update on public.boondocking_map_profiles
for each row execute function public.boondocking_map_prevent_self_role_escalation();

drop policy if exists boondocking_map_profiles_select_own_or_staff on public.boondocking_map_profiles;
create policy boondocking_map_profiles_select_own_or_staff
on public.boondocking_map_profiles
for select
using (auth.uid() = id or public.boondocking_map_is_staff(auth.uid()));

drop policy if exists boondocking_map_profiles_insert_own on public.boondocking_map_profiles;
create policy boondocking_map_profiles_insert_own
on public.boondocking_map_profiles
for insert
with check (auth.uid() = id and role = 'user');

drop policy if exists boondocking_map_profiles_update_own_display on public.boondocking_map_profiles;
create policy boondocking_map_profiles_update_own_display
on public.boondocking_map_profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Optional admin role update policy for future admin tools/dashboard API.
drop policy if exists boondocking_map_profiles_update_admin on public.boondocking_map_profiles;
create policy boondocking_map_profiles_update_admin
on public.boondocking_map_profiles
for update
using (public.boondocking_map_is_admin(auth.uid()))
with check (public.boondocking_map_is_admin(auth.uid()));

create table if not exists public.boondocking_map_site_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  site_id text not null,
  site_name text,
  state_code text,
  layer text,
  latitude double precision,
  longitude double precision,
  is_favorite boolean not null default true,
  want_to_visit boolean not null default false,
  visited boolean not null default false,
  loved boolean not null default false,
  private_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, site_id)
);

alter table public.boondocking_map_site_favorites add column if not exists site_name text;
alter table public.boondocking_map_site_favorites add column if not exists state_code text;
alter table public.boondocking_map_site_favorites add column if not exists layer text;
alter table public.boondocking_map_site_favorites add column if not exists latitude double precision;
alter table public.boondocking_map_site_favorites add column if not exists longitude double precision;
alter table public.boondocking_map_site_favorites add column if not exists is_favorite boolean not null default true;
alter table public.boondocking_map_site_favorites add column if not exists want_to_visit boolean not null default false;
alter table public.boondocking_map_site_favorites add column if not exists visited boolean not null default false;
alter table public.boondocking_map_site_favorites add column if not exists loved boolean not null default false;
alter table public.boondocking_map_site_favorites add column if not exists private_note text;
alter table public.boondocking_map_site_favorites add column if not exists created_at timestamptz not null default now();
alter table public.boondocking_map_site_favorites add column if not exists updated_at timestamptz not null default now();

create index if not exists boondocking_map_site_favorites_user_idx on public.boondocking_map_site_favorites(user_id);
create index if not exists boondocking_map_site_favorites_site_idx on public.boondocking_map_site_favorites(site_id);

alter table public.boondocking_map_site_favorites enable row level security;

drop policy if exists boondocking_map_site_favorites_select_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_select_own
on public.boondocking_map_site_favorites
for select
using (auth.uid() = user_id);

drop policy if exists boondocking_map_site_favorites_insert_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_insert_own
on public.boondocking_map_site_favorites
for insert
with check (auth.uid() = user_id);

drop policy if exists boondocking_map_site_favorites_update_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_update_own
on public.boondocking_map_site_favorites
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists boondocking_map_site_favorites_delete_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_delete_own
on public.boondocking_map_site_favorites
for delete
using (auth.uid() = user_id);

create table if not exists public.boondocking_map_site_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  site_id text not null,
  site_name text,
  state_code text,
  layer text,
  latitude double precision,
  longitude double precision,
  display_name text,
  comment_text text not null check (char_length(comment_text) between 1 and 2000),
  status text not null default 'visible' check (status in ('visible','hidden','flagged','deleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists boondocking_map_site_comments_site_idx on public.boondocking_map_site_comments(site_id, created_at desc);
create index if not exists boondocking_map_site_comments_user_idx on public.boondocking_map_site_comments(user_id);
create index if not exists boondocking_map_site_comments_status_idx on public.boondocking_map_site_comments(status);

alter table public.boondocking_map_site_comments enable row level security;

drop policy if exists boondocking_map_site_comments_select_visible on public.boondocking_map_site_comments;
create policy boondocking_map_site_comments_select_visible
on public.boondocking_map_site_comments
for select
using (status = 'visible' or auth.uid() = user_id or public.boondocking_map_is_staff(auth.uid()));

drop policy if exists boondocking_map_site_comments_insert_own_visible on public.boondocking_map_site_comments;
create policy boondocking_map_site_comments_insert_own_visible
on public.boondocking_map_site_comments
for insert
with check (auth.uid() = user_id and status = 'visible');

drop policy if exists boondocking_map_site_comments_update_own_or_staff on public.boondocking_map_site_comments;
create policy boondocking_map_site_comments_update_own_or_staff
on public.boondocking_map_site_comments
for update
using (auth.uid() = user_id or public.boondocking_map_is_staff(auth.uid()))
with check (auth.uid() = user_id or public.boondocking_map_is_staff(auth.uid()));

create table if not exists public.boondocking_map_site_corrections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  site_id text,
  site_name text,
  state_code text,
  layer text,
  latitude double precision,
  longitude double precision,
  correction_type text not null check (correction_type in ('coordinates_wrong','camping_no_longer_allowed','closed','amenities_changed','road_inaccessible','fee_changed','seasonal_closure','duplicate','layer_wrong','source_update','other')),
  message text not null check (char_length(message) between 1 and 4000),
  suggested_latitude double precision,
  suggested_longitude double precision,
  status text not null default 'new' check (status in ('new','reviewing','accepted','rejected','needs_more_info','archived')),
  reviewer_note text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.boondocking_map_site_corrections add column if not exists state_code text;
alter table public.boondocking_map_site_corrections add column if not exists layer text;
alter table public.boondocking_map_site_corrections add column if not exists latitude double precision;
alter table public.boondocking_map_site_corrections add column if not exists longitude double precision;
alter table public.boondocking_map_site_corrections add column if not exists message text;

create index if not exists boondocking_map_site_corrections_status_idx on public.boondocking_map_site_corrections(status);
create index if not exists boondocking_map_site_corrections_site_idx on public.boondocking_map_site_corrections(site_id);
create index if not exists boondocking_map_site_corrections_user_idx on public.boondocking_map_site_corrections(user_id);

alter table public.boondocking_map_site_corrections enable row level security;

drop policy if exists boondocking_map_site_corrections_insert_signed_in on public.boondocking_map_site_corrections;
create policy boondocking_map_site_corrections_insert_signed_in
on public.boondocking_map_site_corrections
for insert
with check (auth.uid() = user_id and status = 'new');

drop policy if exists boondocking_map_site_corrections_select_own_or_staff on public.boondocking_map_site_corrections;
create policy boondocking_map_site_corrections_select_own_or_staff
on public.boondocking_map_site_corrections
for select
using (auth.uid() = user_id or public.boondocking_map_is_staff(auth.uid()));

drop policy if exists boondocking_map_site_corrections_update_staff_only on public.boondocking_map_site_corrections;
create policy boondocking_map_site_corrections_update_staff_only
on public.boondocking_map_site_corrections
for update
using (public.boondocking_map_is_staff(auth.uid()))
with check (public.boondocking_map_is_staff(auth.uid()));


create table if not exists public.boondocking_map_site_admin_flags (
  id uuid primary key default gen_random_uuid(),
  site_id text not null unique,
  site_name text,
  state_code text,
  layer text,
  latitude double precision,
  longitude double precision,
  hidden_admin_only boolean not null default false,
  hidden_reason text,
  hidden_by uuid references auth.users(id) on delete set null,
  hidden_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.boondocking_map_site_admin_flags add column if not exists site_name text;
alter table public.boondocking_map_site_admin_flags add column if not exists state_code text;
alter table public.boondocking_map_site_admin_flags add column if not exists layer text;
alter table public.boondocking_map_site_admin_flags add column if not exists latitude double precision;
alter table public.boondocking_map_site_admin_flags add column if not exists longitude double precision;
alter table public.boondocking_map_site_admin_flags add column if not exists hidden_admin_only boolean not null default false;
alter table public.boondocking_map_site_admin_flags add column if not exists hidden_reason text;
alter table public.boondocking_map_site_admin_flags add column if not exists hidden_by uuid references auth.users(id) on delete set null;
alter table public.boondocking_map_site_admin_flags add column if not exists hidden_at timestamptz;
alter table public.boondocking_map_site_admin_flags add column if not exists created_at timestamptz not null default now();
alter table public.boondocking_map_site_admin_flags add column if not exists updated_at timestamptz not null default now();

create index if not exists boondocking_map_site_admin_flags_site_idx on public.boondocking_map_site_admin_flags(site_id);
create index if not exists boondocking_map_site_admin_flags_hidden_idx on public.boondocking_map_site_admin_flags(hidden_admin_only);

alter table public.boondocking_map_site_admin_flags enable row level security;

drop policy if exists boondocking_map_site_admin_flags_select_hidden_or_admin on public.boondocking_map_site_admin_flags;
create policy boondocking_map_site_admin_flags_select_hidden_or_admin
on public.boondocking_map_site_admin_flags
for select
using (hidden_admin_only = true or public.boondocking_map_is_admin(auth.uid()));

drop policy if exists boondocking_map_site_admin_flags_insert_admin on public.boondocking_map_site_admin_flags;
create policy boondocking_map_site_admin_flags_insert_admin
on public.boondocking_map_site_admin_flags
for insert
with check (public.boondocking_map_is_admin(auth.uid()));

drop policy if exists boondocking_map_site_admin_flags_update_admin on public.boondocking_map_site_admin_flags;
create policy boondocking_map_site_admin_flags_update_admin
on public.boondocking_map_site_admin_flags
for update
using (public.boondocking_map_is_admin(auth.uid()))
with check (public.boondocking_map_is_admin(auth.uid()));

drop policy if exists boondocking_map_site_admin_flags_delete_admin on public.boondocking_map_site_admin_flags;
create policy boondocking_map_site_admin_flags_delete_admin
on public.boondocking_map_site_admin_flags
for delete
using (public.boondocking_map_is_admin(auth.uid()));

-- Timestamp triggers.
drop trigger if exists boondocking_map_profiles_set_updated_at on public.boondocking_map_profiles;
create trigger boondocking_map_profiles_set_updated_at
before update on public.boondocking_map_profiles
for each row execute function public.boondocking_map_set_updated_at();

drop trigger if exists boondocking_map_site_favorites_set_updated_at on public.boondocking_map_site_favorites;
create trigger boondocking_map_site_favorites_set_updated_at
before update on public.boondocking_map_site_favorites
for each row execute function public.boondocking_map_set_updated_at();

drop trigger if exists boondocking_map_site_comments_set_updated_at on public.boondocking_map_site_comments;
create trigger boondocking_map_site_comments_set_updated_at
before update on public.boondocking_map_site_comments
for each row execute function public.boondocking_map_set_updated_at();

drop trigger if exists boondocking_map_site_corrections_set_updated_at on public.boondocking_map_site_corrections;
create trigger boondocking_map_site_corrections_set_updated_at
before update on public.boondocking_map_site_corrections
for each row execute function public.boondocking_map_set_updated_at();

drop trigger if exists boondocking_map_site_admin_flags_set_updated_at on public.boondocking_map_site_admin_flags;
create trigger boondocking_map_site_admin_flags_set_updated_at
before update on public.boondocking_map_site_admin_flags
for each row execute function public.boondocking_map_set_updated_at();

-- Auto-create a profile for new auth users.
create or replace function public.boondocking_map_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.boondocking_map_profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email), case when lower(new.email) = 'tpoirier@nmu.edu' then 'admin' else 'user' end)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists boondocking_map_on_auth_user_created on auth.users;
create trigger boondocking_map_on_auth_user_created
after insert on auth.users
for each row execute function public.boondocking_map_handle_new_user();

-- Backfill profiles for existing auth users. Safe/idempotent.
insert into public.boondocking_map_profiles (id, display_name, role)
select u.id, coalesce(u.raw_user_meta_data->>'display_name', u.email), case when lower(u.email) = 'tpoirier@nmu.edu' then 'admin' else 'user' end
from auth.users u
on conflict (id) do nothing;

-- Primary admin bootstrap. Safe/idempotent; preserves the requested owner admin.
update public.boondocking_map_profiles p
set role = 'admin', updated_at = now()
from auth.users u
where p.id = u.id
  and lower(u.email) = 'tpoirier@nmu.edu';

-- Explicit grants for Supabase REST access. RLS still controls row visibility/write access.
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.boondocking_map_site_favorites to authenticated;
grant select, insert, update on public.boondocking_map_site_comments to anon, authenticated;
grant select, insert, update on public.boondocking_map_site_corrections to authenticated;
grant select, insert, update on public.boondocking_map_profiles to authenticated;
grant select on public.boondocking_map_site_admin_flags to anon, authenticated;
grant insert, update, delete on public.boondocking_map_site_admin_flags to authenticated;
grant execute on function public.boondocking_map_is_staff(uuid) to anon, authenticated;
grant execute on function public.boondocking_map_is_admin(uuid) to authenticated;
grant execute on function public.boondocking_map_set_user_role_by_email(text, text) to authenticated;
