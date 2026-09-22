# vitorgabriel.dev

Full stack engineer building systems that stay honest under load.

**Live at**: [vitorgabriel.dev](https://vitorgabriel.dev)

---

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** for layout/utilities, plain CSS for animations (no animation library)
- **next-intl** for i18n — PT (default, unprefixed) and EN (`/en/...`)
- Deployed on Vercel

## Structure

```
app/[locale]/          # the single page (home) + layout, not-found
app/sitemap.ts, robots.ts
components/             # nav, footer, theme toggle, hero effects, etc.
i18n/                   # next-intl routing/navigation/request config
messages/pt.json, en.json  # UI translation dictionary
```

This is intentionally a single-page site — everything lives on `/` (and `/en`). See `public/llms.txt` for the plain-text summary.

## Running locally

```bash
npm install
npm run dev
```

## Adding content

- **New UI string**: add the key to both `messages/pt.json` and `messages/en.json`.

## Deploying

Connect the repo to Vercel. No environment configuration is required.

---

**© 2026 Vitor Gabriel de Oliveira**
