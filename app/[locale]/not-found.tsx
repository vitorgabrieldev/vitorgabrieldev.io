import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="err-wrap">
      <div className="err-inner">
        <div className="err-code">404</div>
        <h1 className="err-title">{t("title")}</h1>
        <p className="err-sub">{t("sub")}</p>
        <div className="err-actions">
          <Link href="/" className="btn btn--primary">
            {t("home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
