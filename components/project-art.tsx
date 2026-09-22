import type { Project } from "@/lib/projects";

const MONOGRAMS: Record<Project["glyph"], string> = {
  shield: "MT",
  building: "CO",
  handshake: "TA",
  mic: "DF",
  terminal: "CL",
  paw: "PL",
};

function Glyph({ glyph, accent }: { glyph: Project["glyph"]; accent: string }) {
  const common = {
    fill: "none",
    stroke: accent,
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (glyph) {
    case "shield":
      return (
        <g strokeOpacity="0.7">
          <path {...common} d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" />
          <path {...common} strokeOpacity="0.9" d="m8.7 12 2.2 2.2 4.4-4.6" />
          <circle cx="4.5" cy="19.5" r="1" fill={accent} fillOpacity="0.6" stroke="none" />
          <circle cx="8" cy="21" r="1" fill={accent} fillOpacity="0.6" stroke="none" />
          <circle cx="16" cy="21" r="1" fill={accent} fillOpacity="0.6" stroke="none" />
          <circle cx="19.5" cy="19.5" r="1" fill={accent} fillOpacity="0.6" stroke="none" />
        </g>
      );
    case "building":
      return (
        <g strokeOpacity="0.7">
          <path {...common} d="M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M13 21V9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v12M5 21h16" />
          <rect x="7.2" y="6.5" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <rect x="10.2" y="6.5" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <rect x="7.2" y="10" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <rect x="10.2" y="10" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <rect x="7.2" y="13.5" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <rect x="10.2" y="13.5" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <rect x="15.2" y="11" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <rect x="18" y="11" width="1.6" height="1.6" fill={accent} fillOpacity="0.55" stroke="none" />
          <path {...common} strokeOpacity="0.9" d="M2.5 15.5 7 12l3 2 4-3.5 3 1.8 4.5-3" />
        </g>
      );
    case "handshake":
      return (
        <g strokeOpacity="0.7">
          <path
            {...common}
            d="m11 17 1.6-1.6a2 2 0 0 1 2.8 0 2 2 0 0 0 2.8 0l1.7-1.7a2 2 0 0 0 0-2.8l-5-5a2 2 0 0 0-2.8 0L9.8 8.2M11 17l-1.6 1.6a2 2 0 0 1-2.8 0 2 2 0 0 0-2.8 0L2 19M11 17l-1.5-1.5M2 8l2.3-2.3a2 2 0 0 1 2.8 0L9.8 8.2M9.8 8.2 12 10.4"
          />
          <path
            {...common}
            strokeOpacity="0.9"
            d="M19.5 3.5 20 5l1.5.5L20 6l-.5 1.5L19 6l-1.5-.5L19 5Z"
          />
          <path {...common} strokeOpacity="0.6" d="M4 3.2 4.3 4l.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3Z" />
        </g>
      );
    case "mic":
      return (
        <g strokeOpacity="0.7">
          <path {...common} d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3ZM19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
          <path {...common} strokeOpacity="0.4" d="M3.5 9.5a8.5 8.5 0 0 1 1-4M20.5 9.5a8.5 8.5 0 0 0-1-4" />
          <path {...common} strokeOpacity="0.25" d="M1.5 9.5a10.5 10.5 0 0 1 1.3-5.2M22.5 9.5a10.5 10.5 0 0 0-1.3-5.2" />
        </g>
      );
    case "terminal":
      return (
        <g strokeOpacity="0.7">
          <rect {...common} x="2.5" y="4.5" width="19" height="15" rx="1.5" />
          <path {...common} strokeOpacity="0.4" d="M2.5 8.5h19" />
          <circle cx="4.7" cy="6.5" r="0.5" fill={accent} fillOpacity="0.6" stroke="none" />
          <circle cx="6.3" cy="6.5" r="0.5" fill={accent} fillOpacity="0.6" stroke="none" />
          <path {...common} strokeOpacity="0.9" d="m5.5 12 3 2.4-3 2.4" />
          <path {...common} strokeOpacity="0.9" d="M11.5 16.8h5.5" />
        </g>
      );
    case "paw":
      return (
        <g strokeOpacity="0.7">
          <path
            {...common}
            fill={accent}
            fillOpacity="0.18"
            d="M8 13c2 0 3.5 2 3.5 4.2S10 20 8 20s-3.5-1.5-3.5-2.8S6 13 8 13ZM16 13c2 0 3.5 2 3.5 4.2S18 20 16 20s-3.5-1.5-3.5-2.8S14 13 16 13ZM5 7.5C5 6.1 5.8 5 7 5s2 1.1 2 2.5S8.2 10 7 10s-2-1.1-2-2.5ZM15 7.5c0-1.4.8-2.5 2-2.5s2 1.1 2 2.5-.8 2.5-2 2.5-2-1.1-2-2.5Z"
          />
          <path {...common} strokeOpacity="0.9" d="M12 3.4c-.9.9-.9 2.3 0 3.2.9-.9.9-2.3 0-3.2Z" fill={accent} fillOpacity="0.4" />
          <g opacity="0.45" transform="translate(-11.5, 6) scale(0.42)">
            <path
              {...common}
              fill={accent}
              fillOpacity="0.18"
              d="M8 13c2 0 3.5 2 3.5 4.2S10 20 8 20s-3.5-1.5-3.5-2.8S6 13 8 13ZM16 13c2 0 3.5 2 3.5 4.2S18 20 16 20s-3.5-1.5-3.5-2.8S14 13 16 13ZM5 7.5C5 6.1 5.8 5 7 5s2 1.1 2 2.5S8.2 10 7 10s-2-1.1-2-2.5ZM15 7.5c0-1.4.8-2.5 2-2.5s2 1.1 2 2.5-.8 2.5-2 2.5-2-1.1-2-2.5Z"
            />
          </g>
        </g>
      );
    default:
      return null;
  }
}

/** Deterministic pastel gradient + line-art placeholder used in place of a
 *  real screenshot (most of these projects never had one taken). Rendered as
 *  a plain <svg> so the dark-mode invert rule in globals.css (targeting
 *  .thumb-canvas / .case__hero svg / .portrait-art svg) applies to it. */
export function ProjectArt({ project, className }: { project: Project; className?: string }) {
  const gid = `pg-${project.slug}`;

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={project.accent} stopOpacity="0.38" />
          <stop offset="100%" stopColor={project.accent} stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id={`${gid}-orb1`}>
          <stop offset="0%" stopColor={project.accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={project.accent} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${gid}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill={project.accent} fillOpacity="0.16" />
        </pattern>
        <filter id={`${gid}-blur`}>
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <rect width="400" height="300" fill={`url(#${gid}-bg)`} />
      <rect width="400" height="300" fill={`url(#${gid}-dots)`} />

      <circle cx="330" cy="40" r="90" fill={`url(#${gid}-orb1)`} filter={`url(#${gid}-blur)`} />
      <circle cx="20" cy="280" r="70" fill={`url(#${gid}-orb1)`} filter={`url(#${gid}-blur)`} />

      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={-40 + i * 100}
          y1="320"
          x2={140 + i * 100}
          y2="-20"
          stroke={project.accent}
          strokeOpacity="0.1"
          strokeWidth="1"
        />
      ))}

      <g transform="translate(148, 98) scale(5.2)">
        <Glyph glyph={project.glyph} accent={project.accent} />
      </g>

      <g transform="translate(348, 262)" opacity="0.7">
        <rect x="-24" y="-14" width="48" height="28" rx="6" fill={project.accent} fillOpacity="0.14" />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily="var(--font-mono, monospace)"
          fontSize="12"
          letterSpacing="0.05em"
          fill={project.accent}
          fillOpacity="0.85"
        >
          {MONOGRAMS[project.glyph]}
        </text>
      </g>
    </svg>
  );
}
