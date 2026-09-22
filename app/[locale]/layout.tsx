import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { ScrollChrome } from "@/components/scroll-chrome";
import { ThemeScript } from "@/components/theme-script";
import "../globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://vitorgabrieldev.vercel.app";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s — Vitor Gabriel` },
    description: t("description"),
    authors: [{ name: "Vitor Gabriel de Oliveira" }],
    alternates: {
      canonical: path,
      languages: {
        pt: "/",
        en: "/en",
        "x-default": "/",
      },
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      type: "website",
      siteName: "Vitor Gabriel",
      title: t("ogTitle"),
      description: t("description"),
      url: path,
      images: ["/og-home.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
      images: ["/og-home.png"],
    },
    icons: { icon: "/favicon.svg" },
  };
}

export function generateViewport() {
  return { themeColor: "#7b0ec5" };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Vitor Gabriel de Oliveira",
      jobTitle: "Full Stack Engineer",
      url: SITE_URL,
      email: "vitorgabrieldeoliveiradev@gmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Londrina", addressCountry: "BR" },
      sameAs: ["https://github.com/vitorgabrieldev"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Vitor Gabriel",
      url: SITE_URL,
    },
  ];

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      className={`${interTight.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <PageTransition />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollChrome />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
