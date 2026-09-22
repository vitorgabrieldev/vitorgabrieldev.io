// Procedurally generated SVG illustrations — ported 1:1 from legacy home.js's
// thumbArt(). No project screenshots exist anywhere in the site; this generated
// art is the intentional visual language (kept per migration decision).
export function featuredThumbArt(index: number, accent: string): string {
  const w = 800, h = 600;
  if (index === 0) {
    return `<svg class="thumb-canvas" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
      <rect width="${w}" height="${h}" fill="#ede7db"/>
      ${Array.from({ length: 12 }, (_, r) => `<line x1="0" y1="${50 + r * 46}" x2="${w}" y2="${50 + r * 46}" stroke="rgba(30,26,22,.08)" stroke-width="1"/>`).join("")}
      ${Array.from({ length: 9 }, (_, c) => `<line x1="${80 + c * 90}" y1="0" x2="${80 + c * 90}" y2="${h}" stroke="rgba(30,26,22,.06)" stroke-width="1"/>`).join("")}
      <g font-family="JetBrains Mono, monospace" font-size="14" fill="#5b534a">
        <text x="30" y="70">TXN_001</text><text x="190" y="70">CREDIT</text><text x="380" y="70">+ R$ 1 200,00</text><text x="630" y="70" fill="${accent}">● OK</text>
        <text x="30" y="116">TXN_002</text><text x="190" y="116">DEBIT</text><text x="380" y="116">− R$ 85,50</text><text x="630" y="116" fill="${accent}">● OK</text>
        <text x="30" y="162">TXN_003</text><text x="190" y="162">TRANSFER</text><text x="380" y="162">− R$ 2 000,00</text><text x="630" y="162" fill="${accent}">● OK</text>
        <text x="30" y="208" fill="#1e1a16" font-weight="500">TXN_004</text><text x="190" y="208">CREDIT</text><text x="380" y="208" font-weight="500" fill="#1e1a16">+ R$ 14 800,00</text><text x="630" y="208" fill="${accent}">● OK</text>
        <text x="30" y="254">TXN_005</text><text x="190" y="254">FEE</text><text x="380" y="254">− R$ 3,49</text><text x="630" y="254" fill="${accent}">● OK</text>
        <text x="30" y="300">TXN_006</text><text x="190" y="300">DEBIT</text><text x="380" y="300">− R$ 412,00</text><text x="630" y="300" fill="${accent}">● OK</text>
      </g>
      <rect x="${w - 170}" y="${h - 80}" width="140" height="50" fill="${accent}" rx="4"/>
      <text x="${w - 100}" y="${h - 48}" font-family="JetBrains Mono, monospace" font-size="14" fill="#fff" text-anchor="middle" font-weight="500">DOUBLE-ENTRY</text>
    </svg>`;
  }
  if (index === 1) {
    return `<svg class="thumb-canvas" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
      <rect width="${w}" height="${h}" fill="#ede7db"/>
      <g stroke="rgba(30,26,22,.25)" stroke-width="1.5" fill="none">
        <path d="M60 300 L200 300"/><path d="M260 300 L400 200"/><path d="M260 300 L400 300"/><path d="M260 300 L400 400"/>
        <path d="M460 200 L600 300"/><path d="M460 300 L600 300"/><path d="M460 400 L600 300"/>
        <path d="M660 300 L740 300"/>
      </g>
      <g font-family="JetBrains Mono, monospace" font-size="12">
        <circle cx="230" cy="300" r="30" fill="#fbf8f2" stroke="${accent}" stroke-width="2"/>
        <text x="230" y="304" text-anchor="middle" fill="#1e1a16">BUILD</text>
        <circle cx="430" cy="200" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
        <text x="430" y="204" text-anchor="middle" fill="#5b534a">LINT</text>
        <circle cx="430" cy="300" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
        <text x="430" y="304" text-anchor="middle" fill="#5b534a">TEST</text>
        <circle cx="430" cy="400" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
        <text x="430" y="404" text-anchor="middle" fill="#5b534a">E2E</text>
        <circle cx="630" cy="300" r="30" fill="${accent}" stroke="${accent}" stroke-width="2"/>
        <text x="630" y="304" text-anchor="middle" fill="#fff">RISK</text>
        <circle cx="770" cy="300" r="26" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/>
        <text x="770" y="304" text-anchor="middle" fill="#5b534a">SHIP</text>
      </g>
      <g font-family="JetBrains Mono, monospace" font-size="11" fill="#5b534a">
        <text x="30" y="40">deploy.yml</text>
        <text x="30" y="${h - 40}">risk: LOW · 0 blockers · 3 reviewers</text>
      </g>
    </svg>`;
  }
  if (index === 2) {
    return `<svg class="thumb-canvas" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
      <rect width="${w}" height="${h}" fill="#ede7db"/>
      <g stroke="rgba(30,26,22,.15)" stroke-width="1">
        <line x1="400" y1="300" x2="180" y2="150"/><line x1="400" y1="300" x2="620" y2="140"/>
        <line x1="400" y1="300" x2="120" y2="420"/><line x1="400" y1="300" x2="680" y2="430"/>
        <line x1="400" y1="300" x2="290" y2="500"/><line x1="400" y1="300" x2="540" y2="490"/>
        <line x1="180" y1="150" x2="290" y2="500"/><line x1="620" y1="140" x2="540" y2="490"/>
      </g>
      <g>
        <circle cx="400" cy="300" r="52" fill="${accent}"/>
        <text x="400" y="306" text-anchor="middle" font-family="Inter Tight" font-size="20" fill="#fff" font-weight="500">YOU</text>
        <circle cx="180" cy="150" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
        <circle cx="620" cy="140" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
        <circle cx="120" cy="420" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
        <circle cx="680" cy="430" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
        <circle cx="290" cy="500" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
        <circle cx="540" cy="490" r="28" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
      </g>
      <g font-family="JetBrains Mono, monospace" font-size="11" fill="#5b534a">
        <text x="30" y="40">casting.graph</text>
        <text x="30" y="${h - 40}">1 284 nodes · 3 802 edges · realtime</text>
      </g>
    </svg>`;
  }
  if (index === 3) {
    return `<svg class="thumb-canvas" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
      <rect width="${w}" height="${h}" fill="#ede7db"/>
      <g font-family="JetBrains Mono, monospace" font-size="13">
        <rect x="30" y="40" width="740" height="44" rx="6" fill="#fbf8f2" stroke="rgba(30,26,22,.2)"/>
        <text x="48" y="67" fill="#5b534a">🔍  "eletricista perto de mim"</text>
        <text x="${w - 58}" y="67" fill="${accent}" text-anchor="end">FTS + fuzzy</text>
      </g>
      <g font-family="Inter Tight, sans-serif" font-size="14">
        <rect x="30" y="120" width="230" height="150" rx="8" fill="#fbf8f2" stroke="rgba(30,26,22,.15)"/>
        <circle cx="75" cy="165" r="20" fill="${accent}"/>
        <text x="105" y="160" fill="#1e1a16" font-weight="500">Camila R.</text>
        <text x="105" y="180" fill="#5b534a" font-size="12">Elétrica residencial</text>
        <text x="48" y="230" fill="#5b534a" font-size="12">★ 4.9 · 812 serviços</text>
        <rect x="48" y="245" width="80" height="20" rx="4" fill="${accent}"/>
        <text x="88" y="259" fill="#fff" font-size="11" text-anchor="middle">2FA ✓</text>

        <rect x="285" y="120" width="230" height="150" rx="8" fill="#fbf8f2" stroke="rgba(30,26,22,.15)"/>
        <circle cx="330" cy="165" r="20" fill="rgba(30,26,22,.3)"/>
        <text x="360" y="160" fill="#1e1a16" font-weight="500">Diego M.</text>
        <text x="360" y="180" fill="#5b534a" font-size="12">Design de interiores</text>
        <text x="303" y="230" fill="#5b534a" font-size="12">★ 4.7 · 340 serviços</text>
        <rect x="303" y="245" width="80" height="20" rx="4" fill="rgba(30,26,22,.25)"/>
        <text x="343" y="259" fill="#fff" font-size="11" text-anchor="middle">2FA ✓</text>

        <rect x="540" y="120" width="230" height="150" rx="8" fill="#fbf8f2" stroke="rgba(30,26,22,.15)"/>
        <circle cx="585" cy="165" r="20" fill="rgba(30,26,22,.3)"/>
        <text x="615" y="160" fill="#1e1a16" font-weight="500">Bruno T.</text>
        <text x="615" y="180" fill="#5b534a" font-size="12">Suporte de TI</text>
        <text x="558" y="230" fill="#5b534a" font-size="12">★ 5.0 · 96 serviços</text>
        <rect x="558" y="245" width="80" height="20" rx="4" fill="rgba(30,26,22,.25)"/>
        <text x="598" y="259" fill="#fff" font-size="11" text-anchor="middle">2FA ✓</text>
      </g>
      <g font-family="JetBrains Mono, monospace" font-size="11" fill="#5b534a">
        <text x="30" y="${h - 40}">3 401 profissionais · pagamento protegido · chat realtime</text>
      </g>
    </svg>`;
  }
  return "";
}

