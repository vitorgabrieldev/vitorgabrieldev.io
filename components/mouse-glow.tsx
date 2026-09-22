"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Tracks the pointer over its own bounds and exposes the position as
 *  --mx/--my (percentages), smoothed by lerping toward the target each
 *  frame — the CSS gradient that reads these variables ends up drifting
 *  smoothly instead of snapping straight to the cursor. */
export function MouseGlow({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 80, y: 0 });
  const current = useRef({ x: 80, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    }
    el.addEventListener("mousemove", onMove);

    let rafId = requestAnimationFrame(tick);
    function tick() {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      el!.style.setProperty("--mx", `${current.current.x}%`);
      el!.style.setProperty("--my", `${current.current.y}%`);
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
