"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { href: "/", key: "index" },
  { href: "/projects", key: "work" },
  { href: "/about", key: "about" },
  { href: "/journal", key: "journal" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__brand">
          <span className="nav__mark" />
          <span className="nav__brand-name">Vitor Gabriel</span>
          <span className="nav__brand-meta mono">{t("engineer")}</span>
        </Link>

        <nav className="nav__links">
          {LINKS.map((l) => {
            const isActive =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={isActive ? "is-active" : undefined}
              >
                {t(l.key)}
              </Link>
            );
          })}

          <div className="lang-toggle mono" role="group" aria-label="Language">
            {routing.locales.map((loc, i) => (
              <span key={loc} className="inline-flex items-center">
                {i > 0 && <span className="lang-toggle__sep">/</span>}
                <Link
                  href={pathname as never}
                  locale={loc}
                  className={loc === activeLocale ? "is-active" : undefined}
                >
                  {loc.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          <ThemeToggle />

          <Link href="/contact" className="nav__cta">
            <span className="nav__cta-dot" />
            {t("available")} →
          </Link>
        </nav>
      </div>
    </header>
  );
}
