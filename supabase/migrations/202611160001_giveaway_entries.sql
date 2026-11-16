-- Giveaway entry collection. Visitors may insert entries, but only KnightFX
-- administrators may read them. No public read/update/delete policy is granted.
begin;

create or replace function public.is_knightfx_admin()
returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

create table if not exists public.giveaway_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (
    phone ~ '^[+]?[0-9 ()-]{7,24}$'
    and char_length(regexp_replace(phone, '[^0-9]', '', 'g')) between 7 and 15
  ),
  instagram_handle text not null check (instagram_handle ~ '^[A-Za-z0-9._]{1,30}$'),
  consent_given boolean not null check (consent_given),
  created_at timestamptz not null default now()
);

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
    and instagram_handle ~ '^[A-Za-z0-9._]{1,30}$'
  );

drop policy if exists "Admins read giveaway entries" on public.giveaway_entries;
create policy "Admins read giveaway entries"
  on public.giveaway_entries for select to authenticated
  using (public.is_knightfx_admin());

commit;
