"use client";

import { useEffect, useRef, useState } from "react";

export type ShowcaseItem = {
  key: string;
  src: string;
  poster: string;
  label: string;
};

/** Carousel of muted screen-capture videos (top-to-bottom scroll of a live
 *  page), used in the case-study hero in place of ProjectArt when a project
 *  has real screenshots. Plays through the slides on its own — each clip
 *  auto-advances to the next as soon as it ends, crossfading between them —
 *  and can also be driven manually via the arrows/tabs. */
export function ProjectShowcase({ items, accent }: { items: ShowcaseItem[]; accent: string }) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  function go(delta: number) {
    setActive((i) => (i + delta + items.length) % items.length);
  }

  return (
    <div className="showcase">
      <div className="showcase__stage">
        {items.map((item, i) => (
          <video
            key={item.key}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className="showcase__video"
            style={{ opacity: i === active ? 1 : 0 }}
            src={item.src}
            poster={item.poster}
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              if (i === active) go(1);
            }}
          />
        ))}
        {items.length > 1 && (
          <>
            <button type="button" className="showcase__nav showcase__nav--prev" onClick={() => go(-1)} aria-label="Anterior">
              ‹
            </button>
            <button type="button" className="showcase__nav showcase__nav--next" onClick={() => go(1)} aria-label="Próximo">
              ›
            </button>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div className="showcase__dots">
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className={i === active ? "is-active" : ""}
              style={i === active ? { background: accent, borderColor: accent } : undefined}
              onClick={() => setActive(i)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
