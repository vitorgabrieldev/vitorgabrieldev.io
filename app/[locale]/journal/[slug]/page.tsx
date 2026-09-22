import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getJournalSlugs, getJournalEntry } from "@/lib/content";
import { formatJournalDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { renderMdx } from "@/lib/mdx";
import { GiscusComments } from "@/components/giscus-comments";

export function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getJournalSlugs().includes(slug)) return {};
  const entry = getJournalEntry(slug, locale);
  return pageMetadata({
    locale,
    path: `/journal/${slug}`,
    title: `${entry.title} — Vitor Gabriel`,
    description: entry.summary,
  });
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);
  if (!getJournalSlugs().includes(slug)) notFound();

  const t = await getTranslations("journal");
  const tNav = await getTranslations("nav");
  const entry = getJournalEntry(slug, loc);
  const words = Math.round(parseInt(entry.read, 10) * 180);

  return (
    <article className="post">
      <header className="post__head">
        <Link href="/journal" className="post__back">
          {tNav("back_journal")}
        </Link>
        <div className="post__kicker">{entry.kicker}</div>
        <h1 className="post__title">{entry.title}</h1>
        <div className="post__meta">
          {formatJournalDate(entry.date)} · {entry.read} · ~{words} {t("words")} · {t("by")}
        </div>
      </header>

      <div className="post__body">{await renderMdx(entry.content, {})}</div>

      <GiscusComments />
    </article>
  );
}
