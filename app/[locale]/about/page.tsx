import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/reveal";
import { SvgArt } from "@/components/svg-art";
import { portraitArt } from "@/lib/thumb-art";
import { pageMetadata } from "@/lib/seo";

const PRINCIPLES = ["01", "02", "03", "04", "05"] as const;
const NOW_ITEMS = ["building", "shipping", "reading", "considering"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
    image: "/og-about.png",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();

  return (
    <>
      <section className="page page--head">
        <div className="container">
          <div className="head__line reveal in">
            <span className="mono-label">{t("about.topline")}</span>
          </div>
          <h1
            className="head__title reveal reveal-delay-1 in"
            dangerouslySetInnerHTML={{ __html: t.raw("about.head_title") }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container bio-grid">
          <Reveal>
            <div className="portrait">
              <SvgArt className="portrait-art" markup={portraitArt} />
              <div className="portrait__caption mono">vitor · londrina · 2026</div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="bio">
              <p className="lead" dangerouslySetInnerHTML={{ __html: t.raw("about.bio.p1") }} />
              <p dangerouslySetInnerHTML={{ __html: t.raw("about.bio.p2") }} />
              <p dangerouslySetInnerHTML={{ __html: t.raw("about.bio.p3") }} />
              <p dangerouslySetInnerHTML={{ __html: t.raw("about.bio.p4") }} />
              <div className="bio__quote">{t("about.bio.quote")}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="mono-label">{t("sec.principles")}</div>
            <h2 className="section__title" style={{ marginTop: 8 }}>
              {t("sec.principles_title")}
            </h2>
          </Reveal>
          <div className="principles">
            {PRINCIPLES.map((n, i) => (
              <Reveal key={n} delay={(i % 4 || 4) as 1 | 2 | 3 | 4} as="div">
                <div className="principles__n">{n}</div>
                <div className="principles__t">{t(`about.p${n}.t`)}</div>
                <div className="principles__d">{t(`about.p${n}.d`)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="now">
            <div>
              <div className="mono-label" style={{ color: "rgba(255,255,255,.55)" }}>
                {t("sec.now")}
              </div>
              <h2 className="section__title" style={{ color: "#fff", marginTop: 8 }}>
                {t("sec.now_title")}
              </h2>
            </div>
            <ul className="now__list">
              {NOW_ITEMS.map((k) => (
                <li key={k}>
                  <span className="now__k">{t(`about.now.k.${k}`)}</span>
                  <span>{t(`about.now.${k}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
