import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

export const SITE_URL = "https://vitorgabriel.dev";

function localizedPath(locale: Locale, path: string) {
  return locale === "pt" ? path : `/en${path}`;
}

/** Builds title/description/canonical/OG/Twitter metadata for a static page,
 *  given the already-resolved path (without locale prefix, e.g. "/about"). */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        pt: path,
        en: `/en${path}`,
        "x-default": path,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [image ?? "/og-home.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? "/og-home.png"],
    },
  };
}
