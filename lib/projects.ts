export type ProjectLinkKind = "repo" | "deploy";

export type ProjectLink = {
  kind: ProjectLinkKind;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  accent: string;
  glyph: "shield" | "building" | "handshake" | "mic" | "terminal" | "paw";
  stack: string[];
  stackGroups?: { key: string; items: string[] }[];
  links: ProjectLink[];
};

export const PROJECTS: Project[] = [
  {
    slug: "militrak",
    name: "MiliTrak",
    year: "2026",
    accent: "#9BC49F",
    glyph: "shield",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Ant Design", "Tailwind CSS", "Playwright"],
    // Repositório privado — sem link de repo, só o deploy.
    links: [{ kind: "deploy", href: "https://militrak.vercel.app" }],
  },
  {
    slug: "constria",
    name: "Constria",
    year: "2026",
    accent: "#E0B97A",
    glyph: "building",
    stack: ["Laravel 13", "PHP 8.4", "PostgreSQL", "Redis", "Stripe", "Next.js", "React", "Ant Design"],
    // Ambos os repositórios (backend e frontend) são privados — só o deploy.
    links: [{ kind: "deploy", href: "https://constria.vercel.app" }],
  },
  {
    slug: "trabalho-amigo",
    name: "Trabalho Amigo",
    year: "2024–2026",
    accent: "#93B8DB",
    glyph: "handshake",
    stack: ["PHP", "MySQL", "Laravel", "Next.js", "TypeScript"],
    stackGroups: [
      { key: "v1", items: ["PHP", "MySQL", "Apache", "Docker"] },
      { key: "v2", items: ["Laravel", "Next.js", "TypeScript"] },
    ],
    links: [{ kind: "repo", href: "https://github.com/vitorgabrieldev/trabalhoamigo.com.br" }],
  },
  {
    slug: "dubflow",
    name: "DubFlow",
    year: "2026",
    accent: "#D79FCB",
    glyph: "mic",
    stack: ["Laravel", "Laravel Reverb", "JWT Auth", "Next.js", "React", "TypeScript", "Pusher", "Tailwind CSS"],
    links: [{ kind: "repo", href: "https://github.com/vitorgabrieldev/dubflow.pro.br" }],
  },
  {
    slug: "cybersec-lab",
    name: "CyberSec Lab",
    year: "2026",
    accent: "#7FD1D1",
    glyph: "terminal",
    stack: ["JavaScript", "CSS", "HTML"],
    links: [
      { kind: "repo", href: "https://github.com/vitorgabrieldev/cyber-security-challenge" },
      { kind: "deploy", href: "https://cyber-security-challenge-alpha.vercel.app" },
    ],
  },
  {
    slug: "pett-love",
    name: "Pett-Love",
    year: "2026",
    accent: "#E5A88A",
    glyph: "paw",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Biome"],
    links: [
      { kind: "repo", href: "https://github.com/vitorgabrieldev/Pett-Love" },
      { kind: "deploy", href: "https://pett-love-six.vercel.app" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
