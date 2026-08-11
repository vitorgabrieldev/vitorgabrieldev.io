/* Nav + global interactions shared across pages
   Loads automatically from any page. */
(function() {
  const path = location.pathname.split('/').pop() || 'index.html';

  // ============== NAV ==============
  const navHTML = `
  <header class="nav" id="siteNav">
    <div class="nav__inner">
      <a href="index.html" class="nav__brand" data-link>
        <span class="nav__mark"></span>
        <span class="nav__brand-name">Vitor Gabriel</span>
        <span class="nav__brand-meta mono" data-i18n="nav.engineer">/ ENGENHEIRO</span>
      </a>
      <nav class="nav__links">
        <a href="index.html" data-link data-match="index.html" data-i18n="nav.index">Início</a>
        <a href="projects.html" data-link data-match="projects.html,project.html" data-i18n="nav.work">Projetos</a>
        <a href="about.html" data-link data-match="about.html" data-i18n="nav.about">Sobre</a>
        <a href="journal.html" data-link data-match="journal.html" data-i18n="nav.journal">Diário</a>
        <div class="lang-toggle mono" role="group" aria-label="Language">
          <button type="button" data-lang="pt" class="active">PT</button>
          <span class="lang-toggle__sep">/</span>
          <button type="button" data-lang="en">EN</button>
        </div>
        <a href="contact.html" data-link data-match="contact.html" class="nav__cta">
          <span data-i18n="nav.available">Disponível</span> →
        </a>
      </nav>
    </div>
  </header>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // active state
  document.querySelectorAll('[data-match]').forEach(a => {
    const matches = a.dataset.match.split(',');
    if (matches.includes(path)) a.classList.add('active');
  });
  // highlight journal when reading an article
  if (location.pathname.includes('/journal/')) {
    document.querySelector('[data-match="journal.html"]')?.classList.add('active');
  }

  // lang toggle
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.setLang) window.setLang(btn.dataset.lang);
    });
  });

  // ============== SCROLL REVEAL ==============
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  // auto-mark common things
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ============== PAGE TRANSITIONS ==============
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-link]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
    if (a.target === '_blank') return;
    e.preventDefault();
    overlay.classList.add('cover');
    setTimeout(() => { location.href = href; }, 260);
  });

  // ============== CMD+K (fake) ==============
  // no-op hook for now

  // ============== SERVICE WORKER ==============
  const isDev = ['localhost', '127.0.0.1'].includes(location.hostname);
  if ('serviceWorker' in navigator) {
    if (isDev) {
      // dev: kill any previously registered SW + its caches so nothing is ever cached locally
      navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
      if ('caches' in window) caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    } else {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }
  }
})();
