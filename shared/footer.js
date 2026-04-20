/* Shared footer — translatable, re-renders on langchange */
(function() {
  const d = window.PORTFOLIO_DATA;
  if (!d) return;

  function render() {
    const now = new Date();
    const tzHour = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const time = tzHour.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const existing = document.querySelector('footer.foot');
    if (existing) existing.remove();

    const footHTML = `
    <footer class="foot">
      <div class="foot__grid">
        <div class="foot__col foot__brand">
          <h4>${window.t('foot.col.site')}</h4>
          <div style="font-family:var(--font-display); font-size:28px; letter-spacing:-0.02em; line-height:1.1;">
            ${window.t('foot.studio_title')}
          </div>
          <p>${window.t('foot.studio_p')}</p>
          <div style="display:flex; gap:12px; margin-top:20px; flex-wrap:wrap;">
            <a href="contact.html" data-link class="btn btn--primary" style="font-size:11px; color:#fff; padding:10px 16px;">${window.t('foot.start_conv')}</a>
            <a href="mailto:${d.meta.email}" class="btn" style="padding:10px 28px;">${window.t('btn.email')}</a>
          </div>
        </div>
        <div class="foot__col">
          <h4>/ SITE</h4>
          <a href="index.html" data-link>${window.t('foot.nav.index')}</a>
          <a href="projects.html" data-link>${window.t('foot.nav.work')}</a>
          <a href="about.html" data-link>${window.t('foot.nav.about')}</a>
          <a href="journal.html" data-link>${window.t('foot.nav.journal')}</a>
          <a href="contact.html" data-link>${window.t('foot.nav.contact')}</a>
        </div>
        <div class="foot__col">
          <h4>${window.t('foot.col.elsewhere')}</h4>
          <a href="https://github.com/${d.meta.github}" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="https://wa.me/5543984873807" target="_blank" rel="noopener">WhatsApp ↗</a>
          <a href="CV.pdf" target="_blank" rel="noopener">CV (PDF) ↗</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
        <div class="foot__col">
          <h4>${window.t('foot.col.info')}</h4>
          <a style="cursor:default">${d.meta.location}</a>
          <a style="cursor:default">${d.meta.tz}</a>
          <a style="cursor:default">v2026.04</a>
        </div>
      </div>
      <div class="foot__bottom">
        <span>© 2026 VITOR GABRIEL DE OLIVEIRA</span>
        <span class="time"><span style="width:6px;height:6px;border-radius:50%;background:var(--ok);display:inline-block"></span> ${time} LONDRINA</span>
        <span>${window.t('foot.handcrafted')}</span>
      </div>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', footHTML);
  }

  render();
  window.addEventListener('langchange', render);
})();
