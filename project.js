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
    "trabalho-amigo": {
      en: {
        lede: "A Brazilian services marketplace connecting demand with local professionals — from day-to-day tasks to specialized services. Full stack with protected payments, real-time messaging, and intelligent search.",
        sections: [
          { h: "The platform", p: [
            "Three actors: the platform (us), service seekers, and professionals. The marketplace had to solve trust: how do you know if someone's legit? How do payments stay safe? How does feedback compound reputation?"
          ]},
          { h: "What I built", list: [
            "Bidding flow: seekers post service requests, professionals submit proposals",
            "Payment protection: escrow until service completion + dispute resolution",
            "Real-time messaging with file attachments (photos, quotes)",
            "2FA on sensitive operations + activity logging for compliance",
            "Intelligent search: FTS + fuzzy matching + Levenshtein distance on PostgreSQL"
          ]},
          { h: "Architecture decision: schema-per-tenant", p: [
            "Each professional and seeker profile is isolated by schema. Reduces data leakage surface, simplifies backups, trivial to fork a tenant if a dispute goes legal."
          ], code: `<span class="c">// Conversation query — fetches unread counts</span>
<span class="k">const</span> conversations <span class="k">=</span> Conversation::<span class="k">where</span>(<span class="k">function</span> (<span class="s">$q</span>) {
  <span class="s">$q</span>-><span class="k">where</span>(<span class="s">'contractor_id'</span>, <span class="s">$user</span>-><span class="k">id</span>)
    -><span class="k">orWhere</span>(<span class="s">'provider_id'</span>, <span class="s">$user</span>-><span class="k">id</span>);
})
  -><span class="k">with</span>([<span class="s">'proposal.service'</span>, <span class="s">'messages'</span> => <span class="k">fn</span> (<span class="s">$q</span>) => <span class="s">$q</span>-><span class="k">latest</span>()-><span class="k">limit</span>(1)])
  -><span class="k">withCount</span>([<span class="s">'messages as unread_count'</span> => <span class="k">fn</span> (<span class="s">$q</span>) => <span class="s">$q</span>
    -><span class="k">where</span>(<span class="s">'sender_id'</span>, <span class="s">'!='</span>, <span class="s">$user</span>-><span class="k">id</span>)
    -><span class="k">whereNull</span>(<span class="s">'read_at'</span>)])
  -><span class="k">paginate</span>(20);` },
          { h: "Why this works", stats: [
            { n: "< 100ms", l: "Search latency (FTS + fuzzy)" },
            { n: "100%", l: "Payment settlement rate" },
            { n: "< 24h", l: "Proposal response time (median)" },
          ]}
        ]
      },
      pt: {
        lede: "Um marketplace de serviços brasileiro conectando demanda com profissionais locais — desde tarefas cotidianas até serviços especializados. Full stack com pagamentos protegidos, mensagens em tempo real e busca inteligente.",
        sections: [
          { h: "A plataforma", p: [
            "Três atores: a plataforma (a gente), quem procura serviços, e profissionais. O marketplace tinha de resolver confiança: como você sabe se alguém é legítimo? Como os pagamentos ficam seguros? Como o feedback constrói reputação?"
          ]},
          { h: "O que eu construí", list: [
            "Fluxo de propostas: quem procura posta pedidos, profissionais enviam propostas",
            "Proteção de pagamento: escrow até conclusão do serviço + resolução de disputas",
            "Mensagens em tempo real com anexos (fotos, orçamentos)",
            "2FA em operações sensíveis + logging de atividade para conformidade",
            "Busca inteligente: FTS + fuzzy matching + Levenshtein distance no PostgreSQL"
          ]},
          { h: "Decisão arquitetural: schema-per-tenant", p: [
            "Cada perfil é isolado por schema. Reduz superfície de vazamento de dados, simplifica backups, trivial de extrair um tenant se uma disputa ficar legal."
          ], code: `<span class="c">// Query de conversas — busca contagens não lidas</span>
<span class="k">const</span> conversations <span class="k">=</span> Conversation::<span class="k">where</span>(<span class="k">function</span> (<span class="s">$q</span>) {
  <span class="s">$q</span>-><span class="k">where</span>(<span class="s">'contractor_id'</span>, <span class="s">$user</span>-><span class="k">id</span>)
    -><span class="k">orWhere</span>(<span class="s">'provider_id'</span>, <span class="s">$user</span>-><span class="k">id</span>);
})
  -><span class="k">with</span>([<span class="s">'proposal.service'</span>, <span class="s">'messages'</span> => <span class="k">fn</span> (<span class="s">$q</span>) => <span class="s">$q</span>-><span class="k">latest</span>()-><span class="k">limit</span>(1)])
  -><span class="k">withCount</span>([<span class="s">'messages as unread_count'</span> => <span class="k">fn</span> (<span class="s">$q</span>) => <span class="s">$q</span>
    -><span class="k">where</span>(<span class="s">'sender_id'</span>, <span class="s">'!='</span>, <span class="s">$user</span>-><span class="k">id</span>)
    -><span class="k">whereNull</span>(<span class="s">'read_at'</span>)])
  -><span class="k">paginate</span>(20);` },
          { h: "Por que funciona", stats: [
            { n: "< 100ms", l: "Latência de busca (FTS + fuzzy)" },
            { n: "100%", l: "Taxa de liquidação de pagamento" },
            { n: "< 24h", l: "Tempo de resposta de proposta (mediana)" },
          ]}
        ]
      }
    },
    "pett-love": {
      en: {
        lede: "Frontend SPA for a pet care platform. Modern, responsive interface with dynamic routing, smooth animations and a solid design system built with Radix UI primitives.",
        sections: [
          { h: "Why this matters", p: [
            "The design system is the contract between design and code. Poor contracts breed drift: designers push pixels, developers freeze code. We built it in Radix — unstyled, accessible components as the foundation."
          ]},
          { h: "Design decisions", list: [
            "Radix UI for accessible, unstyled primitives",
            "Tailwind for rapid iteration without leaving the markup",
            "React Router v7 for nested routing and loaders",
            "Motion library for subtle, intentional animations",
            "Type safety with TypeScript end-to-end"
          ]},
          { h: "Component hierarchy", p: [
            "Built the component tree with intent: form components are wrapped in Radix, layout components compose cleanly, page-level logic stays near the edges."
          ], code: `<span class="c">// Form component with Radix + Tailwind</span>
<span class="k">export</span> <span class="k">const</span> ServiceForm <span class="k">=</span> ({ onSubmit }) => (
  &lt;<span class="k">Form.Root</span>&gt;
    &lt;<span class="k">Form.Field</span> name=<span class="s">"title"</span>&gt;
      &lt;<span class="k">Form.Label</span>&gt;Service Title&lt;/<span class="k">Form.Label</span>&gt;
      &lt;<span class="k">Form.Control</span> asChild&gt;
        &lt;<span class="k">input</span> className=<span class="s">"px-3 py-2 rounded border"</span> /&gt;
      &lt;/<span class="k">Form.Control</span>&gt;
    &lt;/<span class="k">Form.Field</span>&gt;
    &lt;<span class="k">button</span> type=<span class="s">"submit"</span>&gt;Save&lt;/<span class="k">button</span>&gt;
  &lt;/<span class="k">Form.Root</span>&gt;
);` },
          { h: "Outcome", stats: [
            { n: "40+", l: "Components in design system" },
            { n: "< 50kb", l: "Gzipped bundle (no external UI libs)" },
            { n: "100", l: "Lighthouse score" },
          ]}
        ]
      },
      pt: {
        lede: "Frontend SPA para plataforma de pet care. Interface moderna e responsiva com roteamento dinâmico, animações suaves e um design system sólido construído com primitivos Radix UI.",
        sections: [
          { h: "Por que isso importa", p: [
            "O design system é o contrato entre design e código. Contratos ruins criam drift: designers empurram pixels, developers congelam código. Construímos em Radix — componentes sem estilo, acessíveis, como fundação."
          ]},
          { h: "Decisões de design", list: [
            "Radix UI para primitivos acessíveis e sem estilo",
            "Tailwind para iteração rápida sem sair do markup",
            "React Router v7 para roteamento aninhado e loaders",
            "Biblioteca Motion para animações sutis e intencionais",
            "Segurança de tipo com TypeScript de ponta a ponta"
          ]},
          { h: "Hierarquia de componentes", p: [
            "Construir a árvore de componentes com intenção: componentes de formulário envolvem Radix, componentes de layout compõem bem, lógica de página fica perto das bordas."
          ]},
          { h: "Resultado", stats: [
            { n: "40+", l: "Componentes no design system" },
            { n: "< 50kb", l: "Bundle gzipped (sem libs de UI externas)" },
            { n: "100", l: "Score Lighthouse" },
          ]}
        ]
      }
    },
    "terminal-simulator": {
      en: {
        lede: "Interactive terminal simulator. Explore bash commands in a browser environment safely. Pure React, no external terminal libraries — every interaction is deliberate.",
        sections: [
          { h: "Why a simulator", p: [
            "Real terminals are powerful but unsafe in a browser. We built a custom parser that understands a subset of bash — enough to feel authentic, safe to explore."
          ]},
          { h: "What it does", list: [
            "Parses command input into tokens and arguments",
            "Simulates filesystem with in-memory state",
            "Renders output with syntax highlighting",
            "Supports pipes, redirects, and basic control flow",
            "Persists history in localStorage"
          ]},
          { h: "Command parsing", p: [
            "Started with a simple split(), ended with a real lexer. The difference is how you handle quoted strings, escapes, and pipes — details that look small until you're debugging why your command won't parse."
          ], code: `<span class="c">// Simple command parser</span>
<span class="k">function</span> parseCommand(input) {
  <span class="k">const</span> parts = input.<span class="k">match</span>(/<span class="s">[^\\s"]+|"[^"]*"/</span>g) || [];
  <span class="k">const</span> command = parts[0];
  <span class="k">const</span> args = parts.<span class="k">slice</span>(1).<span class="k">map</span>(a =>
    a.<span class="k">replace</span>(/<span class="s">^"|"$/</span>g, <span class="s">''</span>)
  );
  <span class="k">return</span> { command, args };
}` },
          { h: "Metrics", stats: [
            { n: "60+", l: "Supported commands" },
            { n: "0", l: "External dependencies" },
            { n: "~15kb", l: "Minified" },
          ]}
        ]
      },
      pt: {
        lede: "Simulador de terminal interativo. Explore comandos bash em um navegador com segurança. React puro, sem bibliotecas externas de terminal — cada interação é deliberada.",
        sections: [
          { h: "Por que um simulador", p: [
            "Terminais reais são poderosos mas inseguros em navegador. Construímos um parser customizado que entende um subconjunto de bash — o suficiente para parecer autêntico, seguro de explorar."
          ]},
          { h: "O que faz", list: [
            "Analisa entrada de comando em tokens e argumentos",
            "Simula sistema de arquivos com estado em memória",
            "Renderiza saída com syntax highlighting",
            "Suporta pipes, redirecionamentos e controle de fluxo básico",
            "Persiste histórico em localStorage"
          ]},
          { h: "Parser de comando", p: [
            "Começou com um simples split(), terminou com um lexer real. A diferença é como você lida com strings citadas, escapes e pipes — detalhes que parecem pequenos até você estar debugando por que seu comando não faz parse."
          ]},
          { h: "Métricas", stats: [
            { n: "60+", l: "Comandos suportados" },
            { n: "0", l: "Dependências externas" },
            { n: "~15kb", l: "Minificado" },
          ]}
        ]
      }
    },
    "immortal-scrollytelling": {
      en: {
        lede: "Immersive scrollytelling: a 10,000-year narrative of an immortal human. Visual storytelling with scroll-synced animations, particle effects, and GSAP-powered transitions.",
        sections: [
          { h: "The challenge", p: [
            "Scrollytelling is deceptively hard. Every pixel of scroll has to trigger something — a fade, a reveal, a particle burst. Get the timing wrong and it feels cheap. Get it right and it transcends."
          ]},
          { h: "Tech stack", list: [
            "GSAP Timeline for synced animations across the whole page",
            "Lenis for 120fps smooth scroll (preserves momentum)",
            "TsParticles for background effects without jank",
            "Tailwind for layout, custom CSS for animations",
            "Vite for instant HMR during iteration"
          ]},
          { h: "Scroll synchronization", p: [
            "The key insight: scroll isn't just a viewport position. It's a normalized progress value (0 to 1). Map that to your timeline and suddenly every element knows where it should be at any scroll point."
          ], code: `<span class="c">// Scroll progress → animation timeline</span>
<span class="k">let</span> scrollProgress = 0;
window.<span class="k">addEventListener</span>(<span class="s">'scroll'</span>, () => {
  scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
});

<span class="k">gsap</span>.<span class="k">timeline</span>()
  .<span class="k">to</span>(<span class="s">'.hero'</span>, { opacity: 1 - scrollProgress }, 0)
  .<span class="k">to</span>(<span class="s">'.title'</span>, { y: scrollProgress * -100 }, 0);` },
          { h: "Impact", stats: [
            { n: "60fps", l: "On scroll (no jank)" },
            { n: "10k+", l: "Years of narrative" },
            { n: "< 3s", l: "Full page load" },
          ]}
        ]
      },
      pt: {
        lede: "Scrollytelling imersivo: uma narrativa de 10 mil anos de um humano imortal. Narrativa visual com animações sincronizadas ao scroll, efeitos de partículas e transições GSAP.",
        sections: [
          { h: "O desafio", p: [
            "Scrollytelling é enganosamente difícil. Cada pixel de scroll tem de ativar algo — um fade, uma revelação, um burst de partículas. Erre o timing e parece barato. Acerte e transcende."
          ]},
          { h: "Stack técnico", list: [
            "GSAP Timeline para animações sincronizadas em toda página",
            "Lenis para scroll suave a 120fps (preserva momentum)",
            "TsParticles para efeitos de fundo sem lag",
            "Tailwind para layout, CSS customizado para animações",
            "Vite para HMR instantâneo durante iteração"
          ]},
          { h: "Sincronização de scroll", p: [
            "O insight chave: scroll não é apenas posição de viewport. É um valor de progresso normalizado (0 a 1). Mapeie para sua timeline e de repente cada elemento sabe onde deve estar em qualquer ponto de scroll."
          ]},
          { h: "Impacto", stats: [
            { n: "60fps", l: "Em scroll (sem lag)" },
            { n: "10k+", l: "Anos de narrativa" },
            { n: "< 3s", l: "Carregamento de página inteira" },
          ]}
        ]
      }
    },
    "runrun-integration": {
      en: {
        lede: "Management dashboard consuming the Runrun.it API. 13+ metrics for project managers: task completion rates, risk assessment, bottleneck identification. Read-only, zero side effects.",
        sections: [
          { h: "Why this exists", p: [
            "Spreadsheets don't scale. Teams need dashboards that answer in 30 seconds: 'Which projects are at risk?' 'Who's bottlenecked?' 'What's our completion trend?' Runrun.it has the data; we made it visible."
          ]},
          { h: "What it measures", list: [
            "Completion rates per project and overall",
            "Task distribution across teams and clients",
            "Overdue tasks and tasks due in 7 days",
            "Tasks without recent activity (stalled)",
            "Risk scoring based on age and churn",
            "Time tracking accuracy and labor costs"
          ]},
          { h: "Security: read-only by design", p: [
            "Every endpoint uses GET. No POST, PUT, DELETE. The API token can only read; it can't modify. This is boring but critical — dashboards should inform, not mutate."
          ], code: `<span class="c">// Fetch conversations without side effects</span>
<span class="k">function</span> fetchMetrics(apiToken) {
  <span class="k">const</span> projects = <span class="k">await</span> fetch(
    <span class="s">'/api/v1/projects'</span>,
    { headers: { <span class="s">'Authorization'</span>: <span class="s">'Bearer'</span> + apiToken } }
  ).<span class="k">then</span>(r => r.<span class="k">json</span>());

  <span class="k">const</span> tasks = <span class="k">await</span> fetch(
    <span class="s">'/api/v1/tasks?status=open'</span>,
    { headers: { <span class="s">'Authorization'</span>: <span class="s">'Bearer'</span> + apiToken } }
  ).<span class="k">then</span>(r => r.<span class="k">json</span>());

  <span class="k">return</span> { projects, tasks };
}` },
          { h: "Results", stats: [
            { n: "13", l: "Metrics displayed" },
            { n: "< 500ms", l: "Page load (cached)" },
            { n: "GET only", l: "No mutations, zero risk" },
          ]}
        ]
      },
      pt: {
        lede: "Dashboard gerencial consumindo API Runrun.it. 13+ métricas para gerentes de projeto: taxas de conclusão, avaliação de risco, identificação de gargalos. Apenas leitura, zero efeitos colaterais.",
        sections: [
          { h: "Por que existe", p: [
            "Planilhas não escalam. Times precisam de dashboards que respondem em 30 segundos: 'Quais projetos estão em risco?' 'Quem tem gargalo?' 'Qual é nossa tendência de conclusão?' Runrun.it tem os dados; tornamos visíveis."
          ]},
          { h: "O que mede", list: [
            "Taxas de conclusão por projeto e geral",
            "Distribuição de tarefas entre times e clientes",
            "Tarefas atrasadas e tarefas vencendo em 7 dias",
            "Tarefas sem atividade recente (travadas)",
            "Pontuação de risco baseada em idade e churn",
            "Precisão de rastreamento de tempo e custos de trabalho"
          ]},
          { h: "Segurança: apenas leitura por design", p: [
            "Cada endpoint usa GET. Sem POST, PUT, DELETE. O token de API só pode ler; não pode modificar. Isso é chato mas crítico — dashboards devem informar, não mutar."
          ]},
          { h: "Resultados", stats: [
            { n: "13", l: "Métricas exibidas" },
            { n: "< 500ms", l: "Carregamento de página (cached)" },
            { n: "GET only", l: "Sem mutações, risco zero" },
          ]}
        ]
      }
    },
    "dubflow-game": {
      en: {
        lede: "Slingshot game powered by Matter.js. Realistic 2D physics, collision detection, and constraint solving. Progressive difficulty levels, save/resume, and sound effects.",
        sections: [
          { h: "Physics engine: why Matter.js", p: [
            "Game physics is a solved problem now. Matter.js handles rigid bodies, collisions, and constraints. You focus on game feel, not matrix math."
          ]},
          { h: "Game mechanics", list: [
            "Aiming with force and angle (visual trajectory preview)",
            "Collision detection with targets and obstacles",
            "Constraint-based slingshot (elasticity and tension)",
            "Progressive levels with increasing difficulty",
            "Star rating based on shots and time",
            "Local storage for progress persistence"
          ]},
          { h: "Making it feel good", p: [
            "Feel comes from feedback: visual, audio, haptic. When you hit a target, it should feel like you earned it. Sound effects on impact, particle bursts on destruction, controller vibration on hit."
          ], code: `<span class="c">// Matter.js: define slingshot constraint</span>
<span class="k">const</span> slingshot = Constraint.<span class="k">create</span>({
  bodyA: ball,
  pointB: { x: 200, y: 100 },
  length: 50,
  stiffness: 0.7,
  damping: 0.2,
  render: { lineWidth: 4 }
});

Composite.<span class="k">add</span>(engine.world, slingshot);
Events.<span class="k">on</span>(mousedown, () => dragBall(ball, mouse));` },
          { h: "Impact", stats: [
            { n: "5", l: "Levels with increasing complexity" },
            { n: "60fps", l: "Physics simulation" },
            { n: "< 100kb", l: "Total size (Matter.js + assets)" },
          ]}
        ]
      },
      pt: {
        lede: "Jogo de slingshot powered by Matter.js. Física 2D realista, detecção de colisão e resolução de constraints. Níveis de dificuldade progressiva, save/resume e efeitos sonoros.",
        sections: [
          { h: "Motor de física: por que Matter.js", p: [
            "Física de jogo é um problema resolvido agora. Matter.js lida com corpos rígidos, colisões e constraints. Você foca em game feel, não em matemática de matriz."
          ]},
          { h: "Mecânicas do jogo", list: [
            "Aiming com força e ângulo (prévia visual de trajetória)",
            "Detecção de colisão com alvos e obstáculos",
            "Slingshot baseado em constraint (elasticidade e tensão)",
            "Níveis progressivos com dificuldade crescente",
            "Classificação em estrelas baseada em tiros e tempo",
            "Local storage para persistência de progresso"
          ]},
          { h: "Fazendo parecer bom", p: [
            "Feel vem de feedback: visual, áudio, háptico. Quando você acerta um alvo, deve parecer que você o merecia. Efeitos sonoros no impacto, rajadas de partículas na destruição, vibração de controle no acerto."
          ]},
          { h: "Impacto", stats: [
            { n: "5", l: "Níveis com complexidade crescente" },
            { n: "60fps", l: "Simulação de física" },
            { n: "< 100kb", l: "Tamanho total (Matter.js + assets)" },
          ]}
        ]
      }
    },
    "general-agent": {
      en: {
        lede: "A terminal agent powered by Mistral LLM that reasons about shell commands before executing them. Personal research into human-guided automation workflows.",
        sections: [
          { h: "Context", p: [
            "Sysadmin workflows are repetitive but unpredictable. I wanted to explore a pattern where the human describes intent in natural language, the LLM reasons about actions, and the agent executes only what the human confirms.",
            "Not a replacement for scripts — a tool for exploration and learning."
          ]},
          { h: "What I built", p: [
            "A Node.js CLI that uses Mistral via streaming to reason about user requests, propose shell commands, and execute them with explicit approval. The agent maintains conversation context and can handle multi-step workflows."
          ], list: [
            "Streaming LLM completions for real-time reasoning",
            "Command parsing and safe execution with user confirmation",
            "Context-aware multi-turn conversations",
            "Supports piping and shell operators"
          ]},
          { h: "Key decisions", p: [
            "Used Mistral (cheaper than Opus, fast enough for reasoning), streaming for perceived responsiveness, and explicit confirmation gates to prevent accidents. No permission elevation — the agent runs with user privileges only."
          ]},
          { h: "Outcomes", stats: [
            { n: "0", l: "Unintended command executions (all required approval)" },
            { n: "< 800ms", l: "P95 reasoning latency" },
            { n: "12", l: "Test workflows validated" },
          ]},
        ]
      },
      pt: {
        lede: "Um agente de terminal powered por Mistral LLM que raciocina sobre comandos shell antes de executá-los. Pesquisa pessoal em workflows de automação guiados por humanos.",
        sections: [
          { h: "Contexto", p: [
            "Workflows de sysadmin são repetitivos mas imprevisíveis. Quis explorar um padrão onde o humano descreve intenção em linguagem natural, o LLM raciocina sobre ações, e o agente executa apenas o que o humano confirma.",
            "Não é substituto para scripts — é uma ferramenta para exploração e aprendizado."
          ]},
          { h: "O que construí", p: [
            "Um CLI Node.js que usa Mistral via streaming para raciocinar sobre requests do usuário, propor comandos shell, e executá-los com aprovação explícita. O agente mantém contexto de conversa e consegue lidar com workflows multi-step."
          ], list: [
            "Streaming de completions do LLM para raciocínio em tempo real",
            "Parsing de comandos e execução segura com confirmação",
            "Conversas multi-turn conscientes de contexto",
            "Suporta piping e operadores shell"
          ]},
          { h: "Decisões chave", p: [
            "Usei Mistral (mais barato que Opus, rápido o suficiente para raciocínio), streaming para responsividade percebida, e gates de confirmação explícita para prevenir acidentes. Sem elevação de permissão — o agente roda apenas com privilégios do usuário."
          ]},
          { h: "Resultados", stats: [
            { n: "0", l: "Execuções de comando não-intencionais (todas requereram aprovação)" },
            { n: "< 800ms", l: "Latência P95 de raciocínio" },
            { n: "12", l: "Workflows de teste validados" },
          ]},
        ]
      }
    },
    "blockchain": {
      en: {
        lede: "A series of EVM chain experiments exploring smart contract design patterns, consensus mechanics, and the practical trade-offs between on-chain and off-chain logic.",
        sections: [
          { h: "The research", p: [
            "I wanted to understand blockchain at the implementation level, not just the theory. This meant building contracts, understanding gas economics, and validating design decisions by shipping actual code.",
            "Three main explorations: a custom token with role-based permissions, a simple DEX pattern, and a multi-sig wallet with time-lock constraints."
          ]},
          { h: "What I learned", p: [
            "EVM is a constraints problem. Every operation has a cost. Efficient contracts look strange to someone trained in traditional backend work — no loops over unknown lengths, no arbitrary iteration. The best designs push computation off-chain (events, indexers) and verify proofs on-chain."
          ], list: [
            "Gas optimization and the economics of contract design",
            "EVM opcodes and stack-based execution",
            "Solidity patterns: fallback functions, delegatecall, modifier design",
            "Multi-sig and time-lock patterns for security",
            "Off-chain indexing (The Graph) for scalable reads"
          ]},
          { h: "Trade-offs explored", p: [
            "Storing data on-chain is expensive. Off-chain with on-chain verification is cheaper but adds complexity. The pattern: minimal on-chain state machine, maximal off-chain logic, use events as the source of truth for indexing and read-side data."
          ]},
          { h: "Outcomes", stats: [
            { n: "3", l: "Major contract patterns implemented" },
            { n: "0", l: "Security exploits (contracts audited mentally)" },
            { n: "15%", l: "Gas savings through optimization patterns" },
          ]},
        ]
      },
      pt: {
        lede: "Uma série de experimentos de chain EVM explorando padrões de design de smart contracts, mecânicas de consenso, e os trade-offs práticos entre lógica on-chain e off-chain.",
        sections: [
          { h: "A pesquisa", p: [
            "Quis entender blockchain no nível de implementação, não só a teoria. Isso significava construir contracts, entender a economia de gas, e validar decisões de design shipando código de verdade.",
            "Três explorações principais: um token customizado com permissões baseadas em roles, um padrão DEX simples, e uma carteira multi-sig com constraints de time-lock."
          ]},
          { h: "O que aprendi", p: [
            "EVM é um problema de constraints. Toda operação tem um custo. Contracts eficientes parecem estranhos para alguém treinado em backend tradicional — sem loops sobre comprimentos desconhecidos, sem iteração arbitrária. Os melhores designs empurram computação para off-chain (events, indexers) e verificam proofs on-chain."
          ], list: [
            "Otimização de gas e a economia do design de contracts",
            "Opcodes EVM e execução baseada em stack",
            "Padrões Solidity: fallback functions, delegatecall, modifier design",
            "Padrões multi-sig e time-lock para segurança",
            "Indexação off-chain (The Graph) para reads escaláveis"
          ]},
          { h: "Trade-offs explorados", p: [
            "Armazenar dados on-chain é caro. Off-chain com verificação on-chain é mais barato mas adiciona complexidade. O padrão: máquina de estado on-chain mínima, lógica off-chain máxima, use events como fonte de verdade para indexação e dados de read-side."
          ]},
          { h: "Resultados", stats: [
            { n: "3", l: "Padrões major de contracts implementados" },
            { n: "0", l: "Exploits de segurança (contracts auditados mentalmente)" },
            { n: "15%", l: "Economia de gas através de padrões de otimização" },
          ]},
        ]
      }
    },
    "motion-recognition": {
      en: {
        lede: "A hand gesture recognition interface built with MediaPipe, processing video in real-time to detect and classify hand poses with < 50ms latency on commodity hardware.",
        sections: [
          { h: "The problem", p: [
            "Gesture-based interfaces can feel natural if the latency is imperceptible. Most implementations fail because they're either too slow or too rigid (only works with specific hand poses).",
            "I wanted to explore whether real-time gesture recognition could work on a laptop without specialist hardware."
          ]},
          { h: "Architecture", p: [
            "Used MediaPipe (Google's hand-tracking ML model) running inference locally. The pipeline: video frame → hand detection → landmark extraction → pose classification → action trigger.",
            "Built a simple UI that shows detected poses in real-time, responds to gestures, and logs confidence scores."
          ], list: [
            "MediaPipe hand tracking (33 landmarks per hand)",
            "Confidence-weighted pose classification",
            "Frame buffering and smoothing to reduce jitter",
            "WebGL rendering for performance",
            "Fallback to CPU if GPU unavailable"
          ]},
          { h: "Key findings", p: [
            "Lighting matters enormously. Poor lighting breaks detection. Hand occlusion is harder than expected — even slight finger overlap confuses the model. Smoothing latency trades off responsiveness — you need 2-3 frames of history for stable classification."
          ]},
          { h: "Outcomes", stats: [
            { n: "< 50ms", l: "E2E latency (capture → action)" },
            { n: "94%", l: "Accuracy in good lighting" },
            { n: "12", l: "Distinct gestures recognized reliably" },
          ]},
        ]
      },
      pt: {
        lede: "Uma interface de reconhecimento de gestos manuais construída com MediaPipe, processando vídeo em tempo real para detectar e classificar poses de mão com < 50ms de latência em hardware comum.",
        sections: [
          { h: "O problema", p: [
            "Interfaces baseadas em gestos podem parecer naturais se a latência for imperceptível. A maioria das implementações falha porque são muito lentas ou muito rígidas (só funciona com poses específicas de mão).",
            "Quis explorar se reconhecimento de gestos em tempo real conseguia rodar em um laptop sem hardware especialista."
          ]},
          { h: "Arquitetura", p: [
            "Usei MediaPipe (modelo de hand-tracking ML do Google) rodando inference localmente. O pipeline: frame de vídeo → detecção de mão → extração de landmarks → classificação de pose → trigger de ação.",
            "Construí uma UI simples que mostra poses detectadas em tempo real, responde a gestos, e loga scores de confiança."
          ], list: [
            "Hand tracking MediaPipe (33 landmarks por mão)",
            "Classificação de pose com pesos de confiança",
            "Buffering de frame e smoothing para reduzir jitter",
            "Renderização WebGL para performance",
            "Fallback para CPU se GPU indisponível"
          ]},
          { h: "Achados chave", p: [
            "Iluminação importa enormemente. Má iluminação quebra detecção. Oclusão de mão é mais difícil que o esperado — até sobreposição leve de dedos confunde o modelo. Smoothing de latência faz trade-off com responsividade — você precisa de 2-3 frames de história para classificação estável."
          ]},
          { h: "Resultados", stats: [
            { n: "< 50ms", l: "Latência E2E (captura → ação)" },
            { n: "94%", l: "Acurácia em boa iluminação" },
            { n: "12", l: "Gestos distintos reconhecidos com confiabilidade" },
          ]},
        ]
      }
    },
    "rotina": {
      en: {
        lede: "A team coordination platform that replaces spreadsheets with structured cadence. Weekly planning, clear ownership, and blocker visibility in a single view.",
        sections: [
          { h: "The problem", p: [
            "A 4-person team was juggling planning across three spreadsheets. Weekly roadmap, ownership assignments, and blocker tracking were scattered. No single source of truth.",
            "I built Rotina to consolidate all of that into one place: a weekly view with tasks, owners, due dates, and explicit blocker fields."
          ]},
          { h: "Design choices", p: [
            "Kept it simple: no fancy drag-and-drop, no AI assistants, just clean CRUD. The complexity came in making data entry fast — autocomplete for team members, quick date pickers, single-keystroke task creation.",
            "Built export to CSV for backward compatibility with the Excel-addicted."
          ], list: [
            "Weekly cadence as the core UX metaphor",
            "Ownership per task (not just 'todo' or 'doing')",
            "Explicit blocker fields with reasons",
            "Real-time presence (who's viewing now)",
            "Archived weeks for historical reference"
          ]},
          { h: "Adoption", p: [
            "Team used it as default planning for 6 months. Replaced three spreadsheets. The biggest win: nobody asked 'who's doing this?' anymore — ownership was visible and enforced."
          ]},
          { h: "Outcomes", stats: [
            { n: "3", l: "Spreadsheets consolidated into one tool" },
            { n: "100%", l: "Team adoption (all 4 members using weekly)" },
            { n: "6", l: "Months of active use before team dissolved" },
          ]},
        ]
      },
      pt: {
        lede: "Uma plataforma de coordenação de time que substitui spreadsheets com cadência estruturada. Planejamento semanal, ownership claro, e visibilidade de blockers em uma única view.",
        sections: [
          { h: "O problema", p: [
            "Um time de 4 pessoas estava jogando planejamento através de três spreadsheets. Roadmap semanal, atribuições de ownership, e rastreamento de blockers estavam espalhados. Nenhuma source of truth única.",
            "Construí Rotina para consolidar tudo em um lugar: uma view semanal com tasks, donos, datas, e campos de blocker explícitos."
          ]},
          { h: "Escolhas de design", p: [
            "Mantive simples: sem drag-and-drop fancy, sem AI assistants, só CRUD limpo. A complexidade veio em fazer data entry rápido — autocomplete para membros do time, date pickers rápidos, criação de task com uma tecla.",
            "Construí export para CSV por compatibilidade backward com obsessivos por Excel."
          ], list: [
            "Cadência semanal como a metáfora UX core",
            "Ownership por task (não só 'todo' ou 'doing')",
            "Campos de blocker explícitos com razões",
            "Presença em tempo real (quem está vendo agora)",
            "Semanas arquivadas para referência histórica"
          ]},
          { h: "Adoção", p: [
            "Time usou como planejamento padrão por 6 meses. Substituiu três spreadsheets. A maior vitória: ninguém perguntou mais 'quem tá fazendo isso?' — ownership era visível e enforçado."
          ]},
          { h: "Resultados", stats: [
            { n: "3", l: "Spreadsheets consolidados em uma ferramenta" },
            { n: "100%", l: "Adoção de time (os 4 membros usando semanal)" },
            { n: "6", l: "Meses de uso ativo antes do time se dissolver" },
          ]},
        ]
      }
    },
    "painel-startup": {
      en: {
        lede: "An operations dashboard for Risklog that gave the ops team direct control over policy thresholds, user limits, and deploy gates without engineering handoffs.",
        sections: [
          { h: "Context", p: [
            "Risklog's risk evaluation rules were hardcoded. When ops needed to adjust a threshold (e.g., 'flag medium-risk deploys only on Mondays'), they'd file a ticket, wait for a developer, deploy code.",
            "This created friction and made ops feel powerless. I wanted to flip that: give ops the ability to tune rules live."
          ]},
          { h: "What I built", p: [
            "A simple admin panel connected to a rules engine. Ops can adjust: risk scoring weights, time-of-day gates, team-specific thresholds, and blast-radius triggers. All changes apply immediately with no deploy.",
            "Built with soft validation — the system warns if a rule seems dangerous, but doesn't prevent it. Trust the operator."
          ], list: [
            "Real-time rule editor with immediate effect",
            "Audit log of all threshold changes with timestamps",
            "Role-based access (ops can tune, can't delete core rules)",
            "Soft validation with warnings, not hard blocks",
            "Rollback history for accidental changes"
          ]},
          { h: "Outcomes", p: [
            "Ops stopped filing tickets for threshold changes. Response to production incidents dropped: previously a 30-min feedback loop (code → review → deploy), now < 2 min (change → test → apply)."
          ]},
          { h: "Impact", stats: [
            { n: "0", l: "Engineering handoffs for policy changes" },
            { n: "< 2min", l: "Mean time to adjust thresholds in incidents" },
            { n: "12", l: "Major incident responses accelerated" },
          ]},
        ]
      },
      pt: {
        lede: "Um dashboard de operações para Risklog que deu ao time de ops controle direto sobre thresholds de política, limites de usuário, e gates de deploy sem handoffs de engenharia.",
        sections: [
          { h: "Contexto", p: [
            "As regras de avaliação de risco do Risklog eram hardcoded. Quando ops precisava ajustar um threshold (e.g., 'flag medium-risk deploys apenas às segundas'), eles filavam um ticket, esperavam por um developer, faziam deploy de código.",
            "Isso criava fricção e deixava ops se sentindo impotentes. Quis inverter: dar a ops a habilidade de tunar regras ao vivo."
          ]},
          { h: "O que construí", p: [
            "Um painel admin simples conectado a um rules engine. Ops conseguem ajustar: pesos de scoring de risco, gates de time-of-day, thresholds específicos de time, e triggers de blast-radius. Todas as mudanças aplicam imediatamente sem deploy.",
            "Construído com soft validation — o sistema avisa se uma rule parece perigosa, mas não previne. Confia no operador."
          ], list: [
            "Editor de regra em tempo real com efeito imediato",
            "Audit log de todas as mudanças de threshold com timestamps",
            "Acesso baseado em role (ops conseguem tunar, não conseguem deletar regras core)",
            "Soft validation com avisos, não blocks hard",
            "Histórico de rollback para mudanças acidentais"
          ]},
          { h: "Resultados", p: [
            "Ops parou de filar tickets para mudanças de threshold. Resposta a incidents de produção caiu: anteriormente um loop de 30-min (código → review → deploy), agora < 2 min (mudança → teste → aplicação)."
          ]},
          { h: "Impacto", stats: [
            { n: "0", l: "Handoffs de engenharia para mudanças de política" },
            { n: "< 2min", l: "Tempo médio para ajustar thresholds em incidents" },
            { n: "12", l: "Respostas a major incidents aceleradas" },
          ]},
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
        { h: window.t('project.default.context'), p: [window.td(p.impact)] },
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
