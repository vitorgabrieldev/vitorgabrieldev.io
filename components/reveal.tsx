"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
  as?: "div" | "section";
};

/** Fades/slides an element in once it enters the viewport. Pure CSS transition
 *  (see .reveal / .reveal.in in globals.css) — this component only toggles
 *  the class via IntersectionObserver, mirroring the legacy shared/nav.js. */
export function Reveal({ children, delay, className, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  const classes = ["reveal", delay ? `reveal-delay-${delay}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref as never} className={classes}>
      {children}
    </Tag>
  );
}
