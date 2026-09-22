-- Collaborative pixel board: a fixed 64x64 grid, one row per cell, upserted
-- on click. Grid size is enforced by the check constraints below — resize
-- by editing both bounds in a follow-up migration.
create table if not exists public.pixel_board (
  x smallint not null check (x >= 0 and x < 64),
  y smallint not null check (y >= 0 and y < 64),
  color text not null check (color ~ '^#[0-9a-fA-F]{6}$'),
  updated_by text,
  updated_at timestamptz not null default now(),
  primary key (x, y)
);

alter table public.pixel_board enable row level security;

grant select, insert, update on public.pixel_board to anon, authenticated;

create policy "pixel_board_select_all"
  on public.pixel_board for select
  to anon, authenticated
  using (true);

-- Insert + update (no delete) so the client can upsert a cell with
-- `on conflict (x, y) do update`.
create policy "pixel_board_insert_all"
  on public.pixel_board for insert
  to anon, authenticated
  with check (true);

create policy "pixel_board_update_all"
  on public.pixel_board for update
  to anon, authenticated
  using (true)
  with check (true);

alter publication supabase_realtime add table public.pixel_board;
