import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";

// next-mdx-remote@6's RSC compileMDX drops JSX expression-container attribute
// values (e.g. `items={[...]}`) — verified against @mdx-js/mdx directly, which
// handles them correctly. Case-study content relies on `<Stats items={...} />`,
// so this compiles/runs MDX directly instead of going through that wrapper.
export async function renderMdx(source: string, components: MDXComponents) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark", keepBackground: true }]],
  });
  const { default: MDXContent } = await run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  });
  return <MDXContent components={components} />;
}
