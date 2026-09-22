"use client";

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("vg_theme", next);
  } catch {}
}

/** Renders both glyphs and lets CSS pick the visible one via [data-theme] —
 *  avoids needing client state (and its hydration flash) just to know the
 *  current theme, since ThemeScript already sets the attribute before paint. */
export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="mono text-[11px] w-8 h-8 inline-flex items-center justify-center rounded-full border border-(--line) text-(--ink-muted) hover:text-(--ink) hover:border-(--ink) transition-colors"
    >
      <span className="theme-toggle-icon-light">☾</span>
      <span className="theme-toggle-icon-dark">☀</span>
    </button>
  );
}
