# Ideias — ferramentas úteis para devs

Lista de ferramentas tipo "caixa de utilitários" (geradores, formatadores, validadores) que todo dev usa em algum momento. Cada item tem uma nota técnica de como implementar, caso vire um projeto (ex: um site de utilitários, ou uma seção nova do portfólio).

Maioria dá pra fazer **100% client-side** (JS puro, sem backend), o que combina com a filosofia do repo (vanilla, sem framework pesado, sem build step desnecessário).

---

## 1. Geradores de dados fake/teste

### 1. Gerador de CPF/CNPJ válidos
Não existe "banco de CPFs" — o número é gerado e os 2 dígitos verificadores são calculados via **módulo 11**:
1. Gera os 9 (CPF) ou 12 (CNPJ) primeiros dígitos aleatoriamente.
2. Multiplica cada dígito por um peso decrescente (10,9,8...2 para o 1º DV; 11,10,9...2 para o 2º), soma tudo.
3. `resto = soma % 11`; se `resto < 2` o dígito é `0`, senão é `11 - resto`.
4. Repete o processo incluindo o 1º DV já calculado para achar o 2º.
Pra CNPJ o cálculo é igual, só muda a sequência de pesos (que inclui os dígitos fixos `0001` da filial). Tudo client-side, função pura sem dependência externa.

### 2. Gerador de RG
Sem algoritmo oficial nacional (cada estado emite do seu jeito) — normalmente é só formatação de dígitos aleatórios no padrão `XX.XXX.XXX-X`, com o último dígito calculado por módulo 11 simplificado (convenção comum, não uma regra federal).

### 3. Gerador de telefone/celular
Sorteia um DDD válido de uma lista estática (11 a 99, só os que existem — tabela da Anatel) + gera o número seguindo o padrão `9XXXX-XXXX` pra celular ou `XXXX-XXXX` pra fixo. É só uma tabela JSON de DDDs + concatenação, não tem "validação" real possível sem uma API de operadora.

### 4. Gerador de CEP e endereço fake
CEP fake não tem estrutura verificável (não é módulo 11 nem nada) — ou sorteia dentro de faixas conhecidas por estado (ex: SP começa em `01xxx-xxxx`), ou usa a **API pública do ViaCEP** (`viacep.com.br/ws/{cep}/json/`) pra puxar endereço real a partir de um CEP existente. Endereço "fake" de verdade normalmente é fixture: uma lista de logradouros/bairros por cidade e sorteio entre eles.

### 5. Gerador de e-mail temporário/descartável
> **Decisão: fora de escopo.** A versão funcional (recebe e-mail de verdade) exige domínio + MX + servidor SMTP — infraestrutura de mensageria, não uma feature de site de utilitários. Só entra a versão **client-side fake**: concatena nome aleatório + domínio de mentira (`@example.com`), não recebe nada de verdade.

### 6. Gerador de nomes e dados de pessoa fictícia (tipo Faker)
Combinação de listas estáticas (nomes, sobrenomes, profissões, empresas) sorteadas e combinadas. Bibliotecas como `@faker-js/faker` já fazem isso pronto — reimplementar do zero é só ter os arrays de dados em pt-BR (a lib já tem locale `pt_BR`).

### 7. Gerador de cartão de crédito para teste
Números de teste (não reais) que passam no **algoritmo de Luhn**, usado pra validar cartões:
1. A partir da direita, dobra cada dígito em posição par.
2. Se o dobro passar de 9, subtrai 9.
3. Soma tudo; o número é válido se a soma for múltiplo de 10.
Pra gerar: monta o prefixo da bandeira (ex: Visa começa com `4`), preenche os dígitos do meio aleatoriamente e calcula o último dígito de forma a fechar a soma em múltiplo de 10. Isso é exatamente o que Stripe/PayPal usam como "cartões de teste" em sandbox.

### 8. Gerador de PIS/PASEP
Mesma lógica de módulo 11 do CPF, só muda a tabela de pesos (`3,2,9,8,7,6,5,4,3,2`).

### 9. Gerador de placas de carro (Mercosul e antiga)
Antiga: `LLL-NNNN` (3 letras + 4 números). Mercosul: `LLL NLNN` (letra-número-letra-número intercalado). É só sorteio dentro do padrão de caracteres, sem dígito verificador.

### 10. Gerador de Lorem Ipsum
Trivial: array com o texto latino "canônico" fatiado em palavras, sorteando um recorte de N palavras/parágrafos. Variante "corporate ipsum" ou "hipster ipsum" é só trocar o array de palavras-base.

