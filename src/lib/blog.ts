// Blog posts are MDX files in src/content/blog/; the filename is the slug.
// Dropping a file in publishes it. See docs/mdx.md.

import { cacheLife } from "next/cache";

import { blogFrontmatter, parseFrontmatter } from "@/lib/mdx/schema";
import { contentPath, fileToSlug, importContent, listContentFiles } from "@/lib/mdx/load";
import type { BlogPostEntry, BlogPostMeta, Post } from "@/lib/types";

async function loadPost(file: string): Promise<BlogPostEntry> {
  const mod = await importContent("blog", file);
  const frontmatter = parseFrontmatter(blogFrontmatter, mod.frontmatter, contentPath("blog", file));
  return { meta: { ...frontmatter, slug: fileToSlug(file), toc: mod.toc }, Content: mod.default };
}

/** Every post's metadata, newest first. */
export async function getPosts(): Promise<BlogPostMeta[]> {
  "use cache";
  cacheLife("max");
  const files = await listContentFiles("blog");
  const posts = await Promise.all(files.map(async (file) => (await loadPost(file)).meta));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<BlogPostEntry | undefined> {
  const files = await listContentFiles("blog");
  const file = files.find((f) => fileToSlug(f) === slug);
  return file ? loadPost(file) : undefined;
}

export function postHref(slug: string) {
  return `/blog/${slug}`;
}

/** The card shape `PostCard` takes. */
export function toPostCard(meta: BlogPostMeta): Post {
  const { title, excerpt, date, tags, cover, author, readingTime } = meta;
  return { href: postHref(meta.slug), title, excerpt, date, tags, cover, author, readingTime };
}

/** Up to `limit` other posts, those sharing a tag first, then the newest. */
export async function getRelatedPosts(current: BlogPostMeta, limit = 3) {
  const others = (await getPosts()).filter((post) => post.slug !== current.slug);
  const shared = (post: BlogPostMeta) => post.tags.filter((tag) => current.tags.includes(tag)).length;

  return others.sort((a, b) => shared(b) - shared(a)).slice(0, limit);
}
