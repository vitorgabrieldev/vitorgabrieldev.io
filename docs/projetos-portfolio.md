# Projetos para o portfólio

> Conteúdo pronto pra portfólio: título, descrição curta, descrição completa (storytelling), stack e desafios técnicos de cada projeto. Combina dados públicos do GitHub (linguagens, estrutura, README) com contexto que só o Vitor tinha — papel real em cada projeto, motivação, resultados e bastidores.

## Índice

1. [Pett-Love](#1-pett-love--gabarito-de-desafio-técnico-e-benchmark-pessoal-de-frontend)
2. [Trabalho Amigo](#2-trabalho-amigo--marketplace-de-serviços-tcc-nota-máxima)
3. [CyberSec Lab](#3-cybersec-lab--simulador-de-investigação-de-incidentes)
4. [DubFlow](#4-dubflow--plataforma-para-comunidades-de-dublagem)
5. [MiliTrak (SGITG)](#5-militrak-sgitg--sistema-de-gestão-para-tiro-de-guerra-em-produção-real)
6. [Constria](#6-constria--inteligência-operacional-para-construção-civil)

---

## 1. Pett-Love — Gabarito de desafio técnico e benchmark pessoal de frontend

**Repositório:** https://github.com/vitorgabrieldev/Pett-Love
**Deploy:** https://pett-love-six.vercel.app

**Descrição breve**
Landing page desenvolvida como gabarito de referência para o desafio técnico de entrada na Clickweb — e, mais tarde, recriada pelo próprio Vitor como exercício pessoal para testar seu nível atual de desenvolvimento front-end.

**Descrição completa**
Este projeto nasceu como o gabarito de referência usado pela Clickweb para avaliar candidatos a vaga de desenvolvedor front-end. Depois de entrar na empresa, Vitor decidiu recriar o desafio por conta própria — não para ser avaliado, mas para medir seu próprio nível de desenvolvimento front-end frente ao Figma original. Seguindo o prazo curto do desafio, ele entregou mais páginas e mais funcionalidades do que o escopo pedia, deliberadamente: é exatamente o tipo de proatividade que ele espera encontrar em um desenvolvedor pleno. O foco não foi só "bater o Figma pixel a pixel", mas qualidade de código e noção de UX dentro das limitações de um layout fixo — com atenção especial a acessibilidade e animações, os dois pontos que mais evidenciam a diferença entre um front-end funcional e um front-end bem executado.

**Stack**
- React 19 + TypeScript + Vite 7 (SWC)
- Tailwind CSS 4, `class-variance-authority`, `tailwind-merge`
- React Router DOM, React Helmet Async (SEO)
- Motion (Framer Motion) para animações
- Biome para lint/format
- Fontsource (Fredoka, Manrope, Space Grotesk)

**Desafios**
- Entregar além do escopo pedido, sem perder qualidade, dentro de um prazo curto
- Acessibilidade dentro de um layout com liberdade limitada
- Animações que agregam UX sem comprometer performance

---

## 2. Trabalho Amigo — Marketplace de serviços (TCC nota máxima)

**Repositório:** https://github.com/vitorgabrieldev/trabalhoamigo.com.br

**Descrição breve**
Plataforma de marketplace de serviços que conecta clientes a prestadores avaliados, desenvolvida como TCC do curso técnico do Colégio Marista — nota máxima na banca — e depois reescrita solo, do zero, em Laravel + Next.js.

**Descrição completa**
O Trabalho Amigo foi o Trabalho de Conclusão de Curso da turma de Vitor no curso técnico do Colégio Marista (3º ano do ensino médio técnico), desenvolvido em equipe com divisão de funções entre os integrantes e foco em performance. A proposta: uma plataforma que conecta pessoas que precisam de um serviço a profissionais que podem prestá-lo, com sistema de avaliação para garantir contratações mais seguras — pensada nos moldes de marketplaces como o GetNinjas. A primeira versão (v1), em PHP puro com MySQL, foi apresentada à banca e recebeu **nota máxima e excelentes feedbacks**, com recomendações pontuais de evolução.

Depois da entrega, por desafio pessoal e vontade de aprofundar o aprendizado, Vitor decidiu reescrever o projeto sozinho: a v2 recria o mesmo domínio de negócio com uma arquitetura bem mais robusta — backend em Laravel e frontend separado em Next.js/TypeScript. A reescrita está pausada no momento, mas é um projeto que ele pretende retomar futuramente para aprendizado e para finalizar essa segunda versão.

**Stack**
- **v1 (equipe, TCC original):** PHP vanilla + MySQL + Apache + Docker
- **v2 (reescrita solo):** Laravel (backend) + Next.js/TypeScript (frontend)

**Desafios**
- Trabalho em equipe com divisão clara de funções e foco em performance (v1)
- Reescrever sozinho, do zero, um sistema completo já validado, aplicando uma stack mais profissional (v2)
- Modelagem de um marketplace com avaliação de prestadores e matching cliente↔profissional

**Resultados**
- Nota máxima na banca avaliadora do TCC, com elogios explícitos

---

## 3. CyberSec Lab — Simulador de investigação de incidentes

**Repositório:** https://github.com/vitorgabrieldev/cyber-security-challenge
**Deploy:** https://cyber-security-challenge-alpha.vercel.app

**Descrição breve**
Desafio interativo que recria um desktop Kali Linux inteiro no navegador — com terminal SSH simulado, arquivos e pistas — onde o jogador investiga um servidor comprometido e precisa identificar o tipo de ataque sofrido.

**Descrição completa**
Criado como estudo pessoal de segurança da informação e como forma de ajudar outras pessoas a entrarem na área, o CyberSec Lab simula, inteiramente em JavaScript puro, uma área de trabalho estilo Kali Linux: painel superior, lançador de aplicativos, gerenciador de arquivos, notas e um terminal com uma vasta gama de comandos de CLI SSH implementados do zero. O cenário do desafio: o servidor sofre uma sequência de efeitos que indicam comprometimento (uso de RAM anormal, entre outros sintomas), e o jogador precisa investigar o ambiente, coletar IOCs (indicadores de comprometimento), resolver o problema e, ao final, apontar qual foi o tipo de ataque sofrido — só então descobrindo se acertou o diagnóstico.

**Stack**
- JavaScript, CSS e HTML puros (sem framework)
- Terminal SSH simulado via JS, com sistema de arquivos e comandos próprios
- Font Awesome via CDN

**Desafios**
- Implementar uma CLI SSH funcional e crível só em JavaScript (parsing de comandos, sistema de arquivos simulado)
- Recriar uma interface de desktop completa (janelas, painel, ícones) sem nenhum framework
- Desenhar um cenário de investigação coerente, com pistas suficientes para o jogador chegar ao diagnóstico correto

---

## 4. DubFlow — Plataforma para comunidades de dublagem

**Repositório:** https://github.com/vitorgabrieldev/dubflow.pro.br

**Descrição breve**
Produto pessoal pensado para virar SaaS: uma plataforma onde comunidades de dublagem publicam trabalhos, organizam portfólios e colaboram em lançamentos — chegou a rodar com dezenas de usuários reais antes de ser pausado por falta de tempo.

**Descrição completa**
O DubFlow começou como projeto de aprendizado solo, mas rapidamente ganhou ambição de produto: a ideia era evoluir para um SaaS completo voltado a comunidades de dublagem, permitindo que elas tenham identidade própria, organizem playlists por obra/temporada/episódio, publiquem áudio e vídeo, atribuam créditos por personagem e dublador, colaborem com um fluxo de aceite antes de publicar, e interajam socialmente (seguidores, curtidas, comentários) — tudo com atualizações em tempo real. Vitor chegou a colocar o produto no ar sozinho e validar a ideia na prática: a plataforma teve algumas dezenas de usuários reais usando as funcionalidades. A falta de tempo para sustentar o ritmo de desenvolvimento e operação, porém, fez o projeto ser pausado — hoje não está mais no ar.

**Stack**
- **Backend:** Laravel 12, Laravel Reverb (WebSockets/tempo real), JWT Auth
- **Frontend:** Next.js 16 + React 19 + TypeScript, Pusher JS, Tailwind CSS 4

**Desafios**
- Escopo grande de funcionalidades para ser sustentado por um desenvolvedor solo
- Arquitetura de tempo real (WebSockets) para notificações e interações ao vivo
- Fluxo editorial de colaboração com aceite antes da publicação

**Resultados**
- Produto validado na prática, com dezenas de usuários reais chegando a usar a plataforma

---

## 5. MiliTrak (SGITG) — Sistema de gestão para Tiro de Guerra, em produção real

**Repositório:** https://github.com/vitorgabrieldev/militrak.com.br
**Deploy:** https://militrak.vercel.app

**Descrição breve**
Sistema que digitaliza toda a operação de um Tiro de Guerra — chamada, escalas, missões, disciplina, avaliação física e documentos oficiais — hoje em uso real por 230 atiradores, rodando inteiramente sobre infraestrutura gratuita.

**Descrição completa**
O MiliTrak nasceu durante o próprio alistamento militar de Vitor no Tiro de Guerra de Londrina. O sargento responsável pela turma propôs a ideia de um sistema simples para organizar o dia a dia — Vitor "comprou a ideia" e foi muito além do que havia sido pedido. Juntos, construíram um sistema completo: chamada diária por turma com login individual e granular via matriz de permissões RBAC (perfis separados para Sargento, Instrutor, Monitor e Atirador, cada um com seu próprio nível de acesso), sistema de missões com gestão de horas complementares por atirador, escala semanal de serviço com gestão de horas, módulo disciplinar, avaliação física (TAF/TAT), gestão de equipamentos e fardamento, relatórios consolidados e geração automática de documentos oficiais como o CTSM e declarações de falta.

Um requisito não-técnico se tornou uma restrição central de arquitetura: a infraestrutura precisava ser 100% gratuita para manter, já que Vitor não necessariamente continuaria sendo quem administra o sistema no ano seguinte — o alistamento é temporário. Na inspeção oficial, o coronel responsável viu o sistema em funcionamento, elogiou o resultado e manifestou o desejo de expandir o uso para todos os Tiros de Guerra, não só o de Londrina — uma evolução em que o projeto continua avançando até hoje. Sargentos e o coronel relatam que o sistema agiliza muito o processo do dia a dia. Hoje, o MiliTrak atende **230 atiradores ativos**.

**Stack**
- Next.js 16 (App Router, Server Actions, Turbopack) + React 19 + TypeScript
- Supabase (Postgres + Auth + RLS + Storage)
- Ant Design 6, Tailwind CSS 4
- Vitest (testes unitários) + Playwright (e2e)

**Desafios**
- Matriz de permissões granular e configurável por perfil e por aba
- Manter todo o sistema escalável e seguro dentro de infraestrutura 100% gratuita (Supabase + Vercel free tier)
- Geração de documentos oficiais (CTSM, declarações) a partir de dados dinâmicos
- Modelar um domínio de negócio específico e regulado por normas militares (ex.: EB10-R-02.010)

**Resultados**
- 230 atiradores ativos usando o sistema
- Elogio formal do coronel responsável na inspeção, com pedido de expansão para outros Tiros de Guerra
- Feedback direto de sargentos e do coronel confirmando ganho real de agilidade operacional

---

## 6. Constria — Inteligência operacional para construção civil

**Backend:** https://github.com/vitorgabrieldev/api.constria.com.br
**Frontend/docs:** https://github.com/vitorgabrieldev/constria.com.br
**Deploy (frontend):** https://constria.vercel.app

**Descrição breve**
SaaS multi-organização que transforma dados dispersos do canteiro de obras em decisões operacionais — ideia nascida de uma experiência profissional anterior de Vitor construindo um sistema de gestão de obras sob medida, agora generalizada como produto próprio, com MVP técnico pronto.

**Descrição completa**
A ideia da Constria nasceu de uma experiência profissional anterior de Vitor, na qual ele desenvolveu um painel de gestão de obras interno, feito sob medida para uma única construtora. Essa vivência deu a ele conhecimento real do fluxo operacional de um canteiro e do vocabulário do setor — e um insight que se tornaria a tese do produto: o mercado já tem sistemas que **registram** dados de obra, mas poucos que realmente **transformam esses dados em decisões inteligentes**. A partir daí, Vitor decidiu generalizar essa ideia como produto próprio: não mais um sistema sob medida para um único cliente, mas um SaaS multi-organização, pensado desde o início para atender várias construtoras — posicionado não como "mais um ERP de construção", mas como uma camada de inteligência operacional sobre a gestão da obra.

Como fundador solo, Vitor já entregou o **MVP técnico**: identidade, sessão, controle de permissões (RBAC por módulo, cargo e obra) e a estrutura de organização multi-tenant estão implementados no backend, com um copiloto de IA planejado — function calling sobre dados operacionais, com camada de segurança via RLS. O produto ainda não foi publicado; está em fase de validação antes do lançamento.

**Stack**
- **Backend:** Laravel 13, PHP 8.4, PostgreSQL, Redis, Laravel Horizon (sem Docker)
- **Frontend:** Next.js, React 19, Ant Design 6, TanStack Query, Tiptap, tipos gerados via OpenAPI

**Desafios**
- Row-Level Security (RLS) para isolar múltiplas organizações com segurança real, não apenas "no papel"
- Modelar uma estrutura de dados robusta para um domínio com grande volume e variedade de informação (obras, diário de obra, cadastros, insights)
- Desenhar a arquitetura de um copiloto de IA com controle de custo e segurança de acesso aos dados

**Resultados**
- MVP técnico finalizado (identidade, sessão, RBAC e organização), ainda não publicado
