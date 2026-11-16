-- Create or upgrade the giveaway entry store with email and country-aware phone data.
begin;

create extension if not exists pgcrypto;

create or replace function public.is_knightfx_admin()
returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

create table if not exists public.giveaway_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 5 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  phone text not null check (phone ~ '^[+][0-9]{7,15}$'),
  country_code text not null check (left(country_code, 1) = '+' and char_length(country_code) between 2 and 4 and substr(country_code, 2) ~ '^[0-9]+$'),
  country_iso text not null check (country_iso ~ '^[A-Z]{2}$'),
  instagram_handle text not null check (instagram_handle ~ '^[A-Za-z0-9._]{1,30}$'),
  consent_given boolean not null check (consent_given),
  created_at timestamptz not null default now()
);

alter table public.giveaway_entries
  add column if not exists email text not null default '',
  add column if not exists country_code text not null default '',
  add column if not exists country_iso text not null default 'ZZ';

alter table public.giveaway_entries
  alter column email drop default,
  alter column country_code drop default,
  alter column country_iso drop default;

alter table public.giveaway_entries enable row level security;
revoke all on public.giveaway_entries from anon, authenticated;
grant insert on public.giveaway_entries to anon, authenticated;
grant select on public.giveaway_entries to authenticated;
revoke update, delete on public.giveaway_entries from anon, authenticated;

drop policy if exists "Public submits giveaway entries" on public.giveaway_entries;
create policy "Public submits giveaway entries"
  on public.giveaway_entries for insert to anon, authenticated
  with check (
    consent_given
    and char_length(name) between 2 and 80
    and char_length(email) between 5 and 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    and left(country_code, 1) = '+'
    and char_length(country_code) between 2 and 4
    and substr(country_code, 2) ~ '^[0-9]+$'
    and phone ~ '^[+][0-9]{7,15}$'
    and left(phone, char_length(country_code)) = country_code
    and country_iso ~ '^[A-Z]{2}$'
    and instagram_handle ~ '^[A-Za-z0-9._]{1,30}$'
  );

drop policy if exists "Admins read giveaway entries" on public.giveaway_entries;
create policy "Admins read giveaway entries"
  on public.giveaway_entries for select to authenticated
  using (public.is_knightfx_admin());

commit;
