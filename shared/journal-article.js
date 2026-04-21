(function () {
  const D = window.PORTFOLIO_DATA;
  const article = D.journal.find(j => j.slug === POST_SLUG);
  if (!article) {
    document.getElementById('postBody').textContent = 'Article not found.';
    return;
  }

  function fmt(iso) {
    const [y, m, d] = iso.split('-');
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return `${d} ${months[+m - 1]} ${y}`;
  }

  function render() {
    document.getElementById('postKicker').textContent = window.td(article.kicker);
    document.getElementById('postTitle').textContent = window.td(article.title);
    document.getElementById('postMeta').textContent =
      `${fmt(article.date)} · ${article.read} · Vitor Gabriel`;

    document.getElementById('postBack').textContent =
      window.t ? (window.t('journal.back') || '← Journal') : '← Journal';

    marked.use({
      gfm: true,
      breaks: true,
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
    });

    document.getElementById('postBody').innerHTML = marked.parse(window.td(article.excerpt));
  }

  render();
  window.addEventListener('langchange', render);

  // Giscus comments
  // Prerequisites: enable GitHub Discussions on vitorgabrieldev/vitorgabrieldev.io
  // then visit giscus.app to get your repo-id and category-id
  const giscus = document.createElement('div');
  giscus.className = 'post__comments';
  giscus.style.cssText = 'max-width:680px;margin:64px auto 0;padding:0 var(--pad-page)';
  document.querySelector('.post').appendChild(giscus);

  const s = document.createElement('script');
  s.src = 'https://giscus.app/client.js';
  s.setAttribute('data-repo', 'vitorgabrieldev/vitorgabrieldev.io');
  s.setAttribute('data-repo-id', 'R_kgDONRIHbw');
  s.setAttribute('data-category', 'General');
  s.setAttribute('data-category-id', 'DIC_kwDONRIHb84C7YEK');
  s.setAttribute('data-mapping', 'pathname');
  s.setAttribute('data-strict', '0');
  s.setAttribute('data-reactions-enabled', '1');
  s.setAttribute('data-emit-metadata', '1');
  s.setAttribute('data-input-position', 'top');
  s.setAttribute('data-theme', document.documentElement.dataset.theme === 'dark' ? 'dark_dimmed' : 'light_protanopia');
  s.setAttribute('data-lang', document.documentElement.lang === 'en' ? 'en' : 'pt');
  s.setAttribute('data-loading', 'lazy');
  s.setAttribute('crossorigin', 'anonymous');
  s.async = true;
  giscus.appendChild(s);

  // sync theme with page
  window.addEventListener('themechange', () => {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({
      giscus: { setConfig: { theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light' } }
    }, 'https://giscus.app');
  });
})();
