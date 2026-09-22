import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/reveal";

const STACK_MARQUEE = [
  "SISTEMAS DISTRIBUÍDOS", "NODE.JS", "PHP/LARAVEL", "GRAPHQL", "GRPC", "REACT",
  "NEXT.JS", "KUBERNETES", "DOCKER", "POSTGRESQL", "PGVECTOR", "RAG", "C", "CI/CD",
];

const SKILL_CATEGORIES = ["arch", "frontend", "cloud", "data", "ai", "quality", "methodology"] as const;
const EXPERIENCES = ["maestron", "fullstack", "freelance", "military"] as const;

const CONTACT = {
  phone: "+55 43 98487 3807",
  phoneHref: "tel:+5543984873807",
  email: "vitorgabrieldeoliveiradev@gmail.com",
  location: "Londrina, PR",
  github: "github.com/vitorgabrieldev",
  githubHref: "https://github.com/vitorgabrieldev",
  linkedin: "linkedin.com/in/vitorgabrieldev",
  linkedinHref: "https://linkedin.com/in/vitorgabrieldev",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();
  const r = await getTranslations("resume");

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="hero page">
        <div className="container">
          <h1 className="hero__title reveal in">
            <span className="hero__line">{r("hero.title")}</span>
            <span className="hero__line" style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
              {r("hero.subtitle")}
            </span>
          </h1>

          <div className="hero__deck">
            <Reveal delay={2}>
              <p className="hero__lede">{r("hero.lede")}</p>
              <div className="hero__cta">
                <a href="/CV.pdf" target="_blank" rel="noopener" className="btn btn--primary">
                  {t("btn.download_cv")}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="btn">
                  {t("btn.email")}
                </a>
                <a href={CONTACT.linkedinHref} target="_blank" rel="noopener" className="btn btn--ghost">
                  LinkedIn ↗
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

      {/* ============== RESUMO PROFISSIONAL ============== */}
      <section id="resumo" className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <Reveal>
            <div className="mono-label">{r("summary.label")}</div>
            <h2 className="section__title">{r("summary.title")}</h2>
          </Reveal>
          <Reveal delay={1} className="section__text" style={{ marginTop: 32, maxWidth: "72ch" }}>
            <p>{r("summary.b1")}</p>
            <p>{r("summary.b2")}</p>
            <p>{r("summary.b3")}</p>
          </Reveal>
        </div>
      </section>

      {/* ============== EXPERIÊNCIA ============== */}
      <section className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <Reveal>
            <div className="mono-label">{r("experience.label")}</div>
            <h2 className="section__title">{r("experience.title")}</h2>
          </Reveal>

          <div className="timeline" style={{ marginTop: 48 }}>
            {EXPERIENCES.map((key, i) => {
              const isCurrent = key === "maestron" || key === "fullstack";
              const bullets = [
                r(`experience.${key}.b1`),
                r.has(`experience.${key}.b2`) ? r(`experience.${key}.b2`) : null,
                r.has(`experience.${key}.b3`) ? r(`experience.${key}.b3`) : null,
                r.has(`experience.${key}.b4`) ? r(`experience.${key}.b4`) : null,
              ].filter(Boolean) as string[];

              return (
                <Reveal
                  key={key}
                  as="div"
                  delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                  className={`tl-row${isCurrent ? " tl-row--current" : ""}`}
                >
                  <div className="tl-year mono">{r(`experience.${key}.period`)}</div>
                  <div className="tl-line">
                    <div className="tl-dot" />
                  </div>
                  <div>
                    <div className="tl-role">{r(`experience.${key}.role`)}</div>
                    <div className="tl-company">{r(`experience.${key}.company`)}</div>
                    <div className="tl-notes">
                      <ul>
                        {bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    {r.has(`experience.${key}.highlight`) && (
                      <div className="tl-highlight">{r(`experience.${key}.highlight`)}</div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== HABILIDADES ============== */}
      <section className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <Reveal>
            <div className="mono-label">{r("skills.label")}</div>
            <h2 className="section__title">{r("skills.title")}</h2>
          </Reveal>

          <div className="skills">
            {SKILL_CATEGORIES.map((cat, i) => (
              <Reveal key={cat} as="div" delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="skills__col">
                <h4>{r(`skills.categories.${cat}`)}</h4>
                <ul>
                  {(r.raw(`skills.items.${cat}`) as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== IDIOMAS + FORMAÇÃO ============== */}
      <section className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container grid-2">
          <Reveal>
            <div className="mono-label">{r("languages.label")}</div>
            <h2 className="section__title">{r("languages.title")}</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
              <span className="chip">
                {r("languages.pt")} — {r("languages.pt_level")}
              </span>
              <span className="chip">
                {r("languages.en")} — {r("languages.en_level")}
              </span>
              <span className="chip">
                {r("languages.es")} — {r("languages.es_level")}
              </span>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="mono-label">{r("education.label")}</div>
            <h2 className="section__title">{r("education.title")}</h2>
            <div style={{ marginTop: 24 }}>
              <div className="tl-role">{r("education.degree")}</div>
              <div className="tl-company">
                {r("education.school")} · {r("education.period")}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== DISPONIBILIDADE / CONTATO ============== */}
      <section className="section" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="container">
          <Reveal className="cta-slab">
            <div>
              <div className="mono-label" style={{ color: "rgba(255,255,255,.55)" }}>
                {r("availability.label")}
              </div>
              <h2 className="section__title" style={{ color: "#fff", maxWidth: "20ch" }}>
                {r("availability.title")}
              </h2>
              <p style={{ color: "rgba(255,255,255,.7)", maxWidth: "48ch", marginTop: 16, fontSize: 16 }}>
                {r("availability.kind")} · {r("availability.detail")}
              </p>
              <p style={{ color: "rgba(255,255,255,.55)", marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 13 }}>
                {CONTACT.location} · {CONTACT.phone}
              </p>
            </div>
            <div className="cta-slab__actions">
              <a href={`mailto:${CONTACT.email}`} className="btn btn--primary">
                {t("btn.email")}
              </a>
              <a
                href={CONTACT.githubHref}
                target="_blank"
                rel="noopener"
                className="btn"
                style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
              >
                GitHub ↗
              </a>
              <a
                href={CONTACT.linkedinHref}
                target="_blank"
                rel="noopener"
                className="btn"
                style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
              >
                LinkedIn ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
