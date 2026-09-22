"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

/** GitHub Discussions-backed comments — ported 1:1 from shared/journal-article.js,
 *  same repo/category ids. Loads client-side only, lazy. */
export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    const container = ref.current;
    if (!container || container.childElementCount > 0) return;
    const theme = document.documentElement.dataset.theme === "dark" ? "dark_dimmed" : "light_protanopia";

    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.setAttribute("data-repo", "vitorgabrieldev/vitorgabrieldev.io");
    s.setAttribute("data-repo-id", "R_kgDONRIHbw");
    s.setAttribute("data-category", "General");
    s.setAttribute("data-category-id", "DIC_kwDONRIHb84C7YEK");
    s.setAttribute("data-mapping", "pathname");
    s.setAttribute("data-strict", "0");
    s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-emit-metadata", "1");
    s.setAttribute("data-input-position", "top");
    s.setAttribute("data-theme", theme);
    s.setAttribute("data-lang", locale === "en" ? "en" : "pt");
    s.setAttribute("data-loading", "lazy");
    s.setAttribute("crossorigin", "anonymous");
    s.async = true;
    container.appendChild(s);
  }, [locale]);

  return <div ref={ref} className="post__comments" style={{ maxWidth: 680, margin: "64px auto 0", padding: "0 var(--pad-page)" }} />;
}
