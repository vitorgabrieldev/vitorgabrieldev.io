(function() {
  const D = window.PORTFOLIO_DATA;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || D.projects[0].id;
  const idx = D.projects.findIndex(p => p.id === id);
  const p = D.projects[idx] || D.projects[0];
  const next = D.projects[(idx + 1) % D.projects.length];

  // Per-project narrative content (original, written for portfolio)
  const copy = {
    "laravel-fintech": {
      lede: "A banking core built from scratch in Laravel — double-entry ledger, auditable transactions, multi-tenant accounts. The foundation behind a complete fintech platform.",
      sections: [
        { h: "Context", p: [
          "We needed the ledger to survive growth. The first version used a single transactions table and a balance column on each account — fast to ship, expensive to trust. Every reconciliation was a manual archaeology session.",
          "The brief for v2: rebuild the core with strict double-entry accounting, auditable by design, deploy it as the spine that everything else depends on."
        ]},
        { h: "What I owned", p: [
          "I led the rewrite of the ledger layer: data model, API surface, queue strategy, and the migration plan from v1 without downtime. I also set up the CI/CD pipeline and observability stack around it."
        ], list: [
          "Double-entry accounting model — every transfer is two rows",
          "Idempotency keys on every write endpoint",
          "Immutable event log with deterministic replay",
          "Multi-tenant isolation with per-tenant schema",
          "Grafana + Prometheus for financial KPIs in real time"
        ]},
        { h: "Decision: database-per-tenant", p: [
          "The product roadmap pointed at regulated tenants. Row-scoped tenancy would have been cheaper short-term, but would force every query to carry a tenant_id and every index to start with it — a class of bugs I didn't want to own.",
          "We chose schema-per-tenant on Postgres. Cheaper than database-per-tenant, clean boundary, trivial to extract a tenant if compliance ever demanded it."
        ]},
        { h: "The ledger", p: [
          "At the core is a single assertion: for every operation, debits equal credits. Nothing moves unless both sides balance. This is the constraint that makes the rest cheap — reconciliation becomes a SELECT, not a reconstruction."
        ], code: `<span class="c">// A transfer always emits two rows</span>
DB::<span class="k">transaction</span>(<span class="k">function</span> () <span class="k">use</span> ($txn) {
  Ledger::<span class="k">insert</span>([
    [<span class="s">'account_id'</span> => $txn->from, <span class="s">'amount'</span> => -$txn->amount],
    [<span class="s">'account_id'</span> => $txn->to,   <span class="s">'amount'</span> => +$txn->amount],
  ]);
  AuditLog::<span class="k">append</span>($txn);
});` },
        { h: "Outcomes", stats: [
          { n: "0", l: "Reconciliation mismatches in 6 months" },
          { n: "< 40ms", l: "P95 transfer latency" },
          { n: "5×", l: "Throughput vs v1" },
        ]},
        { h: "What I'd do differently", p: [
          "I'd push harder on the read-model earlier. We spent a few months with every report hitting the ledger directly — fine for small tenants, painful for larger ones. A denormalised read side solved it cleanly once we built it."
        ]}
      ]
    },
    "risklog": {
      lede: "A CI/CD integration that reads a deploy and turns it into a paragraph — what changed, who should review, how risky it looks. Adopted as the team's release checklist.",
      sections: [
        { h: "The problem", p: [
          "Post-merge deploys were silent. Someone pressed the button, Slack got a 🟢, and nobody knew what actually went out until something broke.",
          "We wanted a summary: a paragraph per deploy that told the team, in plain language, what was shipping and where the risk was concentrated."
        ]},
        { h: "Architecture", p: [
          "Risklog hooks into GitHub Actions. For every deploy event, it:"
        ], list: [
          "Pulls the diff across the release window",
          "Classifies each file (migration, auth, infra, UI, config, docs)",
          "Scores risk based on file class × churn × reviewer coverage",
          "Renders a Markdown summary and posts it to Slack + the admin panel"
        ]},
        { h: "Scoring", p: [
          "Risk is a weighted sum, deliberately boring. No ML, no magic — just rules the team can read and argue with. Boring is what made it stick."
        ], code: `<span class="c">// Simplified scoring</span>
<span class="k">const</span> score = files.<span class="k">reduce</span>((s, f) => {
  <span class="k">const</span> w = <span class="s">weights</span>[f.class] ?? 1;
  <span class="k">return</span> s + w * f.churn;
}, 0);

<span class="k">if</span> (score > 120) <span class="k">return</span> <span class="s">'HIGH'</span>;
<span class="k">if</span> (score > 60)  <span class="k">return</span> <span class="s">'MEDIUM'</span>;
<span class="k">return</span> <span class="s">'LOW'</span>;` },
        { h: "Outcomes", stats: [
          { n: "−62%", l: "Post-deploy Slack scrambles" },
          { n: "100%", l: "Deploys with a readable summary" },
          { n: "< 3s", l: "Hook run time" },
        ]}
      ]
    },
    "dubflow": {
      lede: "End-to-end social platform for voice-over professionals — profiles, casting, portfolio, DMs. I shipped the API, the frontend and the deploy pipeline.",
      sections: [
        { h: "Scope", p: [
          "One engineer, one product: Laravel API, Next.js frontend, TypeScript, deployment on a VPS. The goal was to give voice-over professionals a place to exist online that wasn't a WhatsApp group."
        ]},
        { h: "What shipped", list: [
          "Auth with email + OAuth (Google)",
          "Profile pages with audio samples",
          "Casting board with filtering and saved searches",
          "Direct messages with file attachments",
          "Admin dashboard for moderation"
        ]},
        { h: "Notes on delivery", p: [
          "The hardest part wasn't any single feature — it was keeping the contract between API and frontend honest while the product was still moving. Generated TypeScript clients from the Laravel routes saved us from most of the drift."
        ]},
        { h: "Outcomes", stats: [
          { n: "1", l: "Engineer" },
          { n: "12 wks", l: "MVP to production" },
          { n: "2 apps", l: "API + frontend, in sync" },
        ]}
      ]
    },
  };

  const content = copy[p.id] || {
    lede: p.summary,
    sections: [
      { h: "Context", p: [p.impact, "A detailed case write-up is in progress. This placeholder is a stand-in — ask me about it and I'll walk you through the design decisions live."] },
      { h: "Stack", list: p.stack }
    ]
  };

  const root = document.getElementById('caseRoot');
  root.innerHTML = `
    <article class="case">
      <button class="btn read-exit" id="exitRead">Exit reading mode ✕</button>

      <header class="case__head">
        <div class="case__head-inner">
          <div class="case__crumb">
            <a href="projects.html" data-link>← Work</a>
            <span>/</span>
            <span>${p.category}</span>
            <span>/</span>
            <span>${p.id}</span>
          </div>
          <div class="case__meta-row">
            <span>YEAR<strong>${p.year}</strong></span>
            <span>ROLE<strong>${p.role}</strong></span>
            <span>STATUS<strong style="color:var(--ok)">● Shipped</strong></span>
          </div>
          <h1 class="case__title">${p.name}</h1>
          <p class="case__lede">${content.lede}</p>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="${p.url}" target="_blank" rel="noopener" class="btn btn--primary">View on GitHub ↗</a>
            <button class="btn" id="enterRead">Reading mode ↗</button>
            ${p.stack.map(s => `<span class="chip">${s}</span>`).join('')}
          </div>

          <div class="case__hero">${heroArt(p)}</div>
        </div>
      </header>

      <div class="case__body">
        <div class="case__body-inner">
          <aside class="case__aside">
            <h4>On this page</h4>
            ${content.sections.map((s, i) => `<a href="#s${i}" data-section="s${i}">${s.h}</a>`).join('')}
            <div class="tools">
              <h4 style="margin-top:32px">Tools</h4>
              <button class="tool-btn" id="toolRead" data-cursor>📖 Reading mode</button>
              <button class="tool-btn" onclick="window.print()">⎙ Print case</button>
            </div>
          </aside>
          <div class="case__article" data-cursor="read">
            ${content.sections.map((s, i) => `
              <section id="s${i}">
                <h2>${s.h}</h2>
                ${s.p ? s.p.map((pp, j) => `<p class="${i===0 && j===0 ? 'lead' : ''}">${pp}</p>`).join('') : ''}
                ${s.list ? `<ul>${s.list.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
                ${s.code ? `<pre>${s.code}</pre>` : ''}
                ${s.stats ? `<div class="case__stats">${s.stats.map(st => `<div><div class="n">${st.n}</div><div class="l">${st.l}</div></div>`).join('')}</div>` : ''}
              </section>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="case__next">
        <div class="case__next-inner">
          <a href="project.html?id=${next.id}" data-link class="case__next-link">
            <span class="label">Next case →</span>
            <span class="t">${next.name}</span>
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </article>
  `;

  // Reading mode
  const enterRead = () => document.body.classList.add('read-mode');
  const exitRead = () => document.body.classList.remove('read-mode');
  document.getElementById('enterRead').addEventListener('click', enterRead);
  document.getElementById('toolRead').addEventListener('click', enterRead);
  document.getElementById('exitRead').addEventListener('click', exitRead);

  // Section active on scroll
  const links = document.querySelectorAll('.case__aside a[data-section]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('.case__article section').forEach(s => io.observe(s));

  function heroArt(p) {
    return `<svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">
      <rect width="1400" height="600" fill="#ede7db"/>
      ${Array.from({length:30},(_,r)=>`<line x1="0" y1="${r*20}" x2="1400" y2="${r*20}" stroke="rgba(30,26,22,.05)"/>`).join('')}
      ${Array.from({length:70},(_,c)=>`<line x1="${c*20}" y1="0" x2="${c*20}" y2="600" stroke="rgba(30,26,22,.03)"/>`).join('')}
      <circle cx="900" cy="300" r="220" fill="${p.accent}" opacity=".9"/>
      <circle cx="900" cy="300" r="220" fill="none" stroke="${p.accent}" stroke-width="1" opacity=".4" transform="scale(1.15) translate(-117 -39)"/>
      <text x="80" y="280" font-family="Inter Tight" font-size="88" font-weight="500" fill="#1e1a16" letter-spacing="-2">${p.name.split(' ').slice(0,2).join(' ')}</text>
      <text x="80" y="330" font-family="JetBrains Mono" font-size="16" fill="#5b534a" letter-spacing="2">${p.category.toUpperCase()} · ${p.year}</text>
      <text x="80" y="360" font-family="JetBrains Mono" font-size="14" fill="#8a8178">${p.stack.join(' · ')}</text>
    </svg>`;
  }
})();
