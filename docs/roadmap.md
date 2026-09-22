# Roadmap

Planning notes for the site — not user-facing, just where we keep track of what's next.

## Supabase — interactive portfolio (2026-09-22)

Goal: use the Supabase project we just wired up (`.env` has the URL + anon/service keys) to make the single-page site less static, without dragging back the CMS complexity we just stripped out (see git history — about/projects/journal/contact pages and their MDX pipeline were removed for being unused).

Ideas on the table:

- **Guestbook / reactions** — visitors leave a short note or react to the page; stored in one Supabase table, rendered with Realtime so new entries show up live for anyone else on the page. Small schema, no new route needed, doubles as a live demo of the real-time/distributed-systems work already on the résumé.
- **Live status line** — the "availability" block (`resume.availability` in `messages/*.json`) becomes editable from a table instead of hardcoded JSON, so it can be updated without a redeploy.
- **Page-view / presence counter** — simplest possible option, low payoff.
- **Bring back journal/case studies, DB-backed** — only worth it if there's an actual intent to keep writing; last time this content existed it had zero traffic and got deleted for being dead weight.

**Current lean**: guestbook with Supabase Realtime. Reasoning: it's genuinely interactive for visitors, keeps the single-page shape, and shows off the same distributed-systems/WebSocket skills already claimed in the résumé — a live feature beats a bullet point. Rough shape:

```sql
create table guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  name text,
  message text not null,
  created_at timestamptz not null default now()
);
```

Client subscribes to inserts on that table via Supabase Realtime; writes go through the anon key with row-level security limiting inserts to short messages and no update/delete from the client.

Not decided yet — flagging alternatives above in case a different angle (owner-only editing vs. visitor-facing) is a better fit once we talk it through.

## Status

Nothing implemented yet. This is planning only.
