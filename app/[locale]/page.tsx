import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { SvgArt } from "@/components/svg-art";
import { getFeaturedProjects, getAllJournalEntries } from "@/lib/content";
import { featuredThumbArt } from "@/lib/thumb-art";
import { formatJournalDate } from "@/lib/format";

const STACK_MARQUEE = [
  "LARAVEL", "REACT", "POSTGRES", "DOCKER", "KUBERNETES", "GRAPHQL",
  "NEXT.JS", "NODE.JS", "LINUX", "TYPESCRIPT", "CI/CD", "NGINX",
];

const CAPABILITIES = ["01", "02", "03", "04", "05", "06", "07", "08"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();
  const tCase = await getTranslations("projects");
  const featured = getFeaturedProjects();
  const journal = getAllJournalEntries(locale as Locale).slice(0, 4);

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="hero page">
        <div className="container">
          <h1 className="hero__title">
            <span
              className="hero__line reveal reveal-delay-1 in"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.line1") }}
            />
            <span
              className="hero__line reveal reveal-delay-2 in"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.line2") }}
            />
          </h1>

          <div className="hero__deck">
            <Reveal delay={2}>
              <p
                className="hero__lede"
                dangerouslySetInnerHTML={{ __html: t.raw("hero.lede") }}
              />
              <div className="hero__cta">
                <Link href="/projects" className="btn btn--primary">
                  {t("btn.see_work")}
                </Link>
                <Link href="/about" className="btn">
                  {t("btn.read_about")}
                </Link>
                <a href="#quickread" className="btn btn--ghost">
                  {t("btn.skim")}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={4} className="marquee">
            <div className="marquee__track">
              {[...STACK_MARQUEE, ...STACK_MARQUEE].map((s, i) => (
                <span key={i}>{s} ·</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== QUICK READ ============== */}
      <section id="quickread" className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container grid-2">
          <Reveal>
            <div className="mono-label">{t("qr.label")}</div>
            <h2 className="section__title">{t("qr.title")}</h2>
          </Reveal>
          <Reveal delay={1} className="section__text">
            <p>{t("qr.p1")}</p>
          </Reveal>
        </div>
      </section>

      {/* ============== FEATURED WORK ============== */}
      <section className="section section--tight" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <div className="section__head">
            <Reveal>
              <div className="mono-label">{t("feat.label")}</div>
              <h2
                className="section__title"
                dangerouslySetInnerHTML={{ __html: t.raw("feat.title") }}
              />
            </Reveal>
            <Reveal delay={2}>
              <Link href="/projects" className="btn btn--ghost">
                {t("btn.all_projects")}
              </Link>
            </Reveal>
          </div>

          <div className="feat">
            {featured.map((p, i) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="feat__item reveal in">
                <div className="feat__meta">
                  <div className="feat__chipline">
                    <span className="chip">
                      <span className="dot" style={{ background: p.accent }} />
                      {p.category[locale as Locale]}
                    </span>
                    <span className="chip" style={{ background: "var(--bg)" }}>
                      {p.year}
                    </span>
                    <span className="chip" style={{ background: "var(--bg)" }}>
                      {p.role[locale as Locale]}
                    </span>
                  </div>
                  <div className="feat__num">
                    CASE · 0{i + 1} / 0{featured.length}
                  </div>
                  <h3 className="feat__title">{p.name}</h3>
                  <p className="feat__desc">{p.summary[locale as Locale]}</p>
                  <div className="feat__stack">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <p className="feat__impact">{p.impact[locale as Locale]}</p>
                  <span className="feat__link">{tCase("read_case")}</span>
                </div>
                <div className="feat__thumb">
                  <SvgArt
                    className="feat__thumb-art"
                    markup={featuredThumbArt(i, p.accent)}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CAPABILITIES ============== */}
      <section className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <Reveal>
            <div className="mono-label">{t("caps.label")}</div>
            <h2
              className="section__title"
              dangerouslySetInnerHTML={{ __html: t.raw("caps.title") }}
            />
          </Reveal>

          <div className="caps-grid">
            {CAPABILITIES.map((num) => (
              <div key={num}>
                <div className="num">{num}</div>
                <div className="t">{t(`cap.${num}.t`)}</div>
                <div className="b">{t(`cap.${num}.b`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== LATEST WRITING ============== */}
      <section className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <div className="section__head">
            <Reveal>
              <div className="mono-label">{t("journ.label")}</div>
              <h2 className="section__title">{t("journ.title")}</h2>
            </Reveal>
            <Reveal delay={2}>
              <Link href="/journal" className="btn btn--ghost">
                {t("btn.read_all")}
              </Link>
            </Reveal>
          </div>
          <div className="journal-list">
            {journal.map((j) => (
              <Link key={j.slug} href={`/journal/${j.slug}`}>
                <span className="date mono">{formatJournalDate(j.date)}</span>
                <span className="kicker mono">{j.kicker}</span>
                <span className="t">{j.title}</span>
                <span className="r mono">{j.read} · →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============== AVAILABILITY ============== */}
      <section className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <Reveal className="cta-slab">
            <div>
              <div className="mono-label" style={{ color: "rgba(255,255,255,.55)" }}>
                {t("avail.label")}
              </div>
              <h2 className="section__title" style={{ color: "#fff", maxWidth: "18ch" }}>
                {t("avail.title")}
              </h2>
              <p style={{ color: "rgba(255,255,255,.7)", maxWidth: "48ch", marginTop: 16, fontSize: 16 }}>
                {t("avail.p")}
              </p>
            </div>
            <div className="cta-slab__actions">
              <Link href="/contact" className="btn btn--primary">
                {t("avail.book")}
              </Link>
              <a
                href="mailto:contact@vitorgabriel.dev"
                className="btn"
                style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
              >
                {t("btn.email")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
