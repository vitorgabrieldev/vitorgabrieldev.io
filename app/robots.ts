import type { MetadataRoute } from "next";

const SITE_URL = "https://vitorgabrieldev.vercel.app";

// Single-page site: only "/" and "/en" are meant to be indexed. The other
// routes (about/projects/journal/contact and their [slug] pages) still build
// but aren't part of the live navigation, so they're excluded here too.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/about", "/projects", "/journal", "/contact", "/en/about", "/en/projects", "/en/journal", "/en/contact"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
