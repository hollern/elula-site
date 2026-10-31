// Docs pages are MDX files in src/content/docs/; the path is the URL
// (index.mdx is /docs). Front matter `section` and `order` set the sidebar and
// prev/next order. See docs/mdx.md.

import { cacheLife } from "next/cache";

import { docFrontmatter, parseFrontmatter } from "@/lib/mdx/schema";
import { contentPath, fileToSlug, importContent, listContentFiles } from "@/lib/mdx/load";
import type { DocNavItem, DocPageMeta } from "@/lib/types";

type DocPage = DocPageMeta & { file: string; section: string; order: number };

export function docHref(slug: string) {
  return slug ? `/docs/${slug}` : "/docs";
}

/** Every page in reading order: by section (lowest `order` first), then `order`, then title. */
async function getDocPages(): Promise<DocPage[]> {
  "use cache";
  cacheLife("max");
  const files = await listContentFiles("docs");
  const pages = await Promise.all(
    files.map(async (file) => {
      const mod = await importContent("docs", file);
      const frontmatter = parseFrontmatter(docFrontmatter, mod.frontmatter, contentPath("docs", file));
      return { ...frontmatter, slug: fileToSlug(file), file, toc: mod.toc };
    }),
  );

  const sectionRank = new Map<string, number>();
  for (const page of pages) {
    sectionRank.set(page.section, Math.min(sectionRank.get(page.section) ?? Infinity, page.order));
  }

  return pages.sort(
    (a, b) =>
      sectionRank.get(a.section)! - sectionRank.get(b.section)! ||
      a.section.localeCompare(b.section) ||
      a.order - b.order ||
      a.title.localeCompare(b.title),
  );
}

/** Takes the `[[...slug]]` segments; `undefined` is the docs home. */
export async function getDoc(segments: string[] = []) {
  const pages = await getDocPages();
  const slug = segments.join("/");
  const index = pages.findIndex((page) => page.slug === slug);
  if (index === -1) return undefined;

  const { file, section, slug: pageSlug, title, description, toc } = pages[index];
  const meta: DocPageMeta = { slug: pageSlug, title, description, toc };
  const link = (page: DocPage | undefined) => page && { title: page.title, href: docHref(page.slug) };
  const mod = await importContent("docs", file);

  return {
    meta,
    Content: mod.default,
    section,
    prev: link(pages[index - 1]),
    next: link(pages[index + 1]),
  };
}

export async function getDocSlugs() {
  return (await getDocPages()).map((page) => page.slug);
}

export async function getDocsNav(): Promise<DocNavItem[]> {
  const nav: DocNavItem[] = [];
  for (const page of await getDocPages()) {
    let section = nav.find((item) => item.title === page.section);
    if (!section) nav.push((section = { title: page.section, items: [] }));
    section.items!.push({ title: page.title, href: docHref(page.slug) });
  }
  return nav;
}
