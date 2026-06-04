-- Boondocking & Camping Maps v23.0.96
-- Cloud saved routes table for cross-device route save/load.
-- Run this once in Supabase SQL Editor.
-- If your app config uses a non-public schema, run it in that schema or prefix the table name with that schema.

create table if not exists boondocking_saved_routes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table boondocking_saved_routes enable row level security;

create policy "boondocking_saved_routes_select_own"
on boondocking_saved_routes
for select
to authenticated
using (auth.uid() = user_id);

create policy "boondocking_saved_routes_insert_own"
on boondocking_saved_routes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "boondocking_saved_routes_update_own"
on boondocking_saved_routes
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "boondocking_saved_routes_delete_own"
on boondocking_saved_routes
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists boondocking_saved_routes_user_updated_idx
on boondocking_saved_routes (user_id, updated_at desc);
