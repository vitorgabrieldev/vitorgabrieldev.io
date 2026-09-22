import GithubSlugger from "github-slugger";

export type TocItem = { id: string; title: string };

/** Extracts H2 headings from MDX source for the sidebar TOC. Uses the same
 *  slugger as rehype-slug so ids match the ones rendered in the article body. */
export function extractToc(mdxSource: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of mdxSource.split("\n")) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (match) {
      const title = match[1].trim();
      items.push({ id: slugger.slug(title), title });
    }
  }
  return items;
}
