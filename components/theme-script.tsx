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
 *  Uses next/script's beforeInteractive strategy so it's injected once into
 *  the initial HTML and never re-diffed client-side. The content is passed
 *  via dangerouslySetInnerHTML rather than children — React 19 warns
 *  ("script tag in component") on the children form because it can't
 *  guarantee that variant only ever renders once during SSR. */
export function ThemeScript() {
  return (
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: THEME_INIT }}
    />
  );
}
