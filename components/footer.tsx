import { useTranslations } from "next-intl";

const GITHUB = "vitorgabrieldev";
const LINKEDIN = "vitorgabrieldev";
const EMAIL = "vitorgabrieldeoliveiradev@gmail.com";
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
        </div>

        <div className="foot__col">
          <h4>{t("foot.col.elsewhere")}</h4>
          <a href={`https://github.com/${GITHUB}`} target="_blank" rel="noopener">
            GitHub ↗
          </a>
          <a href={`https://linkedin.com/in/${LINKEDIN}`} target="_blank" rel="noopener">
            LinkedIn ↗
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">
            WhatsApp ↗
          </a>
          <a href={`mailto:${EMAIL}`}>{t("btn.email")}</a>
        </div>

        <div className="foot__col">
          <h4>{t("foot.col.info")}</h4>
          <span className="block py-1 text-[14px] text-(--ink-muted)">Londrina, PR</span>
          <span className="block py-1 text-[14px] text-(--ink-muted)">UTC−3</span>
        </div>
      </div>

      <div className="foot__bottom">
        <span>© 2026 VITOR GABRIEL DE OLIVEIRA</span>
      </div>
    </footer>
  );
}
