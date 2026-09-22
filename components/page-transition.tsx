"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

/** Plays the legacy "cover" wipe animation on route change. App Router
 *  navigations are already client-side, so this just reacts to pathname
 *  changes instead of intercepting link clicks like the old shared/nav.js did. */
export function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = overlayRef.current;
    if (!el) return;
    el.classList.remove("is-covering");
    // force reflow so the animation restarts on every navigation
    void el.offsetWidth;
    el.classList.add("is-covering");
    const timeout = setTimeout(() => el.classList.remove("is-covering"), 560);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return <div ref={overlayRef} className="page-transition" aria-hidden="true" />;
}