### 11. Gerador de UUID/GUID
`crypto.randomUUID()` já existe nativo no browser e no Node (sem precisar de lib). Se quiser implementar na mão, é o padrão UUID v4: 128 bits aleatórios com 4 bits fixos indicando a versão e 2 bits fixos indicando a variante, formatados em `8-4-4-4-12` hex.

### 12. Gerador de senha aleatória segura
Usa `crypto.getRandomValues()` (nunca `Math.random()`, que não é criptograficamente seguro) pra sortear índices de um alfabeto configurável (minúsculas/maiúsculas/números/símbolos), com opção de garantir pelo menos 1 caractere de cada categoria.

### 13. Gerador de dados JSON mockados (mock API)
Duas partes: (a) um "schema" simples definido pelo usuário (nome do campo + tipo: nome, email, número, data) e (b) um gerador que percorre esse schema e produz N objetos JSON usando os mesmos geradores dos itens acima. Pode servir só o JSON estático, ou (se quiser ir além) subir um endpoint fake tipo `json-server`.

---

## 2. Formatação e validação

### 14. Formatador/validador de JSON
`JSON.parse()` + `JSON.stringify(obj, null, 2)` fazem 90% do trabalho. A parte de "validador com mensagem de erro amigável" exige parsear o erro nativo (`SyntaxError` do V8 já diz posição/linha) ou escrever um parser próprio pra apontar exatamente onde quebrou.

### 15. Formatador/beautifier de CSS, JS, HTML
Client-side dá pra usar o **Prettier standalone** (`prettier/standalone` + plugins de parser), que roda inteiro no browser via WASM/JS, sem precisar de backend.

### 16. Validador e testador de Regex (com explicação)
O motor de regex é o nativo do JS (`RegExp`), o desafio real é a **explicação** — que exige parsear a regex em uma AST (lib tipo `regexp-tree` ou `regexpp`) e traduzir cada token pra texto legível.

### 17. Conversor JSON ↔ XML ↔ YAML ↔ CSV
JSON→JS é nativo. Os outros formatos precisam de parser/serializer específico: YAML (`js-yaml`), XML (`fast-xml-parser` ou `DOMParser` nativo do browser pra ler), CSV (parse manual por vírgula/aspas ou lib `papaparse`).

### 18. Validador de e-mail
Regex cobre sintaxe (RFC 5322 simplificado) — isso fica no escopo. **Fora de escopo:** checar se o domínio existe/aceita e-mail via registro **MX**, porque isso exige uma query DNS, que o browser não expõe (precisaria de backend).

### 19. Validador/formatador de CPF/CNPJ
Inverso do gerador (item 1): recalcula os dígitos verificadores a partir dos 9/12 primeiros e compara com os informados.

### 20. Minificador de JS/CSS/HTML
Remove espaços/comentários/quebras de linha preservando semântica. Pra JS de verdade (sem quebrar código) precisa de um parser AST real (Terser/esbuild rodando via WASM no browser); pra CSS/HTML dá pra fazer com regex mais simples porque a gramática é mais previsível.

---

## 3. Codificação/criptografia

### 21. Base64 encode/decode
Nativo: `btoa()`/`atob()` no browser (cuidado com UTF-8 — precisa de `encodeURIComponent` no meio pra não quebrar acentos).

### 22. URL encode/decode
Nativo: `encodeURIComponent()` / `decodeURIComponent()`.

### 23. JWT decoder/debugger
Um JWT é 3 partes em Base64URL separadas por ponto (`header.payload.signature`). Decodificar header/payload é só Base64URL-decode + `JSON.parse` — dá pra fazer 100% no client sem nunca expor a secret. **Validar a assinatura** exige a secret/chave pública e o algoritmo (HMAC-SHA256, RSA, etc.) via Web Crypto API.

### 24. Gerador de hash (MD5, SHA-1, SHA-256, bcrypt)
SHA-1/SHA-256 são nativos via `crypto.subtle.digest()` (Web Crypto API). MD5 não é nativo (obsoleto/inseguro), precisa de lib JS (`crypto-js` ou similar). Bcrypt é um algoritmo com **salt e custo configurável**, propositalmente lento — não dá pra fazer com Web Crypto, precisa de lib dedicada (`bcryptjs`) e normalmente roda no servidor, não no client.

### 25. Gerador de HMAC
`crypto.subtle.sign("HMAC", key, data)` da Web Crypto API — nativo.

