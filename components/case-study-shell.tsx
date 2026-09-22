"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import type { TocItem } from "@/lib/toc";

export function CaseStudyShell({ toc, children }: { toc: TocItem[]; children: ReactNode }) {
  const t = useTranslations("project");
  const [readMode, setReadMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);

  useEffect(() => {
    document.body.classList.toggle("read-mode", readMode);
    return () => document.body.classList.remove("read-mode");
  }, [readMode]);

  useEffect(() => {
    const sections = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [toc]);

  return (
    <div className="case__body">
      <div className="case__body-inner">
        <aside className="case__aside">
          <h4>{t("on_page")}</h4>
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-section={item.id}
              className={item.id === activeId ? "is-active" : undefined}
            >
              {item.title}
            </a>
          ))}
          <div className="tools">
            <h4 style={{ marginTop: 8 }}>{t("tools")}</h4>
            <button type="button" className="tool-btn" onClick={() => setReadMode(true)}>
              {t("tool_read")}
            </button>
            <button type="button" className="tool-btn" onClick={() => window.print()}>
              {t("print")}
            </button>
          </div>
        </aside>

        <article className="case__article">{children}</article>
      </div>

      <button type="button" className="btn read-exit" onClick={() => setReadMode(false)}>
        {t("exit_read")}
      </button>
    </div>
  );
}
