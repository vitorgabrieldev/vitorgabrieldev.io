import type { MetadataRoute } from "next";

const SITE_URL = "https://vitorgabrieldev.vercel.app";

// Single-page site: only the home route (PT default + EN) is public.
// About/Projects/Journal/Contact still build (unlinked) but are intentionally
// left out of the sitemap since they're not part of the live navigation.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      alternates: { languages: { pt: SITE_URL, en: `${SITE_URL}/en` } },
      priority: 1,
      changeFrequency: "monthly",
    },
  ];
}
