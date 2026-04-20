/* Shared footer — include via script tag */
(function() {
  const d = window.PORTFOLIO_DATA;
  if (!d) return;

  const now = new Date();
  const tzHour = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const time = tzHour.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const footHTML = `
  <footer class="foot">
    <div class="foot__grid">
      <div class="foot__col foot__brand">
        <h4>/ STUDIO</h4>
        <div style="font-family:var(--font-display); font-size:28px; letter-spacing:-0.02em; line-height:1.1;">
          Let's ship something precise.
        </div>
        <p>Open to full-time, project contracts and freelance. Remote or hybrid (Londrina, BR). Replies within 24h on weekdays.</p>
        <div style="display:flex; gap:12px; margin-top:20px; flex-wrap:wrap;">
          <a href="contact.html" data-link class="btn btn--primary" style="font-size:11px; color:#fff; padding:10px 16px;">Start a conversation →</a>
          <a href="mailto:${d.meta.email}" class="btn" style="padding:10px 28px;">Email</a>
        </div>
      </div>
      <div class="foot__col">
        <h4>/ SITE</h4>
        <a href="index.html" data-link>Index</a>
        <a href="projects.html" data-link>Work</a>
        <a href="about.html" data-link>About</a>
        <a href="journal.html" data-link>Journal</a>
        <a href="contact.html" data-link>Contact</a>
      </div>
      <div class="foot__col">
        <h4>/ ELSEWHERE</h4>
        <a href="https://github.com/${d.meta.github}" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="https://wa.me/5543984873807" target="_blank" rel="noopener">WhatsApp ↗</a>
        <a href="https://vitorgabrieldev.github.io/vitorgabrieldev.io/assets/pdfs/CV.pdf" target="_blank" rel="noopener">CV (PDF) ↗</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
      <div class="foot__col">
        <h4>/ INFO</h4>
        <a style="cursor:default">${d.meta.location}</a>
        <a style="cursor:default">${d.meta.tz}</a>
        <a style="cursor:default">v2026.04</a>
      </div>
    </div>
    <div class="foot__bottom">
      <span>© 2026 VITOR GABRIEL DE OLIVEIRA</span>
      <span class="time"><span style="width:6px;height:6px;border-radius:50%;background:var(--ok);display:inline-block"></span> ${time} LONDRINA</span>
      <span>HANDCRAFTED · NO TEMPLATES</span>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('beforeend', footHTML);
})();
