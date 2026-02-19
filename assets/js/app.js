$(document).ready(function () {
    const INTRO_ANIMATION_KEY = "vg_intro_animation_played";
    const LANGUAGE_KEY = "vg_site_language";
    const DEFAULT_LANGUAGE = "en";

    const INTRO_TEXT = {
        en: {
            up: "HI!",
            down: "I am Vitor Gabriel",
            subtitle: "FULL STACK DEVELOPER | DEVOPS ENTHUSIAST"
        },
        pt: {
            up: "OLÁ!",
            down: "Eu sou Vitor Gabriel",
            subtitle: "DESENVOLVEDOR FULL STACK | ENTUSIASTA DEVOPS"
        }
    };

    const PROFILE_TEXT = {
        en: {
            profession: "Full Stack Developer",
            bio: "Since a young age, I've been dedicated to programming and innovation. I am passionate about technology and its power to create solutions and connect people. I enjoy exploring new fields and understanding how my knowledge can interconnect. I am driven by challenges, especially those that seem impossible to solve. I always strive to push my limits and identify areas where I can further develop.",
            currentPosition: "Full Stack Pleno Developer",
            previousPosition: "Intern - Developer",
            course: "High school technical degree in Internet Information Technology"
        },
        pt: {
            profession: "Desenvolvedor Full Stack",
            bio: "Desde jovem, sou dedicado à programação e à inovação. Sou apaixonado por tecnologia e pelo poder que ela tem de criar soluções e conectar pessoas. Gosto de explorar novas áreas e entender como meu conhecimento pode se interligar. Sou movido por desafios, principalmente aqueles que parecem impossíveis de resolver. Sempre busco ultrapassar meus limites e identificar onde posso evoluir ainda mais.",
            currentPosition: "Desenvolvedor Full Stack Pleno",
            previousPosition: "Estagiário - Desenvolvedor",
            course: "Ensino médio técnico de informática para internet"
        }
    };

    const TIMELINE_TOGGLE_TEXT = {
        en: {
            expand: "Show more",
            collapse: "Hide"
        },
        pt: {
            expand: "Ver mais",
            collapse: "Ocultar"
        }
    };

    const TECH_DOCS = {
        "HTML": "https://developer.mozilla.org/docs/Web/HTML",
        "CSS": "https://developer.mozilla.org/docs/Web/CSS",
        "JavaScript": "https://developer.mozilla.org/docs/Web/JavaScript",
        "jQuery": "https://api.jquery.com/",
        "React.js": "https://react.dev/",
        "SASS": "https://sass-lang.com/documentation/",
        "SCSS": "https://sass-lang.com/documentation/syntax/",
        "Vue.js": "https://vuejs.org/guide/introduction.html",
        "Angular": "https://angular.dev/",
        "TypeScript": "https://www.typescriptlang.org/docs/",
        "Next.js": "https://nextjs.org/docs",
        "PHP": "https://www.php.net/docs.php",
        "API REST": "https://restfulapi.net/",
        "Node.js": "https://nodejs.org/docs/latest/api/",
        "Express.js": "https://expressjs.com/",
        "Apollo Server": "https://www.apollographql.com/docs/apollo-server/",
        "GraphQL": "https://graphql.org/learn/",
        "Laravel": "https://laravel.com/docs",
        "MongoDB": "https://www.mongodb.com/docs/",
        "JWT": "https://jwt.io/introduction",
        "PM2": "https://pm2.keymetrics.io/docs/usage/quick-start/",
        "Git": "https://git-scm.com/doc",
        "GitHub": "https://docs.github.com/",
        "Testes": "https://jestjs.io/docs/getting-started",
        "Testing": "https://jestjs.io/docs/getting-started",
        "Apache": "https://httpd.apache.org/docs/",
        "GitLab": "https://docs.gitlab.com/",
        "CI/CD": "https://docs.github.com/en/actions",
        "Docker": "https://docs.docker.com/",
        "Linux": "https://www.kernel.org/doc/html/latest/",
        "DigitalOcean": "https://docs.digitalocean.com/",
        "AWS": "https://docs.aws.amazon.com/",
        "Nginx": "https://nginx.org/en/docs/",
        "Kubernetes": "https://kubernetes.io/docs/home/"
    };

    const SPECIALTY_LEVEL_META = [
        { key: "5y", icon: "ti-star" },
        { key: "3y", icon: "ti-layers" },
        { key: "1y", icon: "ti-rocket" }
    ];

    const ptContent = {
        lang: "pt-BR",
        meta: {
            title: "Vitor Gabriel - Desenvolvedor Full Stack | Blockchain, DevOps e Apps Web",
            description: "Vitor Gabriel | Desenvolvedor Full Stack, Docker, Kubernetes, Redes P2P, Blockchain e entusiasta Linux. Explore meu portfólio de desenvolvimento web com foco em tecnologias de ponta.",
            keywords: "Vitor Gabriel, Desenvolvedor Full Stack, Desenvolvimento Web, Blockchain, Docker, Kubernetes, Node.js, React, PHP, APIs, Backend, Frontend, Linux, CI/CD, DevOps",
            ogTitle: "Vitor Gabriel | Portfólio de Desenvolvedor Full Stack",
            ogDescription: "Explore o portfólio de Vitor Gabriel, desenvolvedor Full Stack com experiência em tecnologias web modernas, incluindo Docker, Kubernetes e blockchain.",
            twitterTitle: "Vitor Gabriel | Portfólio de Desenvolvedor Full Stack",
            twitterDescription: "Explore o portfólio de Vitor Gabriel, desenvolvedor Full Stack com experiência em web, blockchain e tecnologias de backend."
        },
        header: {
            memberBadge: "Membro do Programa de Desenvolvedores | Github",
        },
        menu: {
            title: "Buscar projetos",
            placeholder: "Pesquise por projetos...",
            options: ["Novo Repositório", "Explorar", "Configurações"]
        },
        about: {
            subtitle: "Quem sou eu?",
            title: "Sobre mim",
            description: "Eu sou Vitor Gabriel de Oliveira, um desenvolvedor Full Stack apaixonado. Desde cedo, fui movido pelas possibilidades da tecnologia e por como ela pode resolver problemas do mundo real...",
            downloadCv: "Baixar CV"
        },
        specialties: {
            subtitle: "Domínios principais",
            title: "Especialidades",
            cards: [
                {
                    title: "Front-End",
                    levels: [
                        {
                            key: "5y",
                            icon: "ti-star",
                            label: "> 5 anos",
                            items: ["HTML", "CSS", "JavaScript", "jQuery"]
                        },
                        {
                            key: "3y",
                            icon: "ti-layers",
                            label: "> 3 anos",
                            items: ["React.js", "SASS", "SCSS", "Vue.js", "Angular", "TypeScript"]
                        },
                        {
                            key: "1y",
                            icon: "ti-rocket",
                            label: "> 1 ano",
                            items: ["Next.js"]
                        }
                    ]
                },
                {
                    title: "Back-End",
                    levels: [
                        {
                            key: "5y",
                            icon: "ti-star",
                            label: "> 5 anos",
                            items: ["PHP", "API REST"]
                        },
                        {
                            key: "3y",
                            icon: "ti-layers",
                            label: "> 3 anos",
                            items: ["Node.js", "Express.js", "Apollo Server", "GraphQL"]
                        },
                        {
                            key: "1y",
                            icon: "ti-rocket",
                            label: "> 1 ano",
                            items: ["Laravel", "MongoDB", "JWT", "PM2"]
                        }
                    ]
                },
                {
                    title: "DevOps e Qualidade",
                    levels: [
                        {
                            key: "5y",
                            icon: "ti-star",
                            label: "> 5 anos",
                            items: ["Git", "GitHub", "Testes", "Apache"]
                        },
                        {
                            key: "3y",
                            icon: "ti-layers",
                            label: "> 3 anos",
                            items: ["GitLab", "CI/CD", "Docker", "Linux", "DigitalOcean"]
                        },
                        {
                            key: "1y",
                            icon: "ti-rocket",
                            label: "> 1 ano",
                            items: ["AWS", "Nginx", "Kubernetes"]
                        }
                    ]
                }
            ]
        },
        timeline: {
            subtitle: "Minha jornada",
            title: "Linha do tempo",
            titles: [
                "Iniciei no Front-End com <a href=\"https://developer.mozilla.org/docs/Web/HTML\">HTML5</a>, <a href=\"https://developer.mozilla.org/docs/Web/CSS\">CSS3</a>, <a href=\"https://developer.mozilla.org/docs/Web/JavaScript\">JavaScript</a>, <a href=\"https://sass-lang.com/documentation\">SCSS/SASS</a> e <a href=\"https://lesscss.org/\">LESS</a>",
                "Trabalhei com <a href=\"https://api.jquery.com/\">jQuery</a> para <a href=\"https://developer.mozilla.org/docs/Web/API/Document_Object_Model\">DOM</a>, <a href=\"https://developer.mozilla.org/docs/Web/API/XMLHttpRequest_API\">AJAX</a> e interações de interface",
                "Desenvolvi interfaces com <a href=\"https://react.dev/\">React.js</a>, <a href=\"https://vuejs.org/guide/introduction.html\">Vue.js</a>, <a href=\"https://angular.dev/\">Angular</a>, <a href=\"https://docs.npmjs.com/\">npm</a> e <a href=\"https://yarnpkg.com/getting-started\">yarn</a>",
                "Aperfeiçoei versionamento com <a href=\"https://git-scm.com/doc\">Git</a>, <a href=\"https://docs.github.com/\">GitHub</a>, <a href=\"https://docs.gitlab.com/\">GitLab</a> e <a href=\"https://github.com/gitbucket/gitbucket\">GitBucket</a>",
                "Iniciei como estagiário Full Stack na <a href=\"https://clickweb.com.br\">Clickweb</a>",
                "Desenvolvi soluções back-end com <a href=\"https://nodejs.org/docs/latest/api/\">Node.js</a>, <a href=\"https://expressjs.com/\">Express.js</a>, <a href=\"https://restfulapi.net/\">APIs RESTful</a>, <a href=\"https://www.php.net/docs.php\">PHP</a>, <a href=\"https://laravel.com/docs\">Laravel</a>, <a href=\"https://jwt.io/introduction\">JWT</a>, <a href=\"https://www.mongodb.com/docs/\">MongoDB</a> e <a href=\"https://pm2.keymetrics.io/docs/usage/quick-start/\">PM2</a>",
                "Implementei <a href=\"https://graphql.org/learn/\">GraphQL</a> com <a href=\"https://www.apollographql.com/docs/apollo-server/\">Apollo Server</a> e <a href=\"https://www.mongodb.com/docs/\">MongoDB</a>",
                "Fui promovido a Desenvolvedor Full Stack Pleno na <a href=\"https://clickweb.com.br\">Clickweb</a>",
                "Integrei <a href=\"https://docs.github.com/en/actions\">CI/CD</a>, <a href=\"https://docs.docker.com/\">Docker</a> e <a href=\"https://kubernetes.io/docs/home/\">Kubernetes</a>",
                "Estudei e prototipei <a href=\"https://ethereum.org/en/developers/docs/\">Blockchain</a> com <a href=\"https://docs.soliditylang.org/\">Solidity</a> e <a href=\"https://ethereum.org/en/developers/docs/\">Ethereum</a>",
                "Configurei ambientes em <a href=\"https://docs.digitalocean.com/\">DigitalOcean</a>, <a href=\"https://docs.aws.amazon.com/\">AWS</a>, <a href=\"https://www.hostinger.com/tutorials\">Hostinger</a> e <a href=\"https://www.hostgator.com/help\">Hostgator</a> com <a href=\"https://www.kernel.org/doc/html/latest/\">Linux</a>, <a href=\"https://www.openssh.com/manual.html\">SSH</a> e <a href=\"https://nginx.org/en/docs/\">Nginx</a>"
            ],
            descriptions: [
                "Construí interfaces responsivas e camadas de estilo reutilizáveis, equilibrando performance, acessibilidade e consistência visual.",
                "Implementei fluxos interativos leves com manutenção simples e evolução rápida em páginas de produção.",
                "Padronizei setup de pacotes e organização de módulos, aumentando escalabilidade e velocidade de entrega.",
                "Melhorei estratégia de branches, colaboração e qualidade de revisão para releases mais seguras.",
                "Atuei em demandas de front e back entendendo contexto de negócio, suporte e ritmo real de entrega.",
                "Unifiquei stacks de API e aplicação, elevando segurança de autenticação, estabilidade e manutenção contínua.",
                "Modelei resolvers e consultas para cenários complexos, melhorando comunicação cliente-servidor.",
                "Assumi direção técnica em entregas-chave e elevei padrões de qualidade do ciclo de produto.",
                "Automatizei build, testes e deploy, reduzindo tempo de entrega e risco operacional em produção.",
                "Validei conceitos de DApps e integrações descentralizadas com foco prático e evolução incremental.",
                "Atuei em decisões de arquitetura e organização do time; você pode detalhar depois."
            ]
        },
        services: {
            subtitle: "O que eu faço?",
            title: "Serviços",
            cards: [
                {
                    title: "Docker e Kubernetes",
                    subtitle: "Trabalho com containerização e orquestração usando Docker e Kubernetes."
                },
                {
                    title: "Configuração Linux",
                    subtitle: "Configuro e gerencio servidores Linux para otimizar performance e segurança."
                },
                {
                    title: "Desenvolvimento Back-End",
                    subtitle: "Desenvolvo backends robustos com Laravel, focados em APIs, segurança e escalabilidade."
                },
                {
                    title: "Desenvolvimento Front-End",
                    subtitle: "Desenvolvo frontends modernos com React e Next.js."
                },
                {
                    title: "APIs e Integrações",
                    subtitle: "Projeto e integro APIs com contratos confiáveis, versionamento e consistência de dados."
                },
                {
                    title: "Automação de Deploy",
                    subtitle: "Construo pipelines de CI/CD para automatizar testes, releases e rollback com mais segurança."
                },
                {
                    title: "Segurança de Aplicações",
                    subtitle: "Aplico práticas de código seguro, reforço de autenticação e prevenção de vulnerabilidades."
                },
                {
                    title: "Qualidade de Software",
                    subtitle: "Garanto qualidade de software com testes, cobertura e prevenção de regressão."
                }
            ]
        },
        availability: {
            subtitle: "Como eu trabalho?",
            title: "Disponibilidade",
            cards: [
                {
                    title: "CLT | PJ | Freelance",
                    subtitle: "Disponível para contratação fixa e projetos estratégicos."
                },
                {
                    title: "Remoto | Híbrido",
                    subtitle: "Preferência por remoto, com opção híbrida conforme a vaga."
                },
                {
                    title: "UTC-3 (Brasil)",
                    subtitle: "Rotina com boa sobreposição para times no Brasil e exterior."
                },
                {
                    title: "Início imediato",
                    subtitle: "Posso começar rápido com transição organizada e handover claro."
                }
            ]
        },
        portfolio: {
            subtitle: "O que eu fiz?",
            title: "Portfólio",
            cards: [
                {
                    title: "Soluções em Blockchain",
                    subtitle: "Categoria: Sistema Blockchain"
                },
                {
                    title: "Reconhecimento Avançado de Movimentos",
                    subtitle: "Categoria: Visão Computacional com Python"
                },
                {
                    title: "Rede Social para Dubladores",
                    subtitle: "Categoria: Plataforma de Comunidade (Laravel)"
                },
                {
                    title: "Frontend do DubFlow",
                    subtitle: "Categoria: Front-End (Next.js, TypeScript)"
                },
                {
                    title: "Sistema de Organização Empresarial",
                    subtitle: "Categoria: Plataforma de Fluxo Empresarial"
                },
                {
                    title: "Integração CI/CD Risklog",
                    subtitle: "Categoria: Resumos e Relatórios de Produção"
                },
                {
                    title: "Painel Admin do Risklog",
                    subtitle: "Categoria: Dashboard Administrativo (Laravel)"
                },
                {
                    title: "Sistema Bancário Completo",
                    subtitle: "Categoria: Plataforma Fintech"
                },
                {
                    title: "Agente Linux com Mistral AI",
                    subtitle: "Categoria: IA Integrada ao Terminal Linux"
                }
            ]
        },
        cta: {
            title: "Vamos gerar resultado juntos?",
            text: "Se você busca ownership, qualidade e entrega rápida, vamos conversar sobre o próximo passo do seu produto.",
            button: "Quero conversar"
        },
        footer: {
            copyright: "Direitos autorais"
        }
    };

    const $headerUp = $(".header-title .up");
    const $headerDown = $(".header-title .down");
    const $headerSubtitle = $(".header-subtitle");
    const $timeline = $("#career-timeline");
    const $timelineToggle = $("#timeline-toggle");

    let currentLanguage = getStoredValue(LANGUAGE_KEY, DEFAULT_LANGUAGE);
    if (currentLanguage !== "pt") {
        currentLanguage = "en";
    }

    let introAnimationPlayed = getStoredValue(INTRO_ANIMATION_KEY, "false") === "true";
    let introAnimationRunning = false;
    let typingIntervals = [];
    let timelineExpanded = false;

    const baseContent = captureBaseContent();

    if (introAnimationPlayed) {
        unlockPage();
    } else {
        lockPage();
    }

    applyLanguage(currentLanguage, {
        withTransition: false,
        skipHeaderTyping: !introAnimationPlayed
    });
    applyTimelineVisibility();

    if (!introAnimationPlayed) {
        runIntroAnimation(currentLanguage);
    }

    function getStoredValue(key, fallback) {
        try {
            const value = window.localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function setStoredValue(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            // ignore storage write errors
        }
    }

    function getMetaContent(selector) {
        const node = document.querySelector(selector);
        return node ? node.getAttribute("content") || "" : "";
    }

    function setMetaContent(selector, value) {
        const node = document.querySelector(selector);
        if (node) {
            node.setAttribute("content", value);
        }
    }

    function getTexts($elements) {
        return $elements
            .toArray()
            .map(function (element) {
                return $(element).text().trim();
            });
    }

    function setTexts($elements, values) {
        $elements.each(function (index, element) {
            if (typeof values[index] === "string") {
                $(element).text(values[index]);
            }
        });
    }

    function getHtml($elements) {
        return $elements
            .toArray()
            .map(function (element) {
                return $(element).html() || "";
            });
    }

    function setHtml($elements, values) {
        $elements.each(function (index, element) {
            if (typeof values[index] === "string") {
                $(element).html(values[index]);
            }
        });
    }

    function getCards(titleSelector, subtitleSelector) {
        const titles = getTexts($(titleSelector));
        const subtitles = getTexts($(subtitleSelector));
        return titles.map(function (title, index) {
            return {
                title: title,
                subtitle: subtitles[index] || ""
            };
        });
    }

    function setCards(titleSelector, subtitleSelector, cards) {
        $(titleSelector).each(function (index, element) {
            if (cards[index]) {
                $(element).text(cards[index].title);
            }
        });
        $(subtitleSelector).each(function (index, element) {
            if (cards[index]) {
                $(element).text(cards[index].subtitle);
            }
        });
    }

    function getSpecialtyLevelMeta(levelRef) {
        if (typeof levelRef === "string") {
            return SPECIALTY_LEVEL_META.find(function (item) {
                return item.key === levelRef;
            }) || SPECIALTY_LEVEL_META[SPECIALTY_LEVEL_META.length - 1];
        }

        return SPECIALTY_LEVEL_META[levelRef] || SPECIALTY_LEVEL_META[SPECIALTY_LEVEL_META.length - 1];
    }

    function getTechDocUrl(name) {
        return TECH_DOCS[name] || "#";
    }

    function normalizeSpecialtyItem(item) {
        if (typeof item === "string") {
            return {
                label: item,
                url: getTechDocUrl(item),
                icon: "ti-link tech-link-icon"
            };
        }

        if (!item || typeof item !== "object") {
            return {
                label: "",
                url: "#",
                icon: "ti-link tech-link-icon"
            };
        }

        const label = item.label || item.name || item.title || "";

        return {
            label: label,
            url: item.url || getTechDocUrl(label),
            icon: item.icon || "ti-link tech-link-icon"
        };
    }

    function getSpecialtyCards() {
        return $("#specialties .specialty-card")
            .toArray()
            .map(function (card) {
                const $card = $(card);

                return {
                    title: $card.find(".title").first().text().trim(),
                    levels: $card
                        .find(".specialty-level")
                        .toArray()
                        .map(function (level, levelIndex) {
                            const $level = $(level);
                            const meta = getSpecialtyLevelMeta(levelIndex);
                            const labelFromSpan = $level.find(".specialty-level-label span").first().text().trim();
                            const label = labelFromSpan || $level.find(".specialty-level-label").first().text().trim();
                            const icon = $level.find(".specialty-level-label i").first().attr("class") || meta.icon;
                            const key = $level.attr("data-level") || meta.key;

                            return {
                                key: key,
                                icon: icon,
                                label: label,
                                items: $level
                                    .find(".specialty-item")
                                    .toArray()
                                    .map(function (item) {
                                        const $item = $(item);
                                        const $link = $item.find("a").first();

                                        if ($link.length) {
                                            const itemLabel = $link.find(".tech-name").first().text().trim() || $link.text().trim();
                                            const itemIcon = $link.find("i").first().attr("class") || "ti-link tech-link-icon";

                                            return {
                                                label: itemLabel,
                                                url: $link.attr("href") || getTechDocUrl(itemLabel),
                                                icon: itemIcon
                                            };
                                        }

                                        const fallback = $item.text().trim();
                                        return {
                                            label: fallback,
                                            url: getTechDocUrl(fallback),
                                            icon: "ti-link tech-link-icon"
                                        };
                                    })
                            };
                        })
                };
            });
    }

    function setSpecialtyCards(cards) {
        $("#specialties .specialty-card").each(function (index, card) {
            if (!cards[index]) {
                return;
            }

            const $card = $(card);
            $card.find(".title").first().text(cards[index].title || "");

            if (Array.isArray(cards[index].levels)) {
                const $levelsWrap = $card.find(".specialty-levels").first();

                if ($levelsWrap.length) {
                    $levelsWrap.empty();

                    cards[index].levels.forEach(function (level, levelIndex) {
                        const meta = getSpecialtyLevelMeta(level.key || levelIndex);
                        const levelKey = level.key || meta.key;
                        const levelIcon = level.icon || meta.icon;
                        const levelLabel = level.label || "";

                        const $level = $("<div>")
                            .addClass("specialty-level")
                            .attr("data-level", levelKey);

                        const $label = $("<p>")
                            .addClass("specialty-level-label")
                            .appendTo($level);

                        $("<i>")
                            .addClass(levelIcon)
                            .attr("aria-hidden", "true")
                            .appendTo($label);

                        $("<span>")
                            .text(levelLabel)
                            .appendTo($label);

                        const $list = $("<ul>")
                            .addClass("specialty-list")
                            .appendTo($level);

                        if (Array.isArray(level.items)) {
                            level.items.forEach(function (item) {
                                const normalized = normalizeSpecialtyItem(item);

                                if (!normalized.label) {
                                    return;
                                }

                                const finalUrl = normalized.url || getTechDocUrl(normalized.label);
                                const $li = $("<li>").addClass("specialty-item");
                                const $link = $("<a>")
                                    .addClass("specialty-link")
                                    .attr("href", finalUrl);

                                if (finalUrl && finalUrl !== "#") {
                                    $link.attr("target", "_blank");
                                    $link.attr("rel", "noopener noreferrer");
                                }

                                $("<i>")
                                    .addClass(normalized.icon || "ti-link tech-link-icon")
                                    .attr("aria-hidden", "true")
                                    .appendTo($link);

                                $("<span>")
                                    .addClass("tech-name")
                                    .text(normalized.label)
                                    .appendTo($link);

                                $link.appendTo($li);
                                $li.appendTo($list);
                            });
                        }

                        $levelsWrap.append($level);
                    });
                }
            }
        });
    }

    function captureBaseContent() {
        return {
            lang: "en",
            meta: {
                title: document.title,
                description: getMetaContent("meta[name='description']"),
                keywords: getMetaContent("meta[name='keywords']"),
                ogTitle: getMetaContent("meta[property='og:title']"),
                ogDescription: getMetaContent("meta[property='og:description']"),
                twitterTitle: getMetaContent("meta[name='twitter:title']"),
                twitterDescription: getMetaContent("meta[name='twitter:description']")
            },
            header: {
                memberBadge: $(".github-member-text").text().trim(),
            },
            menu: {
                title: $(".menu-header h2").text().trim(),
                placeholder: $(".search-input").attr("placeholder") || "",
                options: getTexts($(".menu-options a"))
            },
            about: {
                subtitle: $("#about .section-subtitle").text().trim(),
                title: $("#about .section-title").text().trim(),
                description: $("#about .about-description").text().trim(),
                downloadCv: $("#about .about-download-cv").text().trim()
            },
            specialties: {
                subtitle: $("#specialties .section-subtitle").text().trim(),
                title: $("#specialties .section-title").text().trim(),
                cards: getSpecialtyCards()
            },
            timeline: {
                subtitle: $("#timeline-section .timeline-section-subtitle").text().trim(),
                title: $("#timeline-section .timeline-section-title").text().trim(),
                titles: getHtml($(".timeline .timeline-item-description > span")),
                descriptions: getHtml($(".timeline .timeline-item-description > p"))
            },
            services: {
                subtitle: $("#services .section-subtitle").text().trim(),
                title: $("#services .section-title").text().trim(),
                cards: getCards("#services .service-card .title", "#services .service-card .subtitle")
            },
            availability: {
                subtitle: $("#availability .section-subtitle").text().trim(),
                title: $("#availability .section-title").text().trim(),
                cards: getCards("#availability .availability-card .title", "#availability .availability-card .subtitle")
            },
            portfolio: {
                subtitle: $("#portfolio .section-subtitle").text().trim(),
                title: $("#portfolio .section-title").text().trim(),
                cards: getCards("#portfolio .portfolio-card-caption h4", "#portfolio .portfolio-card-caption p")
            },
            cta: {
                title: $(".cta-title").text().trim(),
                text: $(".cta-text").text().trim(),
                button: $(".cta-button").text().trim()
            },
            footer: {
                copyright: $(".footer-copyright-label").text().trim()
            }
        };
    }

    function getLanguageContent(language) {
        return language === "pt" ? ptContent : baseContent;
    }

    function getIntroText(language) {
        return language === "pt" ? INTRO_TEXT.pt : INTRO_TEXT.en;
    }

    function updateLanguageToggleState(language) {
        $(".language-option").removeClass("is-active");
        $(".language-option[data-lang='" + language + "']").addClass("is-active");
        $("#language-toggle").attr("data-active", language);
        const buttonLabel = language === "en" ? "Switch to Portuguese" : "Mudar para inglês";
        $("#language-toggle").attr("aria-label", buttonLabel);
    }

    function getTimelineToggleText(language) {
        return language === "pt" ? TIMELINE_TOGGLE_TEXT.pt : TIMELINE_TOGGLE_TEXT.en;
    }

    function updateTimelineToggleText(language) {
        if (!$timelineToggle.length) {
            return;
        }

        const labels = getTimelineToggleText(language);
        $timelineToggle.text(timelineExpanded ? labels.collapse : labels.expand);
        $timelineToggle.attr("aria-expanded", timelineExpanded ? "true" : "false");
    }

    function applyTimelineVisibility() {
        if (!$timeline.length) {
            return;
        }

        $timeline.toggleClass("is-collapsed", !timelineExpanded);
        updateTimelineToggleText(currentLanguage);
    }

    function renderHeaderText(language) {
        const intro = getIntroText(language);
        $headerUp.text(intro.up);
        $headerDown.text(intro.down);
        $headerSubtitle.text(intro.subtitle);
    }

    function clearTypingEffects() {
        typingIntervals.forEach(function (id) {
            window.clearInterval(id);
        });
        typingIntervals = [];
    }

    function typeEffect($element, text, callback) {
        let currentLength = 0;
        const intervalId = window.setInterval(function () {
            currentLength += 1;
            $element.text(text.substring(0, currentLength));

            if (currentLength >= text.length) {
                window.clearInterval(intervalId);
                if (typeof callback === "function") {
                    callback();
                }
            }
        }, 50);

        typingIntervals.push(intervalId);
    }

    function lockPage() {
        $("body").css("overflow-y", "hidden");
    }

    function unlockPage() {
        $("body").css("overflow-y", "auto");
    }

    function completeIntroAnimation() {
        introAnimationRunning = false;
        introAnimationPlayed = true;
        setStoredValue(INTRO_ANIMATION_KEY, "true");
        $("body").css("overflow-y", "auto");
    }

    function cancelIntroAnimation() {
        clearTypingEffects();
        introAnimationRunning = false;
        introAnimationPlayed = true;
        setStoredValue(INTRO_ANIMATION_KEY, "true");
        unlockPage();
    }

    function runIntroAnimation(language) {
        const intro = getIntroText(language);
        clearTypingEffects();
        introAnimationRunning = true;

        $headerUp.text("");
        $headerDown.text("");
        $headerSubtitle.text("");

        $("html, body").stop(true).animate({ scrollTop: 0 }, 1000);

        typeEffect($headerUp, intro.up, function () {
            typeEffect($headerDown, intro.down, function () {
                typeEffect($headerSubtitle, intro.subtitle, function () {
                    completeIntroAnimation();
                });
            });
        });
    }


    function applyLanguage(language, options) {
        const config = options || {};
        const withTransition = Boolean(config.withTransition);
        const skipHeaderTyping = Boolean(config.skipHeaderTyping);

        const applyNow = function () {
            const content = getLanguageContent(language);
            currentLanguage = language;

            document.documentElement.lang = content.lang;
            document.title = content.meta.title;
            setMetaContent("meta[name='description']", content.meta.description);
            setMetaContent("meta[name='keywords']", content.meta.keywords);
            setMetaContent("meta[property='og:title']", content.meta.ogTitle);
            setMetaContent("meta[property='og:description']", content.meta.ogDescription);
            setMetaContent("meta[name='twitter:title']", content.meta.twitterTitle);
            setMetaContent("meta[name='twitter:description']", content.meta.twitterDescription);

            $(".github-member-text").text(content.header.memberBadge);

            $(".menu-header h2").text(content.menu.title);
            $(".search-input").attr("placeholder", content.menu.placeholder);
            setTexts($(".menu-options a"), content.menu.options);

            $("#about .section-subtitle").text(content.about.subtitle);
            $("#about .section-title").text(content.about.title);
            $("#about .about-description").text(content.about.description);
            $("#about .about-download-cv").text(content.about.downloadCv);

            $("#specialties .section-subtitle").text(content.specialties.subtitle);
            $("#specialties .section-title").text(content.specialties.title);
            setSpecialtyCards(content.specialties.cards);

            $("#timeline-section .timeline-section-subtitle").text(content.timeline.subtitle);
            $("#timeline-section .timeline-section-title").text(content.timeline.title);
            setHtml($(".timeline .timeline-item-description > span"), content.timeline.titles);
            setHtml($(".timeline .timeline-item-description > p"), content.timeline.descriptions);

            $("#services .section-subtitle").text(content.services.subtitle);
            $("#services .section-title").text(content.services.title);
            setCards("#services .service-card .title", "#services .service-card .subtitle", content.services.cards);

            $("#availability .section-subtitle").text(content.availability.subtitle);
            $("#availability .section-title").text(content.availability.title);
            setCards("#availability .availability-card .title", "#availability .availability-card .subtitle", content.availability.cards);

            $("#portfolio .section-subtitle").text(content.portfolio.subtitle);
            $("#portfolio .section-title").text(content.portfolio.title);
            setCards("#portfolio .portfolio-card-caption h4", "#portfolio .portfolio-card-caption p", content.portfolio.cards);

            $(".cta-title").text(content.cta.title);
            $(".cta-text").text(content.cta.text);
            $(".cta-button").text(content.cta.button);
            $(".footer-copyright-label").text(content.footer.copyright);

            if (!skipHeaderTyping) {
                renderHeaderText(language);
            }

            updateLanguageToggleState(language);
            updateTimelineToggleText(language);
            setStoredValue(LANGUAGE_KEY, language);

        };

        if (withTransition) {
            window.setTimeout(function () {
                applyNow();
            }, 140);
            return;
        }

        applyNow();
    }

    $("#language-toggle").on("click", function (event) {
        const clickedLang = $(event.target).closest(".language-option").data("lang");
        const nextLanguage = clickedLang || (currentLanguage === "en" ? "pt" : "en");

        if (nextLanguage === currentLanguage) {
            return;
        }

        if (introAnimationRunning) {
            cancelIntroAnimation();
        }

        applyLanguage(nextLanguage, {
            withTransition: true,
            skipHeaderTyping: false
        });
    });

    $timelineToggle.on("click", function () {
        timelineExpanded = !timelineExpanded;
        applyTimelineVisibility();
    });

    window.closeMenu = function () {
        $(".menu-context-atalho").hide();
    };
});




