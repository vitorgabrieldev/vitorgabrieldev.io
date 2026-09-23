export type ProjectLinkKind = "deploy";

export type ProjectLink = {
  kind: ProjectLinkKind;
  href: string;
};

export type ProjectPreview = {
  key: string;
  src: string;
  poster: string;
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
  /** Looping scroll-capture videos of the live site, shown as a carousel in
   *  the case-study hero instead of the placeholder art. Label text for each
   *  key lives in messages/*.json under projects.<slug>.screens.<key>. */
  previews?: ProjectPreview[];
};

export const PROJECTS: Project[] = [
  {
    slug: "militrak",
    name: "MiliTrak",
    year: "2026",
    accent: "#9BC49F",
    glyph: "shield",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Ant Design", "Tailwind CSS", "Playwright"],
    // Sistema em uso real por uma unidade militar — sem link público (nem repo, nem deploy).
    links: [],
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
    previews: [
      "login",
      "cadastro",
      "cadastro-step2",
      "dashboard",
      "dashboard-obras",
      "dashboard-obras-novo",
      "dashboard-diario",
      "dashboard-diario-novo",
      "dashboard-equipes",
      "dashboard-equipes-novo",
      "dashboard-equipamentos",
      "dashboard-equipamentos-novo",
      "dashboard-conta-perfil",
      "dashboard-conta-seguranca",
      "dashboard-organizacao-geral",
      "dashboard-organizacao-membros",
      "dashboard-organizacao-plano",
      "dashboard-organizacao-permissoes",
      "dashboard-organizacao-plano-alterar",
      "dashboard-organizacao-plano-cancelar",
    ].map((key) => ({
      key,
      src: `/projects/constria/${key}.webm`,
      poster: `/projects/constria/${key}-poster.jpg`,
    })),
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
    links: [],
  },
  {
    slug: "dubflow",
    name: "DubFlow",
    year: "2026",
    accent: "#D79FCB",
    glyph: "mic",
    stack: ["Laravel", "Laravel Reverb", "JWT Auth", "Next.js", "React", "TypeScript", "Pusher", "Tailwind CSS"],
    links: [],
  },
  {
    slug: "cybersec-lab",
    name: "CyberSec Lab",
    year: "2026",
    accent: "#7FD1D1",
    glyph: "terminal",
    stack: ["JavaScript", "CSS", "HTML"],
    links: [{ kind: "deploy", href: "https://cyber-security-challenge-alpha.vercel.app" }],
    previews: ["desktop", "terminal", "files", "tool"].map((key) => ({
      key,
      src: `/projects/cyber-security-challenge/${key}.webm`,
      poster: `/projects/cyber-security-challenge/${key}-poster.jpg`,
    })),
  },
  {
    slug: "pett-love",
    name: "Pett-Love",
    year: "2026",
    accent: "#E5A88A",
    glyph: "paw",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Biome"],
    links: [{ kind: "deploy", href: "https://pett-love-six.vercel.app" }],
    previews: [
      { key: "home", src: "/projects/pett-love/home.webm", poster: "/projects/pett-love/home-poster.jpg" },
      {
        key: "pets-namorando",
        src: "/projects/pett-love/pets-namorando.webm",
        poster: "/projects/pett-love/pets-namorando-poster.jpg",
      },
      { key: "blog", src: "/projects/pett-love/blog.webm", poster: "/projects/pett-love/blog-poster.jpg" },
      { key: "contato", src: "/projects/pett-love/contato.webm", poster: "/projects/pett-love/contato-poster.jpg" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
