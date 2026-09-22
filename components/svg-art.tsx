/** Renders the pre-built SVG-markup strings from lib/thumb-art.ts. Content is
 *  fully self-authored (no user input), so this is the pragmatic way to reuse
 *  those generators without hand-converting every SVG attribute to JSX casing. */
export function SvgArt({ markup, className }: { markup: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}
