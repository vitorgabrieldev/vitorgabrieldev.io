import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";
import { projects as allProjects, type Project } from "@/content/projects";

const CONTENT_DIR = path.join(process.cwd(), "content");

export { allProjects };
export type { Project };

export function getProject(id: string): Project | undefined {
  return allProjects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return allProjects.filter((p) => p.featured);
}

export function getNextProject(id: string): Project {
  const idx = allProjects.findIndex((p) => p.id === id);
  return allProjects[(idx + 1) % allProjects.length];
}

export type CaseStudy = {
  lede: string;
  content: string;
};

export function getCaseStudy(id: string, locale: Locale): CaseStudy {
  const file = path.join(CONTENT_DIR, "case-studies", id, `${locale}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { lede: data.lede as string, content };
}

export type JournalMeta = {
  slug: string;
  title: string;
  date: string;
  read: string;
  kicker: string;
  summary: string;
};

export type JournalEntry = JournalMeta & { content: string };

function readJournalFile(slug: string, locale: Locale) {
  const file = path.join(CONTENT_DIR, "journal", slug, `${locale}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

export function getJournalSlugs(): string[] {
  return fs.readdirSync(path.join(CONTENT_DIR, "journal")).sort();
}

export function getJournalEntry(slug: string, locale: Locale): JournalEntry {
  const { data, content } = readJournalFile(slug, locale);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    read: data.read as string,
    kicker: data.kicker as string,
    summary: data.summary as string,
    content,
  };
}

/** English kickers, keyed by slug — used as the stable filter key regardless
 *  of the active locale (mirrors legacy behaviour: filter compares category.en). */
export function getJournalKickerKeys(): Record<string, string> {
  return Object.fromEntries(
    getJournalSlugs().map((slug) => [slug, readJournalFile(slug, "en").data.kicker as string]),
  );
}

export function getAllJournalEntries(locale: Locale): JournalMeta[] {
  return getJournalSlugs()
    .map((slug) => {
      const { data } = readJournalFile(slug, locale);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        read: data.read as string,
        kicker: data.kicker as string,
        summary: data.summary as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
