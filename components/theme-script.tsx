import Script from "next/script";

const THEME_INIT = `
(function () {
  try {
    var stored = localStorage.getItem('vg_theme');
    var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

/** Sets data-theme before paint so there's no flash of the wrong theme —
 *  same mechanism as the legacy tweaks panel (attribute + localStorage),
 *  just applied unconditionally instead of behind a hidden iframe control.
 *  Uses next/script's beforeInteractive strategy (rather than a raw <script>
 *  in the React tree) so it's injected once into the initial HTML and never
 *  re-diffed client-side — avoids React 19's "script tag in component" warning. */
export function ThemeScript() {
  return <Script id="theme-init" strategy="beforeInteractive">{THEME_INIT}</Script>;
}
