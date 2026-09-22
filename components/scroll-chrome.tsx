"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/** Back-to-top button + top scroll-progress bar. Ported from shared/enhance.js,
 *  driven by a single scroll listener instead of two. */
export function ScrollChrome() {
  const t = useTranslations("btt");
  const [showTop, setShowTop] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 600);
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={barRef} className="scroll-progress__bar" />
      </div>
      <button
        type="button"
        className={`btt${showTop ? " is-shown" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("top")}
      >
        <span aria-hidden="true">↑</span>
        <span className="btt__label">{t("top")}</span>
      </button>
    </>
  );
}
