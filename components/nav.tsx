"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ThemeToggle } from "@/components/theme-toggle";

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
        </nav>
      </div>
    </header>
  );
}
