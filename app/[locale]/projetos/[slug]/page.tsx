import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { ProjectArt } from "@/components/project-art";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t(`${slug}.name`),
    description: t(`${slug}.tagline`),
    openGraph: { title: t(`${slug}.name`), description: t(`${slug}.tagline`) },
  };
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations();
  const c = await getTranslations("case");

  const summary = t.raw(`projects.${slug}.summary`) as string[];
  const stats = t.raw(`projects.${slug}.stats`) as { n: string; l: string }[];
  const challenges = t.raw(`projects.${slug}.challenges`) as string[];
  const results = t.raw(`projects.${slug}.results`) as string[];

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="case">
      <div className="case__head">
        <div className="case__head-inner">
          <Reveal>
            <div className="case__crumb">
              <Link href="/#projetos">{c("back")}</Link>
            </div>
            <div className="case__meta-row">
              <span>
                {c("role_label")}
                <strong>{t(`projects.${slug}.role`)}</strong>
              </span>
              <span>
                {c("status_label")}
                <strong>{t(`projects.${slug}.status`)}</strong>
              </span>
              <span>
                {c("year_label")}
                <strong>{project.year}</strong>
              </span>
            </div>
            <h1 className="case__title">{t(`projects.${slug}.name`)}</h1>
            <p className="case__lede">{t(`projects.${slug}.tagline`)}</p>
          </Reveal>
          <Reveal delay={1}>
            <div className="case__hero">
              <ProjectArt project={project} className="thumb-canvas" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="case__body">
        <div className="case__body-inner">
          <aside className="case__aside">
            <h4>{c("aside_title")}</h4>
            <a href="#visao-geral">{c("overview_label")}</a>
            <a href="#stack">{c("stack_label")}</a>
            <a href="#desafios">{c("challenges_label")}</a>
            {results.length > 0 && <a href="#resultados">{c("results_label")}</a>}

            <div className="tools">
              {project.links.map((link) => (
                <a key={link.kind} href={link.href} target="_blank" rel="noopener" className="tool-btn">
                  {c(`links.${link.kind}`)}
                </a>
              ))}
            </div>
          </aside>

          <article className="case__article">
            <h2 id="visao-geral">{c("overview_label")}</h2>
            {summary.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            {stats.length > 0 && (
              <div className="case__stats">
                {stats.map((stat) => (
                  <div key={stat.l}>
                    <div className="n">{stat.n}</div>
                    <div className="l">{stat.l}</div>
                  </div>
                ))}
              </div>
            )}

            <h2 id="stack">{c("stack_label")}</h2>
            {project.stackGroups ? (
              project.stackGroups.map((group) => (
                <div key={group.key}>
                  <h3>{group.key}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <ul>
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            <h2 id="desafios">{c("challenges_label")}</h2>
            <ul>
              {challenges.map((challenge) => (
                <li key={challenge.slice(0, 40)}>{challenge}</li>
              ))}
            </ul>

            {results.length > 0 && (
              <>
                <h2 id="resultados">{c("results_label")}</h2>
                <ul>
                  {results.map((result) => (
                    <li key={result.slice(0, 40)}>{result}</li>
                  ))}
                </ul>
              </>
            )}
          </article>
        </div>
      </div>

      <div className="case__next">
        <div className="case__next-inner">
          <Link href={`/projetos/${nextProject.slug}`} className="case__next-link">
            <span className="label">{c("next_label")}</span>
            <span className="t">{t(`projects.${nextProject.slug}.name`)}</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
