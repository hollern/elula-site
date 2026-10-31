// Finds and imports MDX content in src/content/. Each file compiles (via
// @next/mdx and the plugins in next.config.ts) to a module exporting the body
// as `default`, plus `frontmatter` and the generated `toc`.

import { cacheLife } from "next/cache";
import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

import type { TocItem } from "@/lib/types";

export type MdxModule = {
  default: ComponentType;
  frontmatter?: unknown;
  toc: TocItem[];
};

type Collection = "blog" | "docs";

const contentRoot = path.join(process.cwd(), "src/content");

/**
 * `.md` and `.mdx` files in a collection, as posix paths relative to it
 * ("guides/projects.mdx"). Cached because Cache Components treats file
 * reads like any other uncached I/O. Content only changes on deploy, hence "max".
 */
export async function listContentFiles(collection: Collection) {
  "use cache";
  cacheLife("max");
  const files = await readdir(path.join(contentRoot, collection), { recursive: true });
  return files
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.split(path.sep).join("/"))
    .sort();
}

/** "guides/projects.mdx" → "guides/projects"; index files map to their folder. */
export function fileToSlug(file: string) {
  return file.replace(/\.mdx?$/, "").replace(/(^|\/)index$/, "");
}

// The template literals must keep a static prefix so the bundler can include
// every file in the folder.
export async function importContent(collection: Collection, file: string): Promise<MdxModule> {
  return collection === "blog"
    ? import(`@/content/blog/${file}`)
    : import(`@/content/docs/${file}`);
}

export function contentPath(collection: Collection, file: string) {
  return `src/content/${collection}/${file}`;
}
