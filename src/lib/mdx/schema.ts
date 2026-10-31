// Front matter schemas for MDX content. A file that doesn't match fails the
// build with its path and the problem. Keep in sync with docs/content-authoring.md.

import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date, e.g. 2026-10-22");

export const blogFrontmatter = z.strictObject({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  date: isoDate,
  tags: z.array(z.string()).default([]),
  author: z
    .strictObject({
      name: z.string(),
      role: z.string().optional(),
      company: z.string().optional(),
      avatar: z.string().optional(),
      href: z.string().optional(),
    })
    .optional(),
  /** Minutes. */
  readingTime: z.number().int().positive().optional(),
  cover: z.strictObject({ src: z.string(), alt: z.string() }).optional(),
});

export const docFrontmatter = z.strictObject({
  title: z.string().min(1),
  description: z.string().optional(),
  /** Sidebar group. */
  section: z.string().min(1),
  /** Sorts pages site-wide; sections follow their lowest-ordered page. */
  order: z.number().default(0),
});

export function parseFrontmatter<T extends z.ZodType>(schema: T, data: unknown, file: string): z.output<T> {
  const result = schema.safeParse(data ?? {});
  if (!result.success) {
    throw new Error(`Invalid front matter in ${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
