import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const GITHUB = "vitorgabrieldev";
const EMAIL = "contact@vitorgabriel.dev";
const WHATSAPP_URL = "https://wa.me/5543984873807";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="foot">
      <div className="foot__grid">
        <div className="foot__col foot__brand">
          <h4>{t("foot.col.site")}</h4>
          <div className="text-[28px] leading-[1.1] tracking-tight">
            {t("foot.studio_title")}
          </div>
          <p>{t("foot.studio_p")}</p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <Link href="/contact" className="btn btn--primary text-white! text-[11px] px-4">
              {t("foot.start_conv")}
            </Link>
            <a href={`mailto:${EMAIL}`} className="btn px-7">
              {t("btn.email")}
            </a>
          </div>
        </div>

        <div className="foot__col">
          <h4>/ SITE</h4>
          <Link href="/">{t("foot.nav.index")}</Link>
          <Link href="/projects">{t("foot.nav.work")}</Link>
          <Link href="/about">{t("foot.nav.about")}</Link>
          <Link href="/journal">{t("foot.nav.journal")}</Link>
          <Link href="/contact">{t("foot.nav.contact")}</Link>
        </div>

        <div className="foot__col">
          <h4>{t("foot.col.elsewhere")}</h4>
          <a href={`https://github.com/${GITHUB}`} target="_blank" rel="noopener">
            GitHub ↗
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">
            WhatsApp ↗
          </a>
          <a href="/CV.pdf" target="_blank" rel="noopener">
            CV (PDF) ↗
          </a>
          <a href="https://linkedin.com/in/vitorgabrieldev" target="_blank" rel="noopener">
            LinkedIn ↗
          </a>
        </div>

        <div className="foot__col">
          <h4>{t("foot.col.info")}</h4>
          <span className="block py-1 text-[14px] text-(--ink-muted)">Londrina, BR</span>
          <span className="block py-1 text-[14px] text-(--ink-muted)">UTC−3</span>
          <span className="block py-1 text-[14px] text-(--ink-muted)">v2026.04</span>
        </div>
      </div>

      <div className="foot__bottom">
        <span>© 2026 VITOR GABRIEL DE OLIVEIRA</span>
        <span>{t("foot.handcrafted")}</span>
      </div>
    </footer>
  );
}
