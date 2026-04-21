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
})();
