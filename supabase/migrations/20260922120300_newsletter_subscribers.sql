-- Newsletter waitlist. No confirmation-token flow yet (would need an edge
-- function that sends email) — just capture + an unsubscribe marker.
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

alter table public.newsletter_subscribers enable row level security;

-- Deliberately no SELECT grant/policy: email addresses are PII and must not
-- be readable via the anon key — only the service role (server-side, which
-- bypasses RLS and grants) can list subscribers.
--
-- Client-side gotcha this implies: `insert().select()` sends
-- `Prefer: return=representation`, which needs SELECT on the inserted row
-- to satisfy the RETURNING clause — without a SELECT policy that fails with
-- a row-level-security error even though the insert itself is allowed. Call
-- plain `insert()` (no `.select()`), which uses `return=minimal` instead.
grant insert on public.newsletter_subscribers to anon, authenticated;

-- Insert-only from the client.
create policy "newsletter_subscribers_insert_all"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (unsubscribed_at is null);
