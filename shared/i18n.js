/* i18n — PT-BR default, EN available via toggle.
   Strings are keyed; pages tag elements with data-i18n="<key>".
   For dynamic content, window.t(key) returns the current-lang string. */
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
    'qr.p1': { pt: 'Cinco anos com HTML/CSS/JavaScript, três rodando React e Node em produção, um liderando APIs Laravel e pipelines Kubernetes — vou onde estiver o gargalo.', en: 'Five years with HTML/CSS/JavaScript, three running React and Node in production, one owning Laravel APIs and Kubernetes pipelines — I move where the bottleneck is.' },
    'qr.p2': { pt: 'Me importo com o formato dos sistemas: as costuras entre serviços, como a falha se propaga, como a observabilidade é montada. Decisões de arquitetura que parecem pequenas no dia um e compõem por anos.', en: 'I care about the shape of systems: the seams between services, how failure travels, how observability is wired. Architecture decisions that look small on day one and compound for years.' },
    'qr.p3': { pt: 'Nas horas livres: protótipos com blockchain, e no momento estou imerso em internals de transformers — tokenização, atenção Q/K/V, lendo a matemática de ponta a ponta.', en: "On the side: blockchain prototypes, and right now I'm deep in transformer internals — tokenisation, Q/K/V attention, reading the maths end-to-end." },
    'feat.label': { pt: '[03] Trabalhos selecionados', en: '[03] Selected work' },
    'feat.title': { pt: 'Três projetos<br>que vale a pena ler.', en: 'Three projects<br>worth reading about.' },
    'caps.label': { pt: '[04] O que eu faço', en: '[04] What I do' },
    'caps.title': { pt: 'Generalista. Fundo onde<br>precisa ser fundo.', en: 'Generalist. Deep where<br>it needs to be deep.' },
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
    'about.head_line': { pt: '[02] Sobre', en: '[02] About' },
    'about.head_title_1': { pt: 'Um engenheiro full-stack com', en: 'A full-stack engineer with' },
    'about.head_em': { pt: 'viés de infra', en: 'an infra bias' },
    'about.head_title_2': { pt: ', instinto de produto e um olho na matemática.', en: ', a product instinct, and one eye on the math.' },

    // Contact page
    'contact.title': { pt: 'Vamos conversar.', en: "Let's talk." },
    'contact.sub': { pt: 'Me fala do que você precisa. Respondo em até 24h.', en: "Tell me what you need. I reply within 24 hours." },
    'contact.form.name': { pt: 'Nome', en: 'Name' },
    'contact.form.email': { pt: 'Email', en: 'Email' },
    'contact.form.message': { pt: 'Mensagem', en: 'Message' },
    'contact.form.submit': { pt: 'Enviar mensagem →', en: 'Send message →' },
    'contact.start_conv': { pt: 'Começar uma conversa', en: 'Start a conversation' },

    // Journal page
    'journal.title': { pt: 'Diário', en: 'Journal' },
    'journal.sub': { pt: 'Anotações sobre engenharia, sistemas e o ofício de entregar software confiável.', en: 'Notes on engineering, systems design, and the craft of shipping reliable software.' },

    // Projects page
    'projects.title': { pt: 'Projetos', en: 'Work' },
    'projects.sub': { pt: 'Trabalhos selecionados · 2018 – presente', en: 'Selected work · 2018 – present' },
    'projects.all': { pt: 'Todos', en: 'All' },

    // Palette
    'palette.search': { pt: 'Buscar projetos, posts, sobre…', en: 'Search projects, writing, about…' },

    // Back to top
    'btt.top': { pt: 'TOPO', en: 'TOP' },

    // Footer
    'foot.rights': { pt: '© 2026 Vitor Gabriel. Construído à mão.', en: '© 2026 Vitor Gabriel. Hand-built.' },
  };

  const STORAGE_KEY = 'vg_lang';
  const DEFAULT = 'pt';

  // Read saved lang (default pt)
  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT;

  window.t = (key) => {
    const entry = DICT[key];
    if (!entry) return key;
    return entry[currentLang] || entry[DEFAULT] || key;
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
    // Update toggle label
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === currentLang);
    });
    // Fire event so page-specific scripts can re-render dynamic content
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  };

  window.setLang = (lang) => {
    if (lang !== 'pt' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyAll();
  };

  // Apply as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAll);
  } else {
    applyAll();
  }
})();