// About-page portrait — ported 1:1 from about.html's inline SVG.
export const portraitArt = `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">
  <rect width="400" height="500" fill="#ede7db"/>
  <defs>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="rgba(30,26,22,.15)"/>
    </pattern>
  </defs>
  <rect width="400" height="500" fill="url(#dots)"/>
  <line x1="80" y1="0" x2="80" y2="500" stroke="rgba(30,26,22,.06)" stroke-width="1"/>
  <line x1="160" y1="0" x2="160" y2="500" stroke="rgba(30,26,22,.06)" stroke-width="1"/>
  <line x1="240" y1="0" x2="240" y2="500" stroke="rgba(30,26,22,.06)" stroke-width="1"/>
  <line x1="320" y1="0" x2="320" y2="500" stroke="rgba(30,26,22,.06)" stroke-width="1"/>
  <circle cx="200" cy="210" r="90" fill="none" stroke="rgba(201,100,66,.18)" stroke-width="1"/>
  <circle cx="200" cy="210" r="62" fill="none" stroke="rgba(201,100,66,.12)" stroke-width="1"/>
  <text x="200" y="228" text-anchor="middle" font-family="JetBrains Mono" font-size="64" font-weight="400" fill="rgba(30,26,22,.1)" letter-spacing="-2">VG</text>
  <text x="200" y="350" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="rgba(30,26,22,.35)" letter-spacing="3">VITOR GABRIEL</text>
  <text x="200" y="368" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="rgba(30,26,22,.22)" letter-spacing="3">LONDRINA · BR</text>
</svg>`;

