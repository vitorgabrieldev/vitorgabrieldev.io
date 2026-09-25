# Roadmap

Planning notes for the site — not user-facing, just where we keep track of what's next.

## Supabase — interactive portfolio (2026-09-22, reset 2026-09-25)

Goal: use the Supabase project we wired up (`.env` has the URL + anon/service keys) to make the single-page site less static, without dragging back the CMS complexity we just stripped out (see git history — about/projects/journal/contact pages and their MDX pipeline were removed for being unused).

First pass (2026-09-22) went straight to building before the idea was actually picked: ended up with four migrated tables (`reactions`, `pixel_board`, `newsletter_subscribers`, `visitor_locations`) plus a `guestbook_entries` table created ad hoc outside of any migration — none of it wired to any client code. All five tables were dropped from the remote project on 2026-09-25 to start over deliberately. The Supabase project itself (and its `.env` keys) stays — only the schema was reset.

Ideas that were on the table, kept here for reference while we re-decide:

- **Guestbook / reactions** — visitors leave a short note or react to the page; stored in one Supabase table, rendered with Realtime so new entries show up live for anyone else on the page. Small schema, no new route needed, doubles as a live demo of the real-time/distributed-systems work already on the résumé.
- **Collaborative pixel board** — a shared 64x64 grid visitors can paint, upserted per cell, live via Realtime.
- **Newsletter signup** — plain email capture, no confirmation flow.
- **Visitor location map** — coarse country/city per visit, written server-side.
- **Live status line** — the "availability" block (`resume.availability` in `messages/*.json`) becomes editable from a table instead of hardcoded JSON, so it can be updated without a redeploy.
- **Page-view / presence counter** — simplest possible option, low payoff.
- **Bring back journal/case studies, DB-backed** — only worth it if there's an actual intent to keep writing; last time this content existed it had zero traffic and got deleted for being dead weight.

Nothing is picked. Next step is deciding together — scope to one thing, then migrate + wire it up deliberately instead of scaffolding everything at once.

## Status

Nothing implemented. Supabase project is linked and empty (no tables), ready for whatever gets decided next.
