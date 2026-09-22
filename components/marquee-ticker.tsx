"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type Item = { label: string; description: string };

const CRUISE_SPEED = 46; // px/s

/** Infinite tech ticker, driven by requestAnimationFrame instead of a CSS
 *  keyframe so hovering can ease the velocity down to 0 (and back up) instead
 *  of an abrupt pause/resume. The tooltip lives outside the ticker's clipped
 *  (overflow:hidden) container and is repositioned every frame to track
 *  whichever item is currently under the cursor. */
export function MarqueeTicker({ items }: { items: Item[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const velocity = useRef(CRUISE_SPEED);
  const target = useRef(CRUISE_SPEED);
  const x = useRef(0);
  const half = useRef(0);
  const lastT = useRef<number | null>(null);
  const hoveredEl = useRef<HTMLElement | null>(null);
  const [hoveredDesc, setHoveredDesc] = useState<string | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    const tooltip = tooltipRef.current;
    if (!track || !wrap || !tooltip) return;

    const measure = () => {
      half.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function positionTooltip() {
      if (!hoveredEl.current) return;
      const itemRect = hoveredEl.current.getBoundingClientRect();
      const wrapRect = wrap!.getBoundingClientRect();
      tooltip!.style.left = `${itemRect.left - wrapRect.left + itemRect.width / 2}px`;
      tooltip!.style.top = `${itemRect.bottom - wrapRect.top + 12}px`;
    }

    let rafId = requestAnimationFrame(frame);

    function frame(t: number) {
      if (!reduceMotion) {
        if (lastT.current == null) lastT.current = t;
        const dt = Math.min(48, t - lastT.current);
        lastT.current = t;

        const k = 1 - Math.exp(-dt * 0.02);
        velocity.current += (target.current - velocity.current) * k;

        x.current -= (velocity.current * dt) / 1000;
        if (half.current > 0) {
          if (x.current <= -half.current) x.current += half.current;
          if (x.current > 0) x.current -= half.current;
        }
        track!.style.transform = `translateX(${x.current}px)`;
      }
      if (hoveredEl.current) positionTooltip();
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  function onEnter(e: MouseEvent<HTMLSpanElement>, description: string) {
    hoveredEl.current = e.currentTarget;
    target.current = 0;
    setHoveredDesc(description);
  }

  function onLeave() {
    hoveredEl.current = null;
    target.current = CRUISE_SPEED;
    setHoveredDesc(null);
  }

  const doubled = [...items, ...items];

  return (
    <div ref={wrapRef} className="marquee-wrap">
      <div className="marquee">
        <div ref={trackRef} className="marquee__track">
          {doubled.map((item, i) => (
            <span
              key={`${item.label}-${i}`}
              className="marquee__item"
              onMouseEnter={(e) => onEnter(e, item.description)}
              onMouseLeave={onLeave}
            >
              {item.label}
              <span className="marquee__sep">&nbsp;·&nbsp;</span>
            </span>
          ))}
        </div>
      </div>
      <div ref={tooltipRef} className={`marquee__tooltip${hoveredDesc ? " is-shown" : ""}`}>
        {hoveredDesc}
      </div>
    </div>
  );
}