// projects.js's 6 rotating thumbnail patterns, ported 1:1.
export function projectThumb(index: number, accent: string, categoryLabel: string): string {
  const patterns = [
    () => `<svg class="thumb-canvas" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/>${Array.from({ length: 18 }, (_, r) => `<line x1="0" y1="${r * 18}" x2="400" y2="${r * 18}" stroke="rgba(30,26,22,.1)"/>`).join("")}<rect x="40" y="60" width="120" height="24" fill="${accent}" rx="3"/><rect x="40" y="100" width="220" height="14" fill="rgba(30,26,22,.15)" rx="2"/><rect x="40" y="124" width="180" height="14" fill="rgba(30,26,22,.15)" rx="2"/><rect x="40" y="148" width="200" height="14" fill="rgba(30,26,22,.15)" rx="2"/><text x="40" y="260" font-family="JetBrains Mono" font-size="10" fill="rgba(30,26,22,.5)">${categoryLabel}</text></svg>`,
    () => `<svg class="thumb-canvas" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/>${Array.from({ length: 15 }, (_, r) => Array.from({ length: 20 }, (_, c) => `<circle cx="${20 + c * 20}" cy="${20 + r * 20}" r="${Math.random() > 0.75 ? 3 : 1}" fill="${Math.random() > 0.92 ? accent : "rgba(30,26,22,.2)"}"/>`).join("")).join("")}<circle cx="200" cy="150" r="40" fill="none" stroke="${accent}" stroke-width="2"/><circle cx="200" cy="150" r="8" fill="${accent}"/></svg>`,
    () => `<svg class="thumb-canvas" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/><g stroke="rgba(30,26,22,.2)"><line x1="200" y1="150" x2="100" y2="80"/><line x1="200" y1="150" x2="320" y2="70"/><line x1="200" y1="150" x2="80" y2="230"/><line x1="200" y1="150" x2="330" y2="230"/></g><circle cx="200" cy="150" r="28" fill="${accent}"/><circle cx="100" cy="80" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/><circle cx="320" cy="70" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/><circle cx="80" cy="230" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/><circle cx="330" cy="230" r="14" fill="#fbf8f2" stroke="rgba(30,26,22,.3)"/></svg>`,
    () => `<svg class="thumb-canvas" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/>${Array.from({ length: 14 }, (_, i) => { const h = 40 + Math.abs(Math.sin(i * 0.6)) * 160; return `<rect x="${30 + i * 26}" y="${250 - h}" width="18" height="${h}" fill="${i === 7 ? accent : "rgba(30,26,22,.2)"}"/>`; }).join("")}<line x1="20" y1="250" x2="380" y2="250" stroke="rgba(30,26,22,.3)"/></svg>`,
    () => `<svg class="thumb-canvas" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/><circle cx="200" cy="150" r="110" fill="none" stroke="rgba(30,26,22,.15)" stroke-width="2"/><circle cx="200" cy="150" r="110" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="500 691" transform="rotate(-90 200 150)"/><text x="200" y="140" font-family="Inter Tight" font-size="44" font-weight="500" fill="#1e1a16" text-anchor="middle">${Math.floor(Math.random() * 40 + 60)}%</text><text x="200" y="170" font-family="JetBrains Mono" font-size="11" fill="rgba(30,26,22,.5)" text-anchor="middle">UPTIME</text></svg>`,
    () => `<svg class="thumb-canvas" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect width="400" height="300" fill="#ede7db"/><rect x="20" y="20" width="360" height="260" fill="#1e1a16" rx="4"/><g font-family="JetBrains Mono" font-size="10" fill="#f7f3ec"><text x="30" y="50">$ vg init --project</text><text x="30" y="68" fill="rgba(247,243,236,.5)">› bootstrapping...</text><text x="30" y="86" fill="${accent}">✓ ready</text><text x="30" y="104">$ vg deploy</text><text x="30" y="122" fill="rgba(247,243,236,.5)">› build</text><text x="30" y="140" fill="rgba(247,243,236,.5)">› test</text><text x="30" y="158" fill="${accent}">› ship ✓</text></g></svg>`,
  ];
  return patterns[index % patterns.length]();
}

