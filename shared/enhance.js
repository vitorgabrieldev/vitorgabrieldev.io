/* Global enhancements — Cmd+K search, back-to-top, scroll progress.
   Depends on window.PORTFOLIO_DATA (from shared/data.js) already loaded. */
(function () {
  // ---------- BACK TO TOP ----------
  const btt = document.createElement('button');
  btt.className = 'btt';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    <span>TOP</span>`;
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btt);

  // ---------- SCROLL PROGRESS ----------
  const prog = document.createElement('div');
  prog.className = 'scroll-progress';
  prog.innerHTML = '<div class="scroll-progress__bar"></div>';
  document.body.appendChild(prog);
  const bar = prog.querySelector('.scroll-progress__bar');

  const onScroll = () => {
    const y = window.scrollY;
    btt.classList.toggle('show', y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- CMD+K PALETTE ----------
  const palette = document.createElement('div');
  palette.className = 'palette';
  palette.hidden = true;
  palette.innerHTML = `
    <div class="palette__backdrop" data-close></div>
    <div class="palette__dialog" role="dialog" aria-modal="true" aria-label="Search">
      <div class="palette__search">
        <span class="palette__icon">⌕</span>
        <input type="text" placeholder="Search projects, writing, about…" autocomplete="off" spellcheck="false">
        <kbd class="palette__hint">ESC</kbd>
      </div>
      <div class="palette__results" role="listbox"></div>
      <div class="palette__foot mono">
        <span><kbd>↑↓</kbd> Navigate</span>
        <span><kbd>↵</kbd> Open</span>
        <span><kbd>⌘K</kbd> Toggle</span>
      </div>
    </div>`;
  document.body.appendChild(palette);

  const input = palette.querySelector('input');
  const results = palette.querySelector('.palette__results');

  // Build index from PORTFOLIO_DATA + static pages
  const D = window.PORTFOLIO_DATA || {};
  const index = [
    { type: 'page', label: 'Home', sub: 'Landing', href: 'index.html', icon: '⌂' },
    { type: 'page', label: 'Work', sub: 'All projects', href: 'projects.html', icon: '◱' },
    { type: 'page', label: 'About', sub: 'Background & experience', href: 'about.html', icon: '◐' },
    { type: 'page', label: 'Journal', sub: 'Writing', href: 'journal.html', icon: '✎' },
    { type: 'page', label: 'Contact', sub: 'Get in touch', href: 'contact.html', icon: '@' },
    ...((D.projects || []).map(p => ({
      type: 'project', label: p.name, sub: `${window.td ? window.td(p.category) : (p.category.en || p.category)} · ${p.year}`,
      href: `project.html?id=${p.id}`, icon: '▢',
      keywords: [p.name, p.category.en || p.category, ...(p.stack || []), p.summary.en || p.summary].join(' ').toLowerCase()
    }))),
    ...((D.journal || []).map(j => ({
      type: 'writing', label: j.title.en || j.title, sub: `${j.date} · ${j.readTime || ''}`.trim(),
      href: `journal.html#${j.id}`, icon: '✎',
      keywords: [j.title.en || j.title, j.kicker.en || j.kicker, j.excerpt.en || j.excerpt].join(' ').toLowerCase()
    }))),
    // Quick actions
    { type: 'action', label: 'Toggle theme', sub: 'Light ↔ Dark', icon: '◑',
      action: () => { const r = document.documentElement; r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark'; } },
    { type: 'action', label: 'Email Vitor', sub: (D.meta && D.meta.email) || '', icon: '@',
      action: () => { if (D.meta?.email) window.location.href = 'mailto:' + D.meta.email; } },
    { type: 'action', label: 'GitHub profile', sub: (D.meta && '@' + D.meta.github) || '', icon: '↗',
      action: () => { if (D.meta?.github) window.open('https://github.com/' + D.meta.github, '_blank'); } },
  ];

  let filtered = index.slice();
  let active = 0;

  const render = () => {
    if (!filtered.length) {
      results.innerHTML = `<div class="palette__empty mono">No results. Try "laravel", "risklog", "about"…</div>`;
      return;
    }
    results.innerHTML = filtered.map((r, i) => `
      <button class="palette__row ${i === active ? 'active' : ''}" data-i="${i}">
        <span class="palette__row-icon">${r.icon}</span>
        <span class="palette__row-main">
          <span class="palette__row-label">${r.label}</span>
          <span class="palette__row-sub mono">${r.sub || ''}</span>
        </span>
        <span class="palette__row-type mono">${r.type}</span>
      </button>
    `).join('');
  };

  const doFilter = (q) => {
    q = q.trim().toLowerCase();
    if (!q) filtered = index.slice();
    else filtered = index.filter(r =>
      r.label.toLowerCase().includes(q) ||
      (r.sub && r.sub.toLowerCase().includes(q)) ||
      (r.keywords && r.keywords.includes(q)) ||
      r.type.includes(q)
    );
    active = 0;
    render();
  };

  const open = () => {
    palette.hidden = false;
    requestAnimationFrame(() => {
      palette.classList.add('show');
      input.focus(); input.select();
    });
    doFilter(input.value);
  };
  const close = () => {
    palette.classList.remove('show');
    setTimeout(() => { palette.hidden = true; }, 200);
  };

  const activate = (r) => {
    close();
    if (!r) return;
    if (r.action) r.action();
    else if (r.href) window.location.href = r.href;
  };

  input.addEventListener('input', (e) => doFilter(e.target.value));
  palette.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]')) return close();
    const row = e.target.closest('.palette__row');
    if (row) activate(filtered[+row.dataset.i]);
  });

  window.addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette.hidden ? open() : close();
      return;
    }
    if (palette.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, filtered.length - 1); render(); scrollActive(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); active = Math.max(active - 1, 0); render(); scrollActive(); }
    if (e.key === 'Enter')     { e.preventDefault(); activate(filtered[active]); }
  });

  function scrollActive() {
    const el = results.querySelector('.palette__row.active');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  render();
})();
