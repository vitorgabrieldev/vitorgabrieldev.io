import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAllJournalEntries, getJournalSlugs, getJournalKickerKeys } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JournalBrowser } from "@/components/journal-browser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.journal" });
  return pageMetadata({ locale, path: "/journal", title: t("title"), description: t("description") });
}

export default async function JournalIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);
  const t = await getTranslations("journal");

  const kickerKeys = getJournalKickerKeys();
  const entries = getAllJournalEntries(loc).map((e) => ({
    ...e,
    kickerEn: kickerKeys[e.slug],
  }));

  return (
    <>
      <section className="page page--head">
        <div className="container">
          <div className="head__line reveal in">
            <span className="mono-label">{t("head_label")}</span>
            <span className="mono-label">
              {getJournalSlugs().length} {t("entries")}
            </span>
          </div>
          <h1
            className="head__title reveal reveal-delay-1 in"
            dangerouslySetInnerHTML={{ __html: t.raw("head_title") }}
          />
          <p className="head__lede reveal reveal-delay-2 in">{t("head_lede")}</p>
        </div>
      </section>

      <JournalBrowser entries={entries} />
    </>
  );
}
