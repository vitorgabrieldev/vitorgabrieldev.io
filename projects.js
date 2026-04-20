(function() {
  const D = window.PORTFOLIO_DATA;
  const root = document.getElementById('projectsRoot');
  const filterBar = document.getElementById('filterBar');
  const countBadge = document.getElementById('countBadge');
  let mode = 'list';
  let filter = 'all';

  // Build filter buttons from categories
  const cats = ['all', ...new Set(D.projects.map(p => p.category))];
  filterBar.innerHTML = cats.map(c => {
    const n = c === 'all' ? D.projects.length : D.projects.filter(p => p.category === c).length;
    return `<button class="filter-btn ${c==='all'?'active':''}" data-filter="${c}">${c === 'all' ? 'All' : c}<span class="c">${n}</span></button>`;
  }).join('');

  filterBar.addEventListener('click', e => {
    const b = e.target.closest('.filter-btn');
    if (!b) return;
    filter = b.dataset.filter;
    filterBar.querySelectorAll('.filter-btn').forEach(x => x.classList.toggle('active', x === b));
    render();
  });

  document.querySelectorAll('.mode-btn').forEach(b => {
    b.addEventListener('click', () => {
      mode = b.dataset.mode;
      document.querySelectorAll('.mode-btn').forEach(x => x.classList.toggle('active', x === b));
      render();
    });
  });

  function filtered() {
    return filter === 'all' ? D.projects : D.projects.filter(p => p.category === filter);
  }

  function render() {
    const items = filtered();
    countBadge.textContent = `${items.length} result${items.length!==1?'s':''}`;
    if (mode === 'list') return renderList(items);
    if (mode === 'grid') return renderGrid(items);
    if (mode === 'gallery') return renderGallery(items);
  }

  function renderList(items) {
    root.innerHTML = `<div class="plist">${items.map((p, i) => `
      <a href="project.html?id=${p.id}" data-link>
        <span class="plist__n">0${i+1}</span>
        <span class="plist__name">${p.name}<span class="cat">${p.category}</span></span>
        <span class="plist__desc">${p.summary}</span>
        <span class="plist__stack">${p.stack.slice(0,4).map(s => `<span>${s}</span>`).join('')}</span>
        <span class="plist__year">${p.year}</span>
        <span class="plist__arrow">→</span>
      </a>
    `).join('')}</div>`;
  }

  function renderGrid(items) {
    root.innerHTML = `<div class="pgrid">${items.map((p, i) => `
      <a href="project.html?id=${p.id}" data-link>
        <div class="pgrid__thumb">${thumb(p, i)}</div>
        <div class="pgrid__body">
          <div class="pgrid__meta"><span>${p.category}</span><span>${p.year}</span></div>
          <div class="pgrid__name">${p.name}</div>
          <div class="pgrid__desc">${p.summary}</div>
          <div class="pgrid__stack">${p.stack.slice(0,3).map(s => `<span>${s}</span>`).join('')}</div>
        </div>
      </a>
    `).join('')}</div>`;
  }

  function renderGallery(items) {
    root.innerHTML = `<div class="pgall">${items.map((p, i) => `
      <a href="project.html?id=${p.id}" data-link>
        <div class="pgall__thumb"><div class="pgall__thumb-art">${thumb(p, i)}</div></div>
        <div>
          <div class="pgall__meta">CASE · 0${i+1} / ${String(items.length).padStart(2,'0')} · ${p.year}</div>
          <div class="pgall__name">${p.name}</div>
          <div class="pgall__desc">${p.summary}</div>
          <div class="pgall__stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
          <div class="pgall__link">Read case →</div>
        </div>
      </a>
    `).join('')}</div>`;
  }

  function thumb(p, i) {
    const patterns = [
      // lines
      () => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/>${Array.from({length:18},(_,r)=>`<line x1="0" y1="${r*18}" x2="400" y2="${r*18}" stroke="rgba(30,26,22,.1)"/>`).join('')}<rect x="40" y="60" width="120" height="24" fill="${p.accent}" rx="3"/><rect x="40" y="100" width="220" height="14" fill="rgba(30,26,22,.15)" rx="2"/><rect x="40" y="124" width="180" height="14" fill="rgba(30,26,22,.15)" rx="2"/><rect x="40" y="148" width="200" height="14" fill="rgba(30,26,22,.15)" rx="2"/><text x="40" y="260" font-family="JetBrains Mono" font-size="10" fill="rgba(30,26,22,.5)">${p.category.toUpperCase()}</text></svg>`,
      // dots grid
      () => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/>${Array.from({length:15},(_,r)=>Array.from({length:20},(_,c)=>`<circle cx="${20+c*20}" cy="${20+r*20}" r="${Math.random()>0.75?3:1}" fill="${Math.random()>0.92?p.accent:'rgba(30,26,22,.2)'}"/>`).join('')).join('')}<circle cx="200" cy="150" r="40" fill="none" stroke="${p.accent}" stroke-width="2"/><circle cx="200" cy="150" r="8" fill="${p.accent}"/></svg>`,
      // nodes
      () => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/><g stroke="rgba(30,26,22,.2)"><line x1="200" y1="150" x2="100" y2="80"/><line x1="200" y1="150" x2="320" y2="70"/><line x1="200" y1="150" x2="80" y2="230"/><line x1="200" y1="150" x2="330" y2="230"/></g><circle cx="200" cy="150" r="28" fill="${p.accent}"/><circle cx="100" cy="80" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/><circle cx="320" cy="70" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/><circle cx="80" cy="230" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/><circle cx="330" cy="230" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/></svg>`,
      // bars
      () => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/>${Array.from({length:14},(_,i)=>{const h=40+Math.abs(Math.sin(i*0.6))*160;return `<rect x="${30+i*26}" y="${250-h}" width="18" height="${h}" fill="${i===7?p.accent:'rgba(30,26,22,.2)'}"/>`;}).join('')}<line x1="20" y1="250" x2="380" y2="250" stroke="rgba(30,26,22,.3)"/></svg>`,
      // circle / ring
      () => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/><circle cx="200" cy="150" r="110" fill="none" stroke="rgba(30,26,22,.15)" stroke-width="2"/><circle cx="200" cy="150" r="110" fill="none" stroke="${p.accent}" stroke-width="3" stroke-dasharray="500 691" transform="rotate(-90 200 150)"/><text x="200" y="140" font-family="Inter Tight" font-size="44" font-weight="500" fill="#1e1a16" text-anchor="middle">${Math.floor(Math.random()*40+60)}%</text><text x="200" y="170" font-family="JetBrains Mono" font-size="11" fill="rgba(30,26,22,.5)" text-anchor="middle">UPTIME</text></svg>`,
      // terminal
      () => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/><rect x="20" y="20" width="360" height="260" fill="#1e1a16" rx="4"/><g font-family="JetBrains Mono" font-size="10" fill="#f7f3ec"><text x="30" y="50">$ vg init --project</text><text x="30" y="68" fill="rgba(247,243,236,.5)">› bootstrapping...</text><text x="30" y="86" fill="${p.accent}">✓ ready</text><text x="30" y="104">$ vg deploy</text><text x="30" y="122" fill="rgba(247,243,236,.5)">› build</text><text x="30" y="140" fill="rgba(247,243,236,.5)">› test</text><text x="30" y="158" fill="${p.accent}">› ship ✓</text></g></svg>`,
    ];
    return patterns[i % patterns.length]();
  }

  render();
})();