// Hero SVG for case-study pages — ported from project.js heroArt().
export function caseHeroArt(name: string, categoryLabel: string, year: string, stack: string[], accent: string): string {
  return `<svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">
    <rect width="1400" height="600" fill="#ede7db"/>
    ${Array.from({ length: 30 }, (_, r) => `<line x1="0" y1="${r * 20}" x2="1400" y2="${r * 20}" stroke="rgba(30,26,22,.05)"/>`).join("")}
    ${Array.from({ length: 70 }, (_, c) => `<line x1="${c * 20}" y1="0" x2="${c * 20}" y2="600" stroke="rgba(30,26,22,.03)"/>`).join("")}
    <circle cx="900" cy="300" r="220" fill="${accent}" opacity=".9"/>
    <circle cx="900" cy="300" r="220" fill="none" stroke="${accent}" stroke-width="1" opacity=".4" transform="scale(1.15) translate(-117 -39)"/>
    <text x="80" y="280" font-family="Inter Tight" font-size="88" font-weight="500" fill="#1e1a16" letter-spacing="-2">${name.split(" ").slice(0, 2).join(" ")}</text>
    <text x="80" y="330" font-family="JetBrains Mono" font-size="16" fill="#5b534a" letter-spacing="2">${categoryLabel.toUpperCase()} · ${year}</text>
    <text x="80" y="360" font-family="JetBrains Mono" font-size="14" fill="#8a8178">${stack.join(" · ")}</text>
  </svg>`;
}
