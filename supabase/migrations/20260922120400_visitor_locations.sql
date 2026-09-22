-- Visitor map: coarse country/city per visit, no IP addresses stored.
-- Rows are meant to be written server-side (service role, from the request's
-- geo headers) so visitors can't spoof fake countries into the map — hence
-- no insert policy for anon/authenticated below.
create table if not exists public.visitor_locations (
  id uuid primary key default gen_random_uuid(),
  country_code char(2) not null,
  city text,
  created_at timestamptz not null default now()
);

create index if not exists visitor_locations_country_idx
  on public.visitor_locations (country_code);

alter table public.visitor_locations enable row level security;

grant select on public.visitor_locations to anon, authenticated;

-- Aggregated map is public.
create policy "visitor_locations_select_all"
  on public.visitor_locations for select
  to anon, authenticated
  using (true);
