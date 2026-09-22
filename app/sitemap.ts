import type { MetadataRoute } from "next";
import { allProjects, getJournalSlugs } from "@/lib/content";

const SITE_URL = "https://vitorgabriel.dev";
const STATIC_PATHS = ["", "/about", "/projects", "/journal", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: `${SITE_URL}${path}`,
      alternates: { languages: { pt: `${SITE_URL}${path}`, en: `${SITE_URL}/en${path}` } },
      priority: path === "" ? 1 : 0.7,
    });
  }

  for (const p of allProjects) {
    entries.push({
      url: `${SITE_URL}/projects/${p.id}`,
      alternates: {
        languages: {
          pt: `${SITE_URL}/projects/${p.id}`,
          en: `${SITE_URL}/en/projects/${p.id}`,
        },
      },
      priority: 0.6,
    });
  }

  for (const slug of getJournalSlugs()) {
    entries.push({
      url: `${SITE_URL}/journal/${slug}`,
      alternates: {
        languages: {
          pt: `${SITE_URL}/journal/${slug}`,
          en: `${SITE_URL}/en/journal/${slug}`,
        },
      },
      priority: 0.5,
    });
  }

  return entries;
}
