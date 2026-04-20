(function() {
  const D = window.PORTFOLIO_DATA;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || D.projects[0].id;
  const idx = D.projects.findIndex(p => p.id === id);
  const p = D.projects[idx] || D.projects[0];
  const next = D.projects[(idx + 1) % D.projects.length];

  // Per-project narrative content — PT and EN versions
  const copy = {
    "laravel-fintech": {
      en: {
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
            "Build the read-model on day one. We spent months with reports querying the ledger directly—fine for small tenants, but at scale, every balance report locks rows and slows down. The solution was a denormalised read-side updated async from ledger events."
          ], code: `<span class="c">// Query LEDGER (slow at scale, locks rows)</span>
<span class="k">SELECT</span> <span class="k">SUM</span>(amount) <span class="k">FROM</span> ledger
<span class="k">WHERE</span> account_id <span class="k">=</span> <span class="val">123</span>
  <span class="k">AND</span> posted_at <span class="k">&lt;=</span> now()

<span class="c">// Query READ_MODEL (O(1) after materialization)</span>
<span class="k">SELECT</span> balance <span class="k">FROM</span> account_balances
<span class="k">WHERE</span> account_id <span class="k">=</span> <span class="val">123</span>
  <span class="k">AND</span> as_of_date <span class="k">=</span> <span class="key">today()</span>` }
        ]
      },
      pt: {
        lede: "Um core bancário construído do zero em Laravel — ledger de partidas dobradas, transações auditáveis, contas multi-tenant. A fundação por trás de uma plataforma fintech completa.",
        sections: [
          { h: "Contexto", p: [
            "Precisávamos que o ledger sobrevivesse ao crescimento. A primeira versão usava uma tabela de transações única e uma coluna de saldo em cada conta — rápido de entregar, caro de confiar. Cada reconciliação era uma sessão manual de arqueologia.",
            "O briefing para a v2: reconstruir o core com contabilidade de partidas dobradas estrita, auditável por design, e implantá-lo como a espinha que tudo mais depende."
          ]},
          { h: "O que eu gerenciei", p: [
            "Liderei a reescrita da camada de ledger: modelo de dados, superfície de API, estratégia de filas e o plano de migração da v1 sem downtime. Também configurei o pipeline CI/CD e a stack de observabilidade ao redor."
          ], list: [
            "Modelo de contabilidade de partidas dobradas — cada transferência é duas linhas",
            "Chaves de idempotência em cada endpoint de escrita",
            "Log de eventos imutável com replay determinístico",
            "Isolamento multi-tenant com schema por tenant",
            "Grafana + Prometheus para KPIs financeiros em tempo real"
          ]},
          { h: "Decisão: schema por tenant", p: [
            "O roadmap do produto apontava para tenants regulados. Tenancy com escopo de linha teria sido mais barato a curto prazo, mas forçaria cada query a carregar um tenant_id e cada índice a começar com ele — uma classe de bugs que eu não queria possuir.",
            "Escolhemos schema por tenant no Postgres. Mais barato que banco por tenant, fronteira limpa, trivial de extrair um tenant se a conformidade algum dia exigir."
          ]},
          { h: "O ledger", p: [
            "No core está uma única afirmação: para cada operação, débitos igualam créditos. Nada se move a menos que ambos os lados se equilibrem. Essa é a restrição que torna o resto barato — a reconciliação se torna um SELECT, não uma reconstrução."
          ], code: `<span class="c">// Uma transferência sempre emite duas linhas</span>
DB::<span class="k">transaction</span>(<span class="k">function</span> () <span class="k">use</span> ($txn) {
  Ledger::<span class="k">insert</span>([
    [<span class="s">'account_id'</span> => $txn->from, <span class="s">'amount'</span> => -$txn->amount],
    [<span class="s">'account_id'</span> => $txn->to,   <span class="s">'amount'</span> => +$txn->amount],
  ]);
  AuditLog::<span class="k">append</span>($txn);
});` },
          { h: "Resultados", stats: [
            { n: "0", l: "Incompatibilidades de reconciliação em 6 meses" },
            { n: "< 40ms", l: "Latência de transferência P95" },
            { n: "5×", l: "Throughput vs v1" },
          ]},
          { h: "O que eu faria diferente", p: [
            "Teria pressionado mais pelo modelo de leitura mais cedo. Passamos alguns meses com cada relatório acessando o ledger diretamente — bom para tenants pequenos, doloroso para os maiores. Um lado de leitura desnormalizado resolveu de forma limpa quando o construímos."
          ]}
        ]
      }
    },
    "risklog": {
      en: {
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
      pt: {
        lede: "Uma integração CI/CD que lê um deploy e o transforma em um parágrafo — o que mudou, quem deve revisar, o quão arriscado parece. Adotado como checklist de release do time.",
        sections: [
          { h: "O problema", p: [
            "Deploys pós-merge eram silenciosos. Alguém apertava o botão, o Slack recebia um 🟢, e ninguém sabia o que realmente saiu até algo quebrar.",
            "Queríamos um resumo: um parágrafo por deploy que dissesse ao time, em linguagem simples, o que estava sendo entregue e onde o risco estava concentrado."
          ]},
          { h: "Arquitetura", p: [
            "O Risklog se conecta ao GitHub Actions. Para cada evento de deploy, ele:"
          ], list: [
            "Puxa o diff na janela de release",
            "Classifica cada arquivo (migration, auth, infra, UI, config, docs)",
            "Pontua o risco com base em classe de arquivo × churn × cobertura de revisores",
            "Renderiza um resumo em Markdown e posta no Slack + painel admin"
          ]},
          { h: "Pontuação", p: [
            "O risco é uma soma ponderada, deliberadamente simples. Sem ML, sem magia — apenas regras que o time pode ler e debater. O simples foi o que fez funcionar."
          ], code: `<span class="c">// Pontuação simplificada</span>
<span class="k">const</span> score = files.<span class="k">reduce</span>((s, f) => {
  <span class="k">const</span> w = <span class="s">weights</span>[f.class] ?? 1;
  <span class="k">return</span> s + w * f.churn;
}, 0);

<span class="k">if</span> (score > 120) <span class="k">return</span> <span class="s">'HIGH'</span>;
<span class="k">if</span> (score > 60)  <span class="k">return</span> <span class="s">'MEDIUM'</span>;
<span class="k">return</span> <span class="s">'LOW'</span>;` },
          { h: "Resultados", stats: [
            { n: "−62%", l: "Correria no Slack pós-deploy" },
            { n: "100%", l: "Deploys com um resumo legível" },
            { n: "< 3s", l: "Tempo de execução do hook" },
          ]}
        ]
      }
    },
    "dubflow": {
      en: {
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
            "Single engineer, moving target. The hardest part wasn't any single feature — it was keeping the API contract honest while the product pivoted. Generated TypeScript clients from Laravel routes: one source of truth, zero manual syncing."
          ], code: `<span class="c">// Laravel route → auto-generated TS client</span>
<span class="k">Route</span>::<span class="k">post</span>(<span class="s">'/castings/{id}/apply'</span>, <span class="val">CastingController</span>)

<span class="c">// Generated TypeScript (type-safe, zero drift)</span>
<span class="k">const</span> response <span class="k">=</span> <span class="k">await</span> client.castings.apply(id, {
  demoUrl: <span class="val">string</span>,
  bio: <span class="val">string</span>,
  files: <span class="val">File[]</span>
})` },
          { h: "Outcomes", stats: [
            { n: "1", l: "Engineer" },
            { n: "12 wks", l: "MVP to production" },
            { n: "2 apps", l: "API + frontend, in sync" },
          ]}
        ]
      },
      pt: {
        lede: "Plataforma social completa para dubladores — perfis, casting, portfólio, mensagens diretas. Entreguei a API, o frontend e o pipeline de deploy.",
        sections: [
          { h: "Escopo", p: [
            "Um engenheiro, um produto: API Laravel, frontend Next.js, TypeScript, deploy em VPS. O objetivo era dar aos dubladores um lugar para existir online que não fosse um grupo de WhatsApp."
          ]},
          { h: "O que foi entregue", list: [
            "Auth com email + OAuth (Google)",
            "Páginas de perfil com amostras de áudio",
            "Quadro de casting com filtragem e buscas salvas",
            "Mensagens diretas com anexos de arquivo",
            "Dashboard de administração para moderação"
          ]},
          { h: "Notas sobre entrega", p: [
            "A parte mais difícil não foi nenhuma feature específica — foi manter o contrato entre API e frontend honesto enquanto o produto ainda estava se movendo. Clientes TypeScript gerados das rotas Laravel nos salvaram da maior parte do drift."
          ]},
          { h: "Resultados", stats: [
            { n: "1", l: "Engenheiro" },
            { n: "12 sem", l: "MVP à produção" },
            { n: "2 apps", l: "API + frontend, em sincronia" },
          ]}
        ]
      }
    },
  };

  function getContent() {
    const lang = window.getLang();
    const entry = copy[p.id];
    if (entry) return entry[lang] || entry['pt'];
    return {
      lede: window.td(p.summary),
      sections: [
        { h: window.t('project.default.context'), p: [window.td(p.impact), window.t('project.default.placeholder')] },
        { h: window.t('project.default.stack_label'), list: p.stack }
      ]
    };
  }

  function render() {
    const content = getContent();
    const root = document.getElementById('caseRoot');
    root.innerHTML = `
      <article class="case">
        <button class="btn read-exit" id="exitRead">${window.t('project.exit_read')}</button>

        <header class="case__head">
          <div class="case__head-inner">
            <div class="case__crumb">
              <a href="projects.html" data-link>${window.t('project.back')}</a>
              <span>/</span>
              <span>${window.td(p.category)}</span>
              <span>/</span>
              <span>${p.id}</span>
            </div>
            <div class="case__meta-row">
              <span>${window.t('project.year_label')}<strong>${p.year}</strong></span>
              <span>${window.t('project.role_label')}<strong>${window.td(p.role)}</strong></span>
              <span>${window.t('project.status_label')}<strong style="color:var(--ok)">${window.t('project.shipped')}</strong></span>
            </div>
            <h1 class="case__title">${p.name}</h1>
            <p class="case__lede">${content.lede}</p>

            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <a href="${p.url}" target="_blank" rel="noopener" class="btn btn--primary">${window.t('project.github')}</a>
              <button class="btn" id="enterRead">${window.t('project.read_mode')}</button>
              ${p.stack.map(s => `<span class="chip">${s}</span>`).join('')}
            </div>

            <div class="case__hero">${heroArt(p)}</div>
          </div>
        </header>

        <div class="case__body">
          <div class="case__body-inner">
            <aside class="case__aside">
              <h4>${window.t('project.on_page')}</h4>
              ${content.sections.map((s, i) => `<a href="#s${i}" data-section="s${i}">${s.h}</a>`).join('')}
              <div class="tools">
                <h4 style="margin-top:32px">${window.t('project.tools')}</h4>
                <button class="tool-btn" id="toolRead" data-cursor>${window.t('project.tool_read')}</button>
                <button class="tool-btn" onclick="window.print()">${window.t('project.print')}</button>
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
              <span class="label">${window.t('project.next_case')}</span>
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
  }

  render();

  window.addEventListener('langchange', () => {
    const wasReadMode = document.body.classList.contains('read-mode');
    render();
    if (wasReadMode) document.body.classList.add('read-mode');
  });

  function heroArt(p) {
    return `<svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">
      <rect width="1400" height="600" fill="#ede7db"/>
      ${Array.from({length:30},(_,r)=>`<line x1="0" y1="${r*20}" x2="1400" y2="${r*20}" stroke="rgba(30,26,22,.05)"/>`).join('')}
      ${Array.from({length:70},(_,c)=>`<line x1="${c*20}" y1="0" x2="${c*20}" y2="600" stroke="rgba(30,26,22,.03)"/>`).join('')}
      <circle cx="900" cy="300" r="220" fill="${p.accent}" opacity=".9"/>
      <circle cx="900" cy="300" r="220" fill="none" stroke="${p.accent}" stroke-width="1" opacity=".4" transform="scale(1.15) translate(-117 -39)"/>
      <text x="80" y="280" font-family="Inter Tight" font-size="88" font-weight="500" fill="#1e1a16" letter-spacing="-2">${p.name.split(' ').slice(0,2).join(' ')}</text>
      <text x="80" y="330" font-family="JetBrains Mono" font-size="16" fill="#5b534a" letter-spacing="2">${window.td(p.category).toUpperCase()} · ${p.year}</text>
      <text x="80" y="360" font-family="JetBrains Mono" font-size="14" fill="#8a8178">${p.stack.join(' · ')}</text>
    </svg>`;
  }
})();
