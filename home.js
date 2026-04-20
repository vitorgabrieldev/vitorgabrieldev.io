/* ============== HOME PAGE LOGIC ============== */
(function() {
  const D = window.PORTFOLIO_DATA;

  function renderFeatured() {
    const featGrid = document.getElementById('featuredGrid');
    const featured = D.projects.filter(p => p.featured);
    featGrid.innerHTML = featured.map((p, i) => `
      <a href="project.html?id=${p.id}" data-link class="feat__item reveal" data-cursor>
        <div class="feat__meta">
          <div class="feat__chipline">
            <span class="chip"><span class="dot" style="background:${p.accent}"></span>${window.td(p.category)}</span>
            <span class="chip" style="background:var(--bg)">${p.year}</span>
            <span class="chip" style="background:var(--bg)">${window.td(p.role)}</span>
          </div>
          <div class="feat__num">CASE · 0${i+1} / 0${featured.length}</div>
          <h3 class="feat__title">${p.name}</h3>
          <p class="feat__desc">${window.td(p.summary)}</p>
          <div class="feat__stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
          <p class="feat__impact">${window.td(p.impact)}</p>
          <span class="feat__link">${window.t('projects.read_case')}</span>
        </div>
        <div class="feat__thumb">
          <div class="feat__thumb-art">
            ${thumbArt(p, i)}
          </div>
        </div>
      </a>
    `).join('');

    document.querySelectorAll('.feat__item').forEach(el => {
      new IntersectionObserver((entries, io) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.08 }).observe(el);
    });
  }

  function renderCaps() {
    const caps = [
      { num: "01", tk: 'cap.01.t', bk: 'cap.01.b' },
      { num: "02", tk: 'cap.02.t', bk: 'cap.02.b' },
      { num: "03", tk: 'cap.03.t', bk: 'cap.03.b' },
      { num: "04", tk: 'cap.04.t', bk: 'cap.04.b' },
      { num: "05", tk: 'cap.05.t', bk: 'cap.05.b' },
      { num: "06", tk: 'cap.06.t', bk: 'cap.06.b' },
      { num: "07", tk: 'cap.07.t', bk: 'cap.07.b' },
      { num: "08", tk: 'cap.08.t', bk: 'cap.08.b' },
    ];
    document.getElementById('capsGrid').innerHTML = caps.map(c => `
      <div class="reveal">
        <div class="num">${c.num}</div>
        <div class="t">${window.t(c.tk)}</div>
        <div class="b">${window.t(c.bk)}</div>
      </div>
    `).join('');
  }

  function renderJournal() {
    document.getElementById('journalList').innerHTML = D.journal.slice(0, 4).map(j => `
      <a href="journal.html#${j.slug}" data-link>
        <span class="date">${formatDate(j.date)}</span>
        <span class="kicker">${window.td(j.kicker)}</span>
        <span class="t">${window.td(j.title)}</span>
        <span class="r">${j.read} · →</span>
      </a>
    `).join('');
  }

  function render() {
    renderFeatured();
    renderCaps();
    renderJournal();

    document.querySelectorAll('.reveal').forEach(el => {
      if (el.classList.contains('in')) return;
      new IntersectionObserver((entries, io) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.08 }).observe(el);
    });
  }

  render();

  window.addEventListener('langchange', render);

  function formatDate(iso) {
    const [y,m,d] = iso.split('-');
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return `${d} ${months[+m-1]} ${y}`;
  }

  function thumbArt(p, i) {
    const w = 800, h = 600;
    const accent = p.accent;
    if (i === 0) {
      return `<svg class="thumb-canvas" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
        <rect width="${w}" height="${h}" fill="#ede7db"/>
        ${Array.from({length:12}, (_,r) => `<line x1="0" y1="${50+r*46}" x2="${w}" y2="${50+r*46}" stroke="rgba(30,26,22,.08)" stroke-width="1"/>`).join('')}
        ${Array.from({length:9}, (_,c) => `<line x1="${80+c*90}" y1="0" x2="${80+c*90}" y2="${h}" stroke="rgba(30,26,22,.06)" stroke-width="1"/>`).join('')}
        <g font-family="JetBrains Mono, monospace" font-size="14" fill="#5b534a">
          <text x="30" y="70">TXN_001</text><text x="190" y="70">CREDIT</text><text x="380" y="70">+ R$ 1 200,00</text><text x="630" y="70" fill="${accent}">● OK</text>
          <text x="30" y="116">TXN_002</text><text x="190" y="116">DEBIT</text><text x="380" y="116">− R$ 85,50</text><text x="630" y="116" fill="${accent}">● OK</text>
          <text x="30" y="162">TXN_003</text><text x="190" y="162">TRANSFER</text><text x="380" y="162">− R$ 2 000,00</text><text x="630" y="162" fill="${accent}">● OK</text>
          <text x="30" y="208" fill="#1e1a16" font-weight="500">TXN_004</text><text x="190" y="208">CREDIT</text><text x="380" y="208" font-weight="500" fill="#1e1a16">+ R$ 14 800,00</text><text x="630" y="208" fill="${accent}">● OK</text>
          <text x="30" y="254">TXN_005</text><text x="190" y="254">FEE</text><text x="380" y="254">− R$ 3,49</text><text x="630" y="254" fill="${accent}">● OK</text>
          <text x="30" y="300">TXN_006</text><text x="190" y="300">DEBIT</text><text x="380" y="300">− R$ 412,00</text><text x="630" y="300" fill="${accent}">● OK</text>
        </g>
        <rect x="${w-170}" y="${h-80}" width="140" height="50" fill="${accent}" rx="4"/>
        <text x="${w-100}" y="${h-48}" font-family="JetBrains Mono, monospace" font-size="14" fill="#fff" text-anchor="middle" font-weight="500">DOUBLE-ENTRY</text>
      </svg>`;
    }
    if (i === 1) {
      return `<svg class="thumb-canvas" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
        <rect width="${w}" height="${h}" fill="#ede7db"/>
        <g stroke="rgba(30,26,22,.25)" stroke-width="1.5" fill="none">
          <path d="M60 300 L200 300"/><path d="M260 300 L400 200"/><path d="M260 300 L400 300"/><path d="M260 300 L400 400"/>
          <path d="M460 200 L600 300"/><path d="M460 300 L600 300"/><path d="M460 400 L600 300"/>
          <path d="M660 300 L740 300"/>
        </g>
        <g font-family="JetBrains Mono, monospace" font-size="12">
          <circle cx="230" cy="300" r="30" fill="#fbf8f2" stroke="${accent}" stroke-width="2"/>
          <text x="230" y="304" text-anchor="middle" fill="#1e1a16">BUILD</text>
          <circle cx="430" cy="200" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
          <text x="430" y="204" text-anchor="middle" fill="#5b534a">LINT</text>
          <circle cx="430" cy="300" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
          <text x="430" y="304" text-anchor="middle" fill="#5b534a">TEST</text>
          <circle cx="430" cy="400" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
          <text x="430" y="404" text-anchor="middle" fill="#5b534a">E2E</text>
          <circle cx="630" cy="300" r="30" fill="${accent}" stroke="${accent}" stroke-width="2"/>
          <text x="630" y="304" text-anchor="middle" fill="#fff">RISK</text>
          <circle cx="770" cy="300" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
          <text x="770" y="304" text-anchor="middle" fill="#5b534a">SHIP</text>
        </g>
        <g font-family="JetBrains Mono, monospace" font-size="11" fill="#5b534a">
          <text x="30" y="40">deploy.yml</text>
          <text x="30" y="${h-40}">risk: LOW · 0 blockers · 3 reviewers</text>
        </g>
      </svg>`;
    }
    if (i === 2) {
      return `<svg class="thumb-canvas" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
        <rect width="${w}" height="${h}" fill="#ede7db"/>
        <g stroke="rgba(30,26,22,.15)" stroke-width="1">
          <line x1="400" y1="300" x2="180" y2="150"/><line x1="400" y1="300" x2="620" y2="140"/>
          <line x1="400" y1="300" x2="120" y2="420"/><line x1="400" y1="300" x2="680" y2="430"/>
          <line x1="400" y1="300" x2="290" y2="500"/><line x1="400" y1="300" x2="540" y2="490"/>
          <line x1="180" y1="150" x2="290" y2="500"/><line x1="620" y1="140" x2="540" y2="490"/>
        </g>
        <g>
          <circle cx="400" cy="300" r="52" fill="${accent}"/>
          <text x="400" y="306" text-anchor="middle" font-family="Inter Tight" font-size="20" fill="#fff" font-weight="500">YOU</text>
          <circle cx="180" cy="150" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
          <circle cx="620" cy="140" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
          <circle cx="120" cy="420" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
          <circle cx="680" cy="430" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
          <circle cx="290" cy="500" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
          <circle cx="540" cy="490" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
        </g>
        <g font-family="JetBrains Mono, monospace" font-size="11" fill="#5b534a">
          <text x="30" y="40">casting.graph</text>
          <text x="30" y="${h-40}">1 284 nodes · 3 802 edges · realtime</text>
        </g>
      </svg>`;
    }
    return '';
  }
})();
