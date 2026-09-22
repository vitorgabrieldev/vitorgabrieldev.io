import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { allProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ProjectsBrowser } from "@/components/projects-browser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.projects" });
  return pageMetadata({ locale, path: "/projects", title: t("title"), description: t("description") });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);
  const t = await getTranslations("projects");

  const projects = allProjects.map((p) => ({
    id: p.id,
    name: p.name,
    year: p.year,
    category: p.category[loc],
    categoryEn: p.category.en,
    summary: p.summary[loc],
    stack: p.stack,
    accent: p.accent,
  }));

  return (
    <section className="page page--head">
      <div className="container">
        <div className="head__line reveal in">
          <span className="mono-label">{t("head_label")}</span>
        </div>
        <h1
          className="head__title reveal reveal-delay-1 in"
          dangerouslySetInnerHTML={{ __html: t.raw("head_title") }}
        />
        <p className="head__lede reveal reveal-delay-2 in">{t("head_lede")}</p>
      </div>

      <div className="container">
        <ProjectsBrowser projects={projects} />
      </div>
    </section>
  );
}
