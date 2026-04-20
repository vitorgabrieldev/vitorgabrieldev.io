# vitorgabriel.dev

Full stack engineer building systems that stay honest under load.

**Live at**: [vitorgabriel.dev](https://vitorgabriel.dev)

---

## 🏆 Unlocked Achievements

🔓 **Polyglot** — 2 languages, 1 codebase (PT/BR + EN with dynamic switching)

🔓 **No Dependencies** — Vanilla HTML/CSS/JS (zero npm packages)

🔓 **Case Study Speedrun** — 8 projects, 3 featured, all with code examples

🔓 **i18n Architect** — 200+ translation keys, event-driven re-renders

🔓 **Terminal Hacker** — Hero section styled as bash with clickable commands

🔓 **Code Example Collector** — 4 journal articles with SQL, PHP, TypeScript snippets

🔓 **Hand-built** — No templates, no generators, every line intentional

---

## 💻 Self-rated Skills

```
Laravel:              ████████░░ 80%
DevOps:               ████████░░ 79%
System Design:        ███████░░░ 70%
Not overthinking:     ██░░░░░░░░ 15%
Coffee consumed:      ██████████ 100%
Procrastination:      ██████████ 1000%
```

---

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom design tokens, CSS variables
- **i18n**: Custom system (`window.t()`, `window.td()`)
- **Data**: Single source of truth (`data.js`)
- **Architecture**: Event-driven rendering on language change
- **Deployment**: Static hosting (no build step)

---

## 📂 Structure

```
vitorgabrieldev.io/
├── index.html              # Home
├── about.html              # Background & experience
├── projects.html           # Work showcase
├── project.html            # Case studies
├── journal.html            # Technical writing
├── contact.html            # Get in touch
├── shared/
│   ├── data.js             # Projects, timeline, journal, skills
│   ├── i18n.js             # Translation system (200+ keys)
│   ├── nav.js              # Navigation & global interactions
│   ├── footer.js           # Footer (re-renders on langchange)
│   └── tokens.css          # Design system
└── *.js                    # Page-specific logic
```

---

## 📝 Adding Content

### New project:
1. Add to `shared/data.js` `projects` array
2. Add translations to `shared/i18n.js`
3. Add case study copy to `project.js` (with code examples!)
4. Site rebuilds instantly

### New journal article:
1. Add to `shared/data.js` `journal` array
2. Add translations to `shared/i18n.js`
3. View renders automatically on journal.html

### New language:
1. Add language code to `i18n.js` (e.g., `'es'`)
2. Fill in all translation pairs
3. Update language toggle in nav.js

---

## 🎨 Features

✅ Full bilingual with dynamic language switching  
✅ Case studies with technical code examples  
✅ Terminal-style hero console with clickable links  
✅ Responsive design with custom cursor  
✅ Journal with modal articles and filtering  
✅ Project grid/list/gallery view modes  
✅ Smooth page transitions  
✅ Zero external dependencies  

---

## 🚀 Running Locally

```bash
# No build step needed — just serve the files
python3 -m http.server 5500
# or
npx serve
# or
open index.html in browser
```

Navigate to `http://localhost:5500`

---

## 📊 By the Numbers

- **8** featured projects
- **4** journal articles with code
- **2** languages, **1** codebase
- **200+** translation keys
- **0** npm packages
- **0** frameworks
- **100%** hand-coded

---

## 🔗 Links

- 🌐 [Live Site](https://vitorgabriel.dev)
- 📚 [Work/Projects](https://vitorgabriel.dev/projects.html)
- 📖 [Journal/Writing](https://vitorgabriel.dev/journal.html)
- 👤 [About](https://vitorgabriel.dev/about.html)
- 📧 [Contact](https://vitorgabriel.dev/contact.html)
- 📄 [CV](CV.pdf)

---

## 💡 Design Philosophy

- **Systems over features** — Architecture decisions that compound
- **Honest about what I do** — No fluff, no marketing speak
- **Code speaks louder** — Technical depth in case studies
- **Bilingual from day one** — Not an afterthought
- **Boring is beautiful** — Vanilla JS, no magic, every line clear

---

## 📧 Get in Touch

Currently available for:
- Full-time (CLT)
- Project-based (PJ)
- Strategic freelance

**Response time**: < 24h on weekdays

👉 [Start a conversation](https://vitorgabriel.dev/contact.html)

---

**© 2026 Vitor Gabriel de Oliveira** — Hand-built, no templates.