### 26. Codificador/decodificador de Unicode/HTML entities
HTML entities: mapa de tabela (`&amp;` ↔ `&`, etc.) ou truque de renderizar num elemento DOM temporário (`textContent` → `innerHTML`) pra deixar o browser fazer o encode. Unicode escape (`\uXXXX`) é conversão char code point ↔ hex.

---

## 4. Cor e design

### 27. Color picker / conversor HEX ↔ RGB ↔ HSL
Conversão matemática direta entre espaços de cor (fórmulas conhecidas, sem lib necessária). Input nativo `<input type="color">` já dá um picker visual de graça no browser.

### 28. Gerador de paleta de cores
Gera cores harmônicas a partir de uma base, usando relações no círculo cromático em HSL (complementar = +180° no hue, análoga = ±30°, triádica = ±120°, etc.).

### 29. Gerador de gradientes CSS
Interface visual monta a string `linear-gradient(...)`/`radial-gradient(...)` a partir de color stops escolhidos pelo usuário — é só state + template string, sem cálculo complexo.

### 30. Contraste de cores (acessibilidade WCAG)
Fórmula oficial do WCAG 2.1: calcula **luminância relativa** de cada cor (com correção gamma) e depois a razão de contraste entre as duas. Compara o resultado com os thresholds oficiais (4.5:1 pra texto normal AA, 3:1 pra texto grande, 7:1 pra AAA).

### 31. Gerador de sombras (box-shadow) CSS
Como o gradiente: monta a string CSS a partir de sliders (x, y, blur, spread, cor, opacidade), com preview ao vivo.

---

## 5. Imagens e mídia

### 32. Compressor/otimizador de imagens
No client dá pra usar `<canvas>`: desenha a imagem, reexporta via `canvas.toBlob()` com qualidade reduzida (funciona bem pra JPEG/WebP, que suportam compressão lossy). Pra otimização "de verdade" (tipo o que o Squoosh faz) usa **WASM** dos encoders reais (mozjpeg, libwebp) rodando no browser.

### 33. Conversor de formato de imagem (PNG, WebP, AVIF)
Mesma base do item 32: `canvas.toBlob(callback, mimeType)` já suporta trocar o formato de saída nativamente no browser, sem upload pra servidor.

### 34. Gerador de placeholder de imagem (tipo placehold.co)
SVG gerado dinamicamente (retângulo colorido + texto com as dimensões) e servido como `data:image/svg+xml` — não precisa nem de canvas, é só template string de SVG.

### 35. Gerador de favicon
A partir de uma imagem/texto, desenha em `<canvas>` nos tamanhos padrão (16, 32, 48, 180, 192, 512px) e exporta cada um; o `.ico` multi-resolução exige empacotar vários PNGs num único arquivo (formato ICO tem um header binário específico — geralmente usa lib tipo `to-ico`).

### 36. Gerador de QR Code
Algoritmo de QR Code é bem específico (correção de erro Reed-Solomon, matriz de módulos) — na prática quase ninguém reimplementa do zero, usa lib madura (`qrcode` no JS) que já expõe API simples pra gerar como canvas/SVG/PNG.

---

## 6. Texto e strings

### 37. Contador de caracteres/palavras
Trivial: `string.length` + `string.trim().split(/\s+/).length`. O detalhe fino é normalizar espaços múltiplos e não contar string vazia como 1 palavra.

### 38. Conversor de case (camelCase, snake_case, kebab-case, PascalCase)
Passo comum: primeiro quebra a string em "palavras" (por espaço, `_`, `-`, ou transição minúscula→maiúscula via regex), depois remonta no formato alvo juntando com o separador/capitalização certos.

### 39. Diff de texto (comparar dois textos/arquivos)
Algoritmo clássico de **LCS (longest common subsequence)** ou o algoritmo de Myers (o que o `git diff` usa por baixo) — lib pronta `diff` (npm) já implementa e retorna as partes adicionadas/removidas/iguais pra renderizar colorido.

### 40. Slugify (gerar slugs de URL)
Normaliza acentos (`"é".normalize("NFD").replace(/[̀-ͯ]/g, "")` remove os diacríticos), baixa pra minúsculo, troca espaços/caracteres especiais por hífen.

### 41. Gerador de Markdown table
Recebe dados tabulares (colar de Excel/CSV) e formata como tabela Markdown (`| col | col |` + linha separadora), calculando a largura de cada coluna pra alinhar visualmente.

---

## 7. Datas e tempo

