/* i18n — PT-BR default, EN available via toggle.
   Strings are keyed; pages tag elements with data-i18n="<key>".
   For dynamic content, window.t(key) returns the current-lang string.
   For data objects {pt, en}, window.td(obj) returns the current-lang value. */
(function () {
  const DICT = {
    // Nav
    'nav.index': { pt: 'Início', en: 'Index' },
    'nav.work': { pt: 'Projetos', en: 'Work' },
    'nav.about': { pt: 'Sobre', en: 'About' },
    'nav.journal': { pt: 'Diário', en: 'Journal' },
    'nav.available': { pt: 'Disponível', en: 'Available' },
    'nav.engineer': { pt: '/ ENGENHEIRO', en: '/ ENGINEER' },

    // Common buttons
    'btn.see_work': { pt: 'Ver os projetos →', en: 'See the work →' },
    'btn.read_about': { pt: 'Ler sobre mim', en: 'Read about me' },
    'btn.skim': { pt: '↓ Resumo', en: '↓ Skim' },
    'btn.download_cv': { pt: 'Baixar CV (PDF) ↗', en: 'Download CV (PDF) ↗' },
    'btn.email': { pt: 'Email', en: 'Email' },
    'btn.all_projects': { pt: 'Todos os projetos →', en: 'All projects →' },
    'btn.read_more': { pt: 'Ler mais →', en: 'Read more →' },
    'btn.back': { pt: '← Voltar', en: '← Back' },
    'btn.next': { pt: 'Próximo →', en: 'Next →' },

    // Hero (home)
    'hero.topline': { pt: '[01] Engenheiro · Londrina, BR · UTC−3', en: '[01] Engineer · Londrina, BR · UTC−3' },
    'hero.status': { pt: 'Aceitando projetos · Q2 2026', en: 'Taking on projects · Q2 2026' },
    'hero.line1': { pt: 'Sistemas que <em>permanecem</em>', en: 'Systems that <em>stay</em>' },
    'hero.line2': { pt: 'honestos sob <em>carga</em>.', en: 'honest under <em>load</em>.' },
    'hero.lede': {
      pt: 'Sou o <strong>Vitor Gabriel</strong> — engenheiro full stack trabalhando com Laravel SaaS, CI/CD e infraestrutura. Transformo problemas técnicos confusos em algo que o negócio pode confiar em produção.',
      en: "I'm <strong>Vitor Gabriel</strong> — full stack engineer working across Laravel SaaS, CI/CD and infra. I turn messy technical problems into something the business can actually trust in production."
    },

    // Home sections
    'qr.label': { pt: '[02] Resumo rápido', en: '[02] Quick read' },
    'qr.title': { pt: 'Um engenheiro full-stack<br>com viés de infra.', en: 'A full-stack engineer<br>with an infra bias.' },
    'qr.p1': { pt: 'Especializado em Laravel SaaS, CI/CD pipelines e infraestrutura. Arquiteto sistemas que escalam — desde o schema do Postgres até Kubernetes. Obsessivo por observabilidade, performance e decisões que compõem ao longo do tempo.', en: 'Specialized in Laravel SaaS, CI/CD pipelines and infrastructure. Architect systems that scale — from Postgres schema to Kubernetes. Obsessive about observability, performance and decisions that compound over time.' },
    'qr.p2': { pt: 'Histórico: 5 anos HTML/CSS/JS, 3 anos em produção com React/Node, atualmente full-stack pleno em DevOps e arquitetura. Vou onde o gargalo está.', en: 'Background: 5 years HTML/CSS/JS, 3 years production React/Node, now full-stack pleno in DevOps and architecture. I move where the bottleneck is.' },
    'qr.p3': { pt: 'Explorando: blockchain, transformers e internals de LLMs. Prefiro trabalho profundo e duradouro.', en: "Exploring: blockchain, transformers and LLM internals. I prefer deep, lasting work." },
    'feat.label': { pt: '[03] Trabalhos selecionados', en: '[03] Selected work' },
    'feat.title': { pt: 'Três projetos<br>que vale a pena ler.', en: 'Three projects<br>worth reading about.' },
    'caps.label': { pt: '[04] O que eu faço', en: '[04] What I do' },
    'caps.title': { pt: 'Full stack. Vou onde<br>o problema está.', en: 'Full stack. I move where<br>the problem is.' },
    'journ.label': { pt: '[05] Diário', en: '[05] Journal' },
    'journ.title': { pt: 'Notas, em público.', en: 'Notes, in public.' },
    'btn.read_all': { pt: 'Ler tudo →', en: 'Read all entries →' },
    'avail.label': { pt: '[06] Disponibilidade', en: '[06] Availability' },
    'avail.title': { pt: 'Contratando um engenheiro que entrega?', en: 'Hiring an engineer who finishes things?' },
    'avail.p': { pt: 'CLT, PJ ou Freelance. Remote-first, híbrido possível. Onboarding em uma semana. Atualmente disponível para novos projetos.', en: 'CLT, PJ or Freelance. Remote-first, hybrid possible. Comfortable onboarding in a week. Currently able to start new engagements.' },
    'avail.book': { pt: 'Agendar conversa →', en: 'Book a call →' },

    // Section headers
    'sec.selected': { pt: 'SELECIONADOS · 2025–2026', en: 'SELECTED · 2025–2026' },
    'sec.selected_title': { pt: 'Trabalhos em que estou profundamente imerso agora.', en: "Work I'm deep in right now." },
    'sec.capabilities': { pt: '[CAPACIDADES]', en: '[CAPABILITIES]' },
    'sec.capabilities_title': { pt: 'Como eu realmente ajudo.', en: "Where I'm actually useful." },
    'sec.journal': { pt: '[DIÁRIO] Notas recentes', en: '[JOURNAL] Recent writing' },
    'sec.journal_title': { pt: 'Pensando em voz alta.', en: 'Thinking out loud.' },
    'sec.cta': { pt: 'Vamos construir algo que dure.', en: "Let's build something that lasts." },
    'sec.cta_sub': { pt: 'Respondo em menos de 24 horas. Nenhum briefing é pequeno demais.', en: "I reply within 24 hours. No brief is too small." },
    'sec.principles': { pt: '[PRINCÍPIOS] Como eu trabalho', en: '[PRINCIPLES] How I work' },
    'sec.principles_title': { pt: 'Cinco notas que deixo na minha mesa.', en: 'Five notes I keep on my desk.' },
    'sec.career': { pt: '[EXPERIÊNCIA] Carreira', en: '[EXPERIENCE] Career' },
    'sec.career_title': { pt: 'A versão curta.', en: 'The short version.' },
    'sec.skills': { pt: '[HABILIDADES] O kit', en: '[SKILLS] The toolkit' },
    'sec.skills_title': { pt: 'Ferramentas que eu uso.', en: 'Tools I reach for.' },
    'sec.oss': { pt: '[OPEN SOURCE] Trabalho público', en: '[OPEN SOURCE] Public work' },
    'sec.oss_title': { pt: 'Algumas coisas que publiquei por aí.', en: "A handful of things I've put out there." },
    'sec.now': { pt: '[AGORA] No momento', en: '[NOW] Currently' },
    'sec.now_title': { pt: 'O que estou fazendo neste trimestre.', en: "What I'm doing this quarter." },

    // About page
    'about.topline': { pt: '[SOBRE] Engenheiro · Londrina, BR · Desde 2023', en: '[ABOUT] Engineer · Londrina, BR · Since 2023' },
    'about.topline_r': { pt: '3,5 anos entregando', en: '3.5 years shipping' },
    'about.head_title': { pt: 'Um engenheiro full-stack com <em>viés de infra</em>, instinto de produto e um olho na matemática.', en: 'A full-stack engineer with <em>an infra bias</em>, a product instinct, and one eye on the math.' },
    'about.bio.p1': { pt: 'Construo sistemas SaaS que cumprem o que prometem. Minha especialidade é Laravel, mas o trabalho real acontece ao longo da stack — do schema do Postgres até a árvore de estado React, e o VPS que sustenta tudo.', en: 'I build SaaS systems that keep their promises. My specialty is Laravel, but the real work happens across the stack — from the Postgres schema up to the React state tree, and the VPS that holds it all.' },
    'about.bio.p2': { pt: 'Comecei em 2023 como estagiário na <strong>Clickweb</strong>, trabalhei até chegar a full-stack pleno e adquiri uma série de habilidades ao longo do caminho: pipelines CI/CD, Docker, Kubernetes, Nginx, hardening de servidor Linux. Se algo precisa sobreviver a um deploy de sexta-feira, eu sou provavelmente quem você quer por perto.', en: "I started in 2023 as an intern at <strong>Clickweb</strong>, built my way up to full-stack pleno, and picked up a series of orbital skills along the way: CI/CD pipelines, Docker, Kubernetes, Nginx, Linux server hardening. If something has to survive a Friday deploy, I'm probably the one you want near it." },
    'about.bio.p3': { pt: 'Também levo produto a sério. As melhores decisões técnicas que tomei foram aquelas em que entendi <em>por que</em> o negócio precisava da coisa — e as piores foram quando otimizei para elegância de código em vez do que o time precisava entregar.', en: "I also take product seriously. The best technical decisions I've made were the ones where I understood <em>why</em> the business needed the thing — and the worst were the ones where I optimised for code elegance over what the team actually needed to ship." },
    'about.bio.p4': { pt: 'Ultimamente passo noites lendo sobre transformers: tokenização, vocabulários, cabeças de atenção, Q/K/V. Não para seguir uma tendência — porque a matemática é boa, e porque quero <strong>merecer</strong> o vocabulário.', en: 'Lately I spend evenings reading about transformers: tokenisation, vocabularies, attention heads, Q/K/V. Not to jump on a trend — because the math is good, and because I want to <strong>earn</strong> the vocabulary.' },
    'about.bio.quote': { pt: '"Se você não consegue explicar a decisão para quem está pagando a conta, provavelmente não terminou de pensar sobre ela."', en: '"If you can\'t explain the decision to the person paying the bill, you probably haven\'t finished thinking about it."' },
    'about.p01.t': { pt: 'O chato vence em produção.', en: 'Boring wins in production.' },
    'about.p01.d': { pt: 'A solução mais inteligente é aquela que o time consegue debugar às 3h da manhã sem mim.', en: 'The cleverest solution is the one the team can debug at 3am without me.' },
    'about.p02.t': { pt: 'Torne estados ilegais irrepresentáveis.', en: 'Make illegal states unrepresentable.' },
    'about.p02.d': { pt: 'Um schema que não consegue codificar um estado quebrado custa menos do que a suite de testes para detectar um.', en: "A schema that can't encode a broken state costs less than the test suite for catching one." },
    'about.p03.t': { pt: 'Observe, depois otimize.', en: 'Observe, then optimise.' },
    'about.p03.d': { pt: 'Nenhum trabalho de performance começa antes de existir a métrica para medir.', en: 'No performance work starts before the metric exists to measure it.' },
    'about.p04.t': { pt: 'Entregue a junção antes da feature.', en: 'Ship the seam before the feature.' },
    'about.p04.d': { pt: 'As interfaces se compõem. As features são reescritas. Projete as interfaces primeiro.', en: 'The interfaces compound. The features get rewritten. Design the interfaces first.' },
    'about.p05.t': { pt: 'Seja dono da stack inteira, respeite cada camada.', en: 'Own the whole stack, respect each layer.' },
    'about.p05.d': { pt: "Ser generalista não é desculpa para ser raso — é permissão para ir fundo onde o problema está.", en: "Generalism isn't an excuse to be shallow — it's permission to go deep where the problem is." },
    'about.now.k.building': { pt: '● CONSTRUINDO', en: '● BUILDING' },
    'about.now.k.shipping': { pt: '● ENTREGANDO', en: '● SHIPPING' },
    'about.now.k.reading': { pt: '● LENDO', en: '● READING' },
    'about.now.k.considering': { pt: '● CONSIDERANDO', en: '● CONSIDERING' },
    'about.now.building': { pt: 'Laravel Fintech Core — hardening do ledger + modelos de leitura multi-tenant', en: 'Laravel Fintech Core — ledger hardening + multi-tenant read models' },
    'about.now.shipping': { pt: 'Risklog — v2 do modelo de risco, puxando autoria + criticidade de arquivo', en: 'Risklog — v2 risk model, pulling authorship + file criticality' },
    'about.now.reading': { pt: 'Transformers do zero — notas no Diário', en: 'Transformers from scratch — notes up on Journal' },
    'about.now.considering': { pt: 'Novo contrato, Q2 2026 — CLT, PJ ou freelance estratégico', en: 'New engagement, Q2 2026 — CLT, PJ or strategic freelance' },

    // Skills categories
    'skills.Backend': { pt: 'Backend', en: 'Backend' },
    'skills.Frontend': { pt: 'Frontend', en: 'Frontend' },
    'skills.Infra / DevOps': { pt: 'Infra / DevOps', en: 'Infra / DevOps' },
    'skills.Exploratory': { pt: 'Exploratório', en: 'Exploratory' },

    // Contact page
    'contact.head_label': { pt: '[CONTATO] Começar uma conversa', en: '[CONTACT] Start a conversation' },
    'contact.head_badge': { pt: 'Disponível · Q2 2026', en: 'Available · Q2 2026' },
    'contact.head_title': { pt: 'Me fala o que você está <em>tentando entregar</em>.', en: "Tell me what you're <em>trying to ship</em>." },
    'contact.title': { pt: 'Vamos conversar.', en: "Let's talk." },
    'contact.sub': { pt: 'Me fala do que você precisa. Respondo em até 24h.', en: "Tell me what you need. I reply within 24 hours." },
    'contact.form.name': { pt: 'Nome', en: 'Name' },
    'contact.form.email': { pt: 'Email', en: 'Email' },
    'contact.form.message': { pt: 'Mensagem', en: 'Message' },
    'contact.form.submit': { pt: 'Enviar mensagem →', en: 'Send message →' },
    'contact.start_conv': { pt: 'Começar uma conversa', en: 'Start a conversation' },
    'contact.step1': { pt: '[PASSO 01] Sobre você', en: '[STEP 01] About you' },
    'contact.f_name': { pt: 'Seu nome', en: 'Your name' },
    'contact.f_company': { pt: 'Empresa · Cargo (opcional)', en: 'Company · Role (optional)' },
    'contact.f_company_ph': { pt: 'ex: Acme · CTO', en: 'e.g. Acme · CTO' },
    'contact.step2': { pt: '[PASSO 02] O projeto', en: '[STEP 02] The project' },
    'contact.kind_label': { pt: 'Que tipo de contrato?', en: 'What kind of engagement?' },
    'contact.kind.freelance': { pt: 'Projeto freelance', en: 'Freelance project' },
    'contact.kind.consult': { pt: 'Consultoria / auditoria', en: 'Consult / audit' },
    'contact.kind.unsure': { pt: 'Ainda não sei', en: 'Not sure yet' },
    'contact.focus_label': { pt: 'Onde está o peso?', en: "Where's the weight?" },
    'contact.focus.other': { pt: 'Outro', en: 'Other' },
    'contact.budget_label': { pt: 'Faixa de orçamento (BRL / mês)', en: 'Budget range (BRL / month)' },
    'contact.budget_unit': { pt: '/ mês', en: '/ month' },
    'contact.budget_helper': { pt: 'Aproximado está bom — te digo se sou o fit certo.', en: "Rough is fine — I'll tell you if I'm the right fit." },
    'contact.step3': { pt: '[PASSO 03] O briefing', en: '[STEP 03] The brief' },
    'contact.msg_label': { pt: 'O que você está tentando entregar?', en: "What are you trying to ship?" },
    'contact.msg_placeholder': { pt: "Um ou dois parágrafos sobre o problema, o estado atual e como 'pronto' se parece.", en: "One or two paragraphs about the problem, the current state, and what 'done' looks like." },
    'contact.submit_helper': { pt: 'Respondo em 24h em dias úteis.', en: 'I reply within 24h on weekdays.' },
    'contact.submit': { pt: 'Enviar briefing →', en: 'Send brief →' },
    'contact.sent_title': { pt: 'Briefing recebido. ✓', en: 'Brief received. ✓' },
    'contact.sent_p': { pt: 'Obrigado — entro em contato em até 24h no email que você forneceu. Se for urgente, me manda mensagem no WhatsApp.', en: "Thanks — I'll be in touch within 24h at the email you provided. If it's urgent, ping me on WhatsApp." },
    'contact.direct': { pt: '/ Canais diretos', en: '/ Direct channels' },
    'contact.response': { pt: '/ Tempo de resposta', en: '/ Response expectations' },
    'contact.first_reply': { pt: 'Primeira resposta', en: 'First reply' },
    'contact.first_reply_val': { pt: '< 24h (dias úteis)', en: '< 24h (weekdays)' },
    'contact.intro_call': { pt: 'Chamada inicial', en: 'Intro call' },
    'contact.intro_call_val': { pt: 'Dentro da semana', en: 'Within the week' },
    'contact.kickoff': { pt: 'Kickoff', en: 'Kickoff' },
    'contact.kickoff_val': { pt: '1–2 semanas', en: '1–2 weeks' },
    'contact.load': { pt: 'Carga atual', en: 'Current load' },
    'contact.load_val': { pt: '● Aceitando novos', en: '● Accepting new' },
    'contact.faq.label': { pt: '/ Dúvidas frequentes', en: '/ Quick FAQ' },
    'contact.faq.q1': { pt: 'Qual stack você prefere?', en: 'What stack do you prefer?' },
    'contact.faq.a1': { pt: "Laravel + Postgres + React/Next.js, em Linux com Docker. Mas me movo onde o problema está — já entreguei Node, Vue, Angular e vários sabores de infra.", en: "Laravel + Postgres + React/Next.js, deployed on Linux with Docker. But I move where the problem is — I've shipped Node, Vue, Angular and various infra flavours." },
    'contact.faq.q2': { pt: 'Você aceita contratos curtos?', en: 'Do you take short contracts?' },
    'contact.faq.a2': { pt: 'Sim, se o escopo for claro. Auditorias e contratos de 2–4 semanas funcionam bem. Não aceito trabalho que não posso terminar direito.', en: "Yes, if the scope is clear. Audits and 2–4 week engagements work well. I won't take work I can't finish properly." },
    'contact.faq.q3': { pt: 'Remoto ou presencial?', en: 'Remote or in-person?' },
    'contact.faq.a3': { pt: "Remote-first. Híbrido é possível se você estiver em Londrina. Confortável com times async em diferentes fusos.", en: "Remote-first. Hybrid is possible if you're in Londrina. Comfortable with async teams across time zones." },
    'contact.err.name': { pt: 'Nome é obrigatório.', en: 'Name is required.' },
    'contact.err.email': { pt: 'Email válido é obrigatório.', en: 'Valid email is required.' },
    'contact.err.msg': { pt: 'Um briefing rápido ajuda — mesmo 2 frases.', en: 'A quick brief helps — even 2 sentences.' },

    // Journal page
    'journal.title': { pt: 'Diário', en: 'Journal' },
    'journal.sub': { pt: 'Anotações sobre engenharia, sistemas e o ofício de entregar software confiável.', en: 'Notes on engineering, systems design, and the craft of shipping reliable software.' },
    'journal.head_label': { pt: '[DIÁRIO] Escrita · Aprendendo em público', en: '[JOURNAL] Writing · Learning in public' },
    'journal.head_title': { pt: 'Pensando em voz alta, em <em>parágrafos completos</em>.', en: 'Thinking out loud, in <em>full paragraphs</em>.' },
    'journal.head_lede': { pt: 'Notas sobre arquitetura, decisões em produção e o que estou lendo. Inacabado por design — o objetivo é pensar, não publicar.', en: "Notes on architecture, decisions in production, and what I'm reading. Unpolished by design — the point is to think, not to publish." },
    'journal.filter.all': { pt: 'Todos', en: 'All' },
    'journal.close': { pt: '✕ Fechar', en: '✕ Close' },
    'journal.entries': { pt: 'entradas', en: 'entries' },
    'journal.words': { pt: 'palavras', en: 'words' },
    'journal.by': { pt: 'por Vitor Gabriel', en: 'by Vitor Gabriel' },
    'journal.article.p1': { pt: 'Esta é uma entrada placeholder — o artigo real está na minha pasta de rascunhos e migra para cá quando está pronto. A ideia, por ora, é dar ao portfólio a forma de alguém que escreve, e mostrar como os tópicos ficam quando se acumulam.', en: "This is a placeholder entry — the real article lives in my drafts folder and migrates here when it's ready. The idea, for now, is to give the portfolio the shape of someone who writes, and to show what the topics look like when they collect." },
    'journal.article.why_h': { pt: 'Por que escrever afinal?', en: 'Why write at all?' },
    'journal.article.why_p': { pt: 'Porque a melhor forma de saber se realmente entendo algo é escrever, mal, e depois ler na semana seguinte. A segunda passagem é onde o entendimento real acontece.', en: "Because the best way to know whether I actually understand something is to write it down, badly, and then read it back the next week. The second pass is where the real understanding happens." },
    'journal.article.quote': { pt: 'Escrever é o compilador do pensamento. As mensagens de erro são cruéis.', en: "Writing is the compiler for thought. The error messages are unkind." },
    'journal.article.rough_p': { pt: 'Espere arestas. Espere correções. Espere os ocasionais posts "eu estava errado sobre isso, e eis o porquê" — esses são os que mais aprendo.', en: "Expect rough edges. Expect corrections. Expect the occasional \"I was wrong about this, here's why\" post — those are the ones I learn from most." },
    'journal.article.sub_h': { pt: 'Assinar', en: 'Subscribing' },
    'journal.article.sub_p': { pt: 'Ainda sem newsletter. Acompanhe no <a href="https://github.com/vitorgabrieldev" style="color:var(--accent)">GitHub</a> ou volte aqui.', en: 'No newsletter yet. Follow along on <a href="https://github.com/vitorgabrieldev" style="color:var(--accent)">GitHub</a> or check back here.' },

    // Projects page
    'projects.title': { pt: 'Projetos', en: 'Work' },
    'projects.sub': { pt: 'Trabalhos selecionados · 2018 – presente', en: 'Selected work · 2018 – present' },
    'projects.all': { pt: 'Todos', en: 'All' },
    'projects.head_label': { pt: '[ÍNDICE] Todo trabalho · 2023 → 2026', en: '[INDEX] All work · 2023 → 2026' },
    'projects.head_title': { pt: 'Trabalho, em ordem do que <em>aprendi</em>.', en: 'Work, in order of <em>what I learned</em>.' },
    'projects.head_lede': { pt: 'Oito projetos selecionados em fintech, DevOps, plataformas sociais e pesquisa. Filtre por disciplina ou mude o modo de visualização.', en: 'Eight selected projects across fintech, DevOps tooling, social platforms and research. Filter by discipline or switch the view mode.' },
    'projects.view': { pt: 'Visualizar', en: 'View' },
    'projects.mode.list': { pt: '☰ Lista', en: '☰ List' },
    'projects.mode.grid': { pt: '▦ Grade', en: '▦ Grid' },
    'projects.mode.gallery': { pt: '◐ Galeria', en: '◐ Gallery' },
    'projects.read_case': { pt: 'Ver case →', en: 'Read case →' },
    'projects.results.one': { pt: 'resultado', en: 'result' },
    'projects.results.many': { pt: 'resultados', en: 'results' },

    // Capabilities (home)
    'cap.01.t': { pt: 'Sistemas backend', en: 'Backend systems' },
    'cap.01.b': { pt: 'APIs Laravel, modelos de dados, auth, filas, design multi-tenant.', en: 'Laravel APIs, data models, auth, queues, multi-tenant design.' },
    'cap.02.t': { pt: 'Infra & DevOps', en: 'Infra & DevOps' },
    'cap.02.b': { pt: 'Docker, Kubernetes, pipelines CI/CD, Nginx, hardening Linux.', en: 'Docker, Kubernetes, CI/CD pipelines, Nginx, Linux hardening.' },
    'cap.03.t': { pt: 'Entrega frontend', en: 'Frontend delivery' },
    'cap.03.b': { pt: 'React, Next.js, TypeScript. Interfaces que envelhecem bem.', en: 'React, Next.js, TypeScript. Interfaces that age well.' },
    'cap.04.t': { pt: 'Design de API', en: 'API design' },
    'cap.04.b': { pt: 'Contratos REST e GraphQL. Versionamento sem drama.', en: 'REST and GraphQL contracts. Versioning without drama.' },
    'cap.05.t': { pt: 'Observabilidade', en: 'Observability' },
    'cap.05.b': { pt: 'Logs, métricas, traces — a maquinaria para responder "por quê".', en: 'Logs, metrics, traces — the machinery to answer "why".' },
    'cap.06.t': { pt: 'Segurança no release', en: 'Release safety' },
    'cap.06.b': { pt: 'Testes automatizados, estratégia de rollback, tagging de risco de deploy.', en: 'Automated tests, rollback strategy, deploy risk tagging.' },
    'cap.07.t': { pt: 'Pesquisa', en: 'Research' },
    'cap.07.b': { pt: 'Protótipos blockchain, internals de transformers, LLM ops.', en: 'Blockchain prototypes, transformer internals, LLM ops.' },
    'cap.08.t': { pt: 'Intuição de produto', en: 'Product intuition' },
    'cap.08.b': { pt: 'Traduzindo requisitos de negócio em realidade técnica.', en: 'Translating business requirements into technical reality.' },

    // Project case study page
    'project.back': { pt: '← Projetos', en: '← Work' },
    'project.year_label': { pt: 'ANO', en: 'YEAR' },
    'project.role_label': { pt: 'FUNÇÃO', en: 'ROLE' },
    'project.status_label': { pt: 'STATUS', en: 'STATUS' },
    'project.shipped': { pt: '● Entregue', en: '● Shipped' },
    'project.github': { pt: 'Ver no GitHub ↗', en: 'View on GitHub ↗' },
    'project.read_mode': { pt: 'Modo leitura ↗', en: 'Reading mode ↗' },
    'project.exit_read': { pt: 'Sair do modo leitura ✕', en: 'Exit reading mode ✕' },
    'project.on_page': { pt: 'Nesta página', en: 'On this page' },
    'project.tools': { pt: 'Ferramentas', en: 'Tools' },
    'project.tool_read': { pt: '📖 Modo leitura', en: '📖 Reading mode' },
    'project.print': { pt: '⎙ Imprimir case', en: '⎙ Print case' },
    'project.next_case': { pt: 'Próximo case →', en: 'Next case →' },
    'project.default.context': { pt: 'Contexto', en: 'Context' },
    'project.default.stack_label': { pt: 'Stack', en: 'Stack' },
    'project.default.placeholder': { pt: 'Um write-up detalhado está em andamento. Este é um substituto — me pergunte sobre isso e vou te guiar pelas decisões de design ao vivo.', en: "A detailed case write-up is in progress. This placeholder is a stand-in — ask me about it and I'll walk you through the design decisions live." },

    // Footer
    'foot.studio_title': { pt: 'Vamos entregar algo preciso.', en: "Let's ship something precise." },
    'foot.studio_p': { pt: 'Aberto a full-time, contratos de projeto e freelance. Remoto ou híbrido (Londrina, BR). Responde em 24h em dias úteis.', en: 'Open to full-time, project contracts and freelance. Remote or hybrid (Londrina, BR). Replies within 24h on weekdays.' },
    'foot.start_conv': { pt: 'Começar uma conversa →', en: 'Start a conversation →' },
    'foot.col.site': { pt: '/ SITE', en: '/ SITE' },
    'foot.col.elsewhere': { pt: '/ OUTROS LUGARES', en: '/ ELSEWHERE' },
    'foot.col.info': { pt: '/ INFO', en: '/ INFO' },
    'foot.nav.index': { pt: 'Início', en: 'Index' },
    'foot.nav.work': { pt: 'Projetos', en: 'Work' },
    'foot.nav.about': { pt: 'Sobre', en: 'About' },
    'foot.nav.journal': { pt: 'Diário', en: 'Journal' },
    'foot.nav.contact': { pt: 'Contato', en: 'Contact' },
    'foot.handcrafted': { pt: 'FEITO À MÃO · SEM TEMPLATES', en: 'HANDCRAFTED · NO TEMPLATES' },

    // Palette
    'palette.search': { pt: 'Buscar projetos, posts, sobre…', en: 'Search projects, writing, about…' },

    // Back to top
    'btt.top': { pt: 'TOPO', en: 'TOP' },

    // Footer rights
    'foot.rights': { pt: '© 2026 Vitor Gabriel. Construído à mão.', en: '© 2026 Vitor Gabriel. Hand-built.' },
  };

  const STORAGE_KEY = 'vg_lang';
  const DEFAULT = 'pt';

  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT;

  window.t = (key) => {
    const entry = DICT[key];
    if (!entry) return key;
    return entry[currentLang] || entry[DEFAULT] || key;
  };

  // For data objects with {pt, en} structure
  window.td = (val) => {
    if (val == null) return val;
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && (val.pt !== undefined || val.en !== undefined)) {
      return val[currentLang] || val[DEFAULT] || '';
    }
    return String(val);
  };

  window.getLang = () => currentLang;

  const applyAll = () => {
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const html = el.dataset.i18nHtml !== undefined;
      const val = window.t(key);
      if (html) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const pairs = el.dataset.i18nAttr.split(';');
      pairs.forEach(p => {
        const [attr, key] = p.split(':').map(s => s.trim());
        if (attr && key) el.setAttribute(attr, window.t(key));
      });
    });
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === currentLang);
    });
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  };

  window.setLang = (lang) => {
    if (lang !== 'pt' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyAll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAll);
  } else {
    applyAll();
  }
})();
