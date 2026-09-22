import { getAllJournalEntries } from "@/lib/content";

const SITE_URL = "https://vitorgabriel.dev";

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const entries = getAllJournalEntries("pt");

  const items = entries
    .map((e) => {
      const url = `${SITE_URL}/journal/${e.slug}`;
      return `  <item>
    <title>${escapeXml(e.title)}</title>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${new Date(e.date).toUTCString()}</pubDate>
    <description>${escapeXml(e.summary)}</description>
    <category>${escapeXml(e.kicker)}</category>
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Journal — Vitor Gabriel</title>
  <link>${SITE_URL}/journal</link>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Notes on engineering, systems design, and the craft of shipping reliable software.</description>
  <language>pt-BR</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
