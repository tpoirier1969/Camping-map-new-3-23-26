-- Tod's Boondocking & Camping Maps — Supabase Phase 1
-- Project-specific account/community tables for the shared Supabase project.
-- Creates/updates: profiles, favorites/visited/loved, site comments, and correction submissions.
-- No storage buckets are created in this phase.

create extension if not exists pgcrypto;

create table if not exists public.boondocking_map_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.boondocking_map_profiles enable row level security;

drop policy if exists boondocking_map_profiles_select_own on public.boondocking_map_profiles;
create policy boondocking_map_profiles_select_own on public.boondocking_map_profiles for select using (auth.uid() = id);

drop policy if exists boondocking_map_profiles_insert_own on public.boondocking_map_profiles;
create policy boondocking_map_profiles_insert_own on public.boondocking_map_profiles for insert with check (auth.uid() = id);

drop policy if exists boondocking_map_profiles_update_own on public.boondocking_map_profiles;
create policy boondocking_map_profiles_update_own on public.boondocking_map_profiles for update using (auth.uid() = id) with check (auth.uid() = id);

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

create index if not exists boondocking_map_site_favorites_user_idx on public.boondocking_map_site_favorites(user_id);
create index if not exists boondocking_map_site_favorites_site_idx on public.boondocking_map_site_favorites(site_id);

alter table public.boondocking_map_site_favorites enable row level security;

drop policy if exists boondocking_map_site_favorites_select_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_select_own on public.boondocking_map_site_favorites for select using (auth.uid() = user_id);

drop policy if exists boondocking_map_site_favorites_insert_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_insert_own on public.boondocking_map_site_favorites for insert with check (auth.uid() = user_id);

drop policy if exists boondocking_map_site_favorites_update_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_update_own on public.boondocking_map_site_favorites for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists boondocking_map_site_favorites_delete_own on public.boondocking_map_site_favorites;
create policy boondocking_map_site_favorites_delete_own on public.boondocking_map_site_favorites for delete using (auth.uid() = user_id);

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
create policy boondocking_map_site_comments_select_visible on public.boondocking_map_site_comments for select using (status = 'visible' or auth.uid() = user_id or exists (select 1 from public.boondocking_map_profiles p where p.id = auth.uid() and p.role in ('admin','moderator')));

drop policy if exists boondocking_map_site_comments_insert_own on public.boondocking_map_site_comments;
create policy boondocking_map_site_comments_insert_own on public.boondocking_map_site_comments for insert with check (auth.uid() = user_id);

drop policy if exists boondocking_map_site_comments_update_own_or_staff on public.boondocking_map_site_comments;
create policy boondocking_map_site_comments_update_own_or_staff on public.boondocking_map_site_comments for update using (auth.uid() = user_id or exists (select 1 from public.boondocking_map_profiles p where p.id = auth.uid() and p.role in ('admin','moderator'))) with check (auth.uid() = user_id or exists (select 1 from public.boondocking_map_profiles p where p.id = auth.uid() and p.role in ('admin','moderator')));

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
  message text not null,
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

create index if not exists boondocking_map_site_corrections_status_idx on public.boondocking_map_site_corrections(status);
create index if not exists boondocking_map_site_corrections_site_idx on public.boondocking_map_site_corrections(site_id);
create index if not exists boondocking_map_site_corrections_user_idx on public.boondocking_map_site_corrections(user_id);

alter table public.boondocking_map_site_corrections enable row level security;

drop policy if exists boondocking_map_site_corrections_insert_signed_in on public.boondocking_map_site_corrections;
create policy boondocking_map_site_corrections_insert_signed_in on public.boondocking_map_site_corrections for insert with check (auth.uid() = user_id);

drop policy if exists boondocking_map_site_corrections_select_own_or_staff on public.boondocking_map_site_corrections;
create policy boondocking_map_site_corrections_select_own_or_staff on public.boondocking_map_site_corrections for select using (auth.uid() = user_id or exists (select 1 from public.boondocking_map_profiles p where p.id = auth.uid() and p.role in ('admin','moderator')));

drop policy if exists boondocking_map_site_corrections_update_staff_only on public.boondocking_map_site_corrections;
create policy boondocking_map_site_corrections_update_staff_only on public.boondocking_map_site_corrections for update using (exists (select 1 from public.boondocking_map_profiles p where p.id = auth.uid() and p.role in ('admin','moderator'))) with check (exists (select 1 from public.boondocking_map_profiles p where p.id = auth.uid() and p.role in ('admin','moderator')));

create or replace function public.boondocking_map_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists boondocking_map_profiles_set_updated_at on public.boondocking_map_profiles;
create trigger boondocking_map_profiles_set_updated_at before update on public.boondocking_map_profiles for each row execute function public.boondocking_map_set_updated_at();

drop trigger if exists boondocking_map_site_favorites_set_updated_at on public.boondocking_map_site_favorites;
create trigger boondocking_map_site_favorites_set_updated_at before update on public.boondocking_map_site_favorites for each row execute function public.boondocking_map_set_updated_at();

drop trigger if exists boondocking_map_site_comments_set_updated_at on public.boondocking_map_site_comments;
create trigger boondocking_map_site_comments_set_updated_at before update on public.boondocking_map_site_comments for each row execute function public.boondocking_map_set_updated_at();

drop trigger if exists boondocking_map_site_corrections_set_updated_at on public.boondocking_map_site_corrections;
create trigger boondocking_map_site_corrections_set_updated_at before update on public.boondocking_map_site_corrections for each row execute function public.boondocking_map_set_updated_at();

create or replace function public.boondocking_map_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.boondocking_map_profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists boondocking_map_on_auth_user_created on auth.users;
create trigger boondocking_map_on_auth_user_created after insert on auth.users for each row execute function public.boondocking_map_handle_new_user();
