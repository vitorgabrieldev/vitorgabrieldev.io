# vitorgabriel.dev

Full stack engineer building systems that stay honest under load.

**Live at**: [vitorgabriel.dev](https://vitorgabriel.dev)

---

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** for layout/utilities, plain CSS for animations (no animation library)
- **next-intl** for i18n — PT (default, unprefixed) and EN (`/en/...`)
- MDX content (`content/case-studies/`, `content/journal/`) compiled with `@mdx-js/mdx` + Shiki syntax highlighting
- Web3Forms for the contact form, proxied through a Route Handler (`app/api/contact`) so the access key stays server-side
- Deployed on Vercel

## Structure

```
app/[locale]/          # pages (home, about, projects, journal, contact)
app/api/contact/       # contact form Route Handler
app/sitemap.ts, robots.ts, feed.xml/route.ts
content/                # project metadata + per-locale MDX (case studies, journal)
components/             # nav, footer, theme toggle, MDX components, etc.
i18n/                   # next-intl routing/navigation/request config
lib/                    # content loaders, MDX renderer, SEO helpers, generated SVG art
messages/pt.json, en.json  # UI translation dictionary
```

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `WEB3FORMS_ACCESS_KEY` (get one at [web3forms.com](https://web3forms.com)) for the contact form to work locally.

## Adding content

- **New project**: add metadata to `content/projects.ts`, then create `content/case-studies/<id>/pt.mdx` and `en.mdx`.
- **New journal entry**: create a folder in `content/journal/<slug>/` with `pt.mdx` and `en.mdx` (frontmatter: `title`, `date`, `read`, `kicker`, `summary`).
- **New UI string**: add the key to both `messages/pt.json` and `messages/en.json`.

## Deploying

Connect the repo to Vercel and set the `WEB3FORMS_ACCESS_KEY` environment variable in the project settings. No other configuration is required.

---

**© 2026 Vitor Gabriel de Oliveira**
