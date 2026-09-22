-- Reactions: a small emoji count per résumé section (e.g. 'experience.maestron',
-- 'skills.arch'). target_id is a free-text slug — no fixed list, so new
-- sections can react without a migration.
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  target_id text not null check (char_length(target_id) between 1 and 80),
  emoji text not null check (emoji in ('🔥', '👍', '💡', '🚀')),
  -- Client-generated id (e.g. stored in localStorage), not a real auth
  -- identity. It only stops accidental double-counting from the same
  -- browser — someone could reset it and react again. Fine for a portfolio,
  -- not meant to be abuse-proof.
  visitor_id text not null,
  created_at timestamptz not null default now(),
  unique (target_id, emoji, visitor_id)
);

create index if not exists reactions_target_idx on public.reactions (target_id, emoji);

alter table public.reactions enable row level security;

grant select, insert on public.reactions to anon, authenticated;

create policy "reactions_select_all"
  on public.reactions for select
  to anon, authenticated
  using (true);

-- Insert-only: no update/delete, so a reaction can't be un-reacted, just
-- re-attempted (blocked by the unique constraint above).
create policy "reactions_insert_all"
  on public.reactions for insert
  to anon, authenticated
  with check (true);

alter publication supabase_realtime add table public.reactions;