### 42. Conversor de timestamp Unix ↔ data legível
Nativo: `new Date(timestamp * 1000)` e `date.getTime() / 1000` — sem lib.

### 43. Calculadora de diferença entre datas
Subtração de objetos `Date` (retorna milissegundos) dividida pelos fatores certos (1000 × 60 × 60 × 24 pra dias, etc.). O detalhe chato é lidar com fuso horário e horário de verão — por isso libs tipo `date-fns` ou `dayjs` ajudam a não errar edge case.

### 44. Cron expression builder/parser
Precisa de um parser da gramática cron (5 ou 6 campos: minuto, hora, dia do mês, mês, dia da semana) que traduz pra "próximas execuções" calculando incrementalmente a partir de "agora". Lib pronta: `cron-parser`.

---

## 8. Redes e API

### 45. Testador de API tipo Postman/Insomnia
No browser, `fetch()` já faz requisições — a limitação é **CORS**: o browser bloqueia se o servidor de destino não permitir a origem do testador. Ferramentas desktop (Postman/Insomnia) não têm esse problema porque não rodam num contexto de browser.

### 46. Verificador de status de site (uptime checker)
> **Decisão: fora de escopo.** A versão útil (histórico de uptime, checagem sem a aba aberta) exige cron + banco persistindo o histórico. Um "check único" via `fetch` no momento do clique até daria no client, mas esbarra em CORS na maioria dos sites-alvo — valor baixo pro esforço, não entra.

### 47. Lookup de DNS/WHOIS
> **Decisão: fora de escopo.** DNS e WHOIS são protocolos que o browser não expõe via JS — exigiria sempre um backend fazendo a consulta.

### 48. Testador de CORS
Faz um `fetch` pra uma URL informada e mostra se deu erro de CORS e por quê — na prática só reflete o comportamento do próprio browser, então é mais uma ferramenta educativa (explica os headers `Access-Control-Allow-*`) do que uma "checagem" independente.

### 49. Gerador/validador de .htaccess
Basicamente templates de regras comuns (redirect, force HTTPS, cache headers) preenchidos por formulário — o "validador" exigiria simular o parser do Apache, o que é complexo; mais realista é validar só a sintaxe básica das diretivas.

### 50. Testador de webhook (request bin)
> **Decisão: fora de escopo.** Exige backend com URL pública recebendo requisição, storage e atualização em tempo real na tela — o objetivo do item é *receber* de fora, então não existe versão client-only.

---

## 9. Utilidades de código

### 51. Gerador de .gitignore por linguagem/framework
Puxa de templates prontos — o próprio GitHub mantém um repositório (`github/gitignore`) e expõe via API (`gitignore.io` é um serviço público que já faz exatamente isso combinando templates).

### 52. Gerador de licença open source (MIT, GPL etc.)
Template de texto com poucos placeholders (ano, nome do autor) — trivial, sem lógica de negócio.

### 53. Regex prontas pra CPF/CNPJ/telefone
Não são geradores, são só uma "biblioteca de referência" de padrões testados — o valor está em documentar bem os edge cases (com/sem máscara, por exemplo).

### 54. Conversor de cURL ↔ código (fetch, axios, requests)
Parseia a string do `curl` (flags `-X`, `-H`, `-d`, URL) numa estrutura de request, depois serializa essa estrutura no template da linguagem/lib alvo. Lib de referência: o que o Postman usa internamente pra import/export de cURL.

### 55. Gerador de README template
Formulário com campos comuns (nome do projeto, descrição, instalação, uso, licença) que monta um Markdown final juntando os blocos preenchidos.

---

## Notas gerais de arquitetura

- **Decisão (22/09/2026): escopo fechado em 100% client-side.** Os itens que exigiam backend por barreira técnica real (browser não fala DNS/SMTP diretamente, ou o objetivo é receber requisição de fora) ficam de fora do projeto: e-mail temporário funcional (5), validação de e-mail por MX (18), uptime checker persistente (46), lookup DNS/WHOIS (47), request bin (50). Só entram as versões client-side desses itens onde fizer sentido (ex: e-mail fake sem receber de verdade, validação de e-mail só por sintaxe).
- **Todo o resto da lista é 100% client-side** — sem servidor, sem banco, só JS rodando no browser. Combina com o approach vanilla do repo atual (sem build step).
- Se a ideia for transformar isso num projeto novo (site de utilitários) ao invés de uma seção do portfólio atual, faz sentido ser um repo separado — o [roadmap.md](roadmap.md) deste projeto já está com outro foco (guestbook via Supabase).
