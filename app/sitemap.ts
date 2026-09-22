import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const SITE_URL = "https://vitorgabrieldev.vercel.app";

// About/Journal/Contact still build (unlinked) but are intentionally left
// out of the sitemap since they're not part of the live navigation.
// Projects went live with the home page's "Projetos" section, so its case
// study routes are included below.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      alternates: { languages: { pt: SITE_URL, en: `${SITE_URL}/en` } },
      priority: 1,
      changeFrequency: "monthly",
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/projetos/${project.slug}`,
      alternates: {
        languages: {
          pt: `${SITE_URL}/projetos/${project.slug}`,
          en: `${SITE_URL}/en/projetos/${project.slug}`,
        },
      },
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];
}
