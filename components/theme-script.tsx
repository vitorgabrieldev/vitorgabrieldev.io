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
 *  just applied unconditionally instead of behind a hidden iframe control. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}
