import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { allProjects, getProject, getCaseStudy, getNextProject } from "@/lib/content";
import { extractToc } from "@/lib/toc";
import { caseHeroArt } from "@/lib/thumb-art";
import { pageMetadata } from "@/lib/seo";
import { renderMdx } from "@/lib/mdx";
import { SvgArt } from "@/components/svg-art";
import { CaseStudyShell } from "@/components/case-study-shell";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const { lede } = getCaseStudy(slug, locale);
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.name} — Vitor Gabriel`,
    description: lede.replace(/<[^>]+>/g, ""),
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("project");
  const { lede, content } = getCaseStudy(slug, loc);
  const toc = extractToc(content);
  const next = getNextProject(slug);

  return (
    <article className="case">
      <header className="case__head">
        <div className="case__head-inner">
          <div className="case__crumb">
            <Link href="/projects">{t("back")}</Link>
            <span>/</span>
            <span>{project.category[loc]}</span>
            <span>/</span>
            <span>{project.id}</span>
          </div>
          <div className="case__meta-row">
            <span>
              {t("year_label")}
              <strong>{project.year}</strong>
            </span>
            <span>
              {t("role_label")}
              <strong>{project.role[loc]}</strong>
            </span>
            <span>
              {t("status_label")}
              <strong style={{ color: "var(--ok)" }}>{t("shipped")}</strong>
            </span>
          </div>
          <h1 className="case__title">{project.name}</h1>
          <p className="case__lede" dangerouslySetInnerHTML={{ __html: lede }} />

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={project.url} target="_blank" rel="noopener" className="btn btn--primary">
              {t("github")}
            </a>
            {project.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>

          <SvgArt
            className="case__hero"
            markup={caseHeroArt(project.name, project.category[loc], project.year, project.stack, project.accent)}
          />
        </div>
      </header>

      <CaseStudyShell toc={toc}>{await renderMdx(content, mdxComponents)}</CaseStudyShell>

      <div className="case__next">
        <div className="case__next-inner">
          <Link href={`/projects/${next.id}`} className="case__next-link">
            <span className="label">{t("next_case")}</span>
            <span className="t">{next.name}</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
