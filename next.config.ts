import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Turbopack can only take MDX plugins as strings (functions can't cross into
// Rust). The loader resolves a string from each .mdx file's folder, so local
// plugins are passed as absolute paths. See docs/mdx.md.
const localPlugin = (name: string) => path.join(process.cwd(), "src/lib/mdx/plugins", `${name}.mjs`);

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
      "remark-gfm",
      localPlugin("remark-callouts"),
      localPlugin("remark-code-blocks"),
    ],
    rehypePlugins: ["rehype-slug", localPlugin("rehype-toc-export")],
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withMDX(nextConfig);
