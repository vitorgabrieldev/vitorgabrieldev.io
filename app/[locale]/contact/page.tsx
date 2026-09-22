import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return pageMetadata({ locale, path: "/contact", title: t("title"), description: t("description"), image: "/og-contact.png" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("contact");

  return (
    <>
      <section className="page page--head">
        <div className="container">
          <div className="head__line reveal in">
            <span className="mono-label">{t("head_label")}</span>
            <span className="live-badge">
              <span className="d" />
              <span>{t("head_badge")}</span>
            </span>
          </div>
          <h1
            className="head__title reveal reveal-delay-1 in"
            dangerouslySetInnerHTML={{ __html: t.raw("head_title") }}
          />
        </div>
      </section>

      <section className="ct">
        <div className="ct__inner">
          <div>
            <ContactForm />
          </div>

          <aside className="ct-aside">
            <div className="ct-card">
              <h4>{t("direct")}</h4>
              <div className="row">
                <span>Email</span>
                <a href="mailto:vitorgabrieldeoliveiradev@gmail.com">vitorgabrieldeoliveiradev@gmail.com</a>
              </div>
              <div className="row">
                <span>WhatsApp</span>
                <a href="https://wa.me/5543984873807" target="_blank" rel="noopener">
                  +55 43 98487-3807 ↗
                </a>
              </div>
              <div className="row">
                <span>GitHub</span>
                <a href="https://github.com/vitorgabrieldev" target="_blank" rel="noopener">
                  @vitorgabrieldev ↗
                </a>
              </div>
              <div className="row">
                <span>Location</span>
                <span style={{ color: "var(--ink)" }}>Londrina · UTC−3</span>
              </div>
            </div>

            <div className="ct-card">
              <h4>{t("response")}</h4>
              <div className="row">
                <span>{t("first_reply")}</span>
                <span style={{ color: "var(--ink)" }}>{t("first_reply_val")}</span>
              </div>
              <div className="row">
                <span>{t("intro_call")}</span>
                <span style={{ color: "var(--ink)" }}>{t("intro_call_val")}</span>
              </div>
              <div className="row">
                <span>{t("kickoff")}</span>
                <span style={{ color: "var(--ink)" }}>{t("kickoff_val")}</span>
              </div>
              <div className="row">
                <span>{t("load")}</span>
                <span style={{ color: "var(--ok)" }}>{t("load_val")}</span>
              </div>
            </div>

            <div className="ct-card faq">
              <h4>{t("faq.label")}</h4>
              <details>
                <summary>{t("faq.q1")}</summary>
                <p>{t("faq.a1")}</p>
              </details>
              <details>
                <summary>{t("faq.q2")}</summary>
                <p>{t("faq.a2")}</p>
              </details>
              <details>
                <summary>{t("faq.q3")}</summary>
                <p>{t("faq.a3")}</p>
              </details>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
