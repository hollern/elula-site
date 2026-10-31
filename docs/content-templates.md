# Blog and Docs Templates

Every blog post shares one frame, and every docs page shares another. Only the body changes between pages. That body is the **content slot**: the template's `children`, rendered inside `Prose`.

```tsx
<BlogPostTemplate meta={meta} related={related}>
  <Content />   {/* the content slot */}
</BlogPostTemplate>
```

## Content entries

Content is written as MDX files in `src/content/` (see [mdx.md](mdx.md) for the pipeline and [content-authoring.md](content-authoring.md) for how to write it). `src/lib/blog.ts` and `src/lib/docs.ts` turn each file into a **content entry**, `{ meta, Content }` (`ContentEntry<TMeta>` in `src/lib/types.ts`):

- `meta` is the validated front matter plus the slug and a `toc` generated from the h2/h3 headings. The template renders it in the fixed frame.
- `Content` is the compiled MDX body. The route injects it into the content slot.

The templates don't know about MDX. Anything that produces `{ meta, Content }` can feed them.

Long-form bodies are the one exception to "copy lives in `content.ts`". Page chrome copy (headings, labels, back links) still lives in `content.ts` under `blog`, `docs` and `uiCopy`.

## Blog

| What | Where |
|---|---|
| Index (`/blog`) | `src/app/(marketing)/blog/page.tsx` |
| Post route (`/blog/{slug}`) | `src/app/(marketing)/blog/[slug]/page.tsx` |
| Template | `src/components/layout/blog-post-template.tsx` |
| Collection | `src/lib/blog.ts` (`getPosts`, `getPost`, `getRelatedPosts`, `toPostCard`, `postHref`) |
| Content | `src/content/blog/{slug}.mdx` |

- The blog is in the `(marketing)` route group, so it uses `MarketingLayout` (marketing header and footer).
- `BlogPostTemplate`, from top to bottom:
  1. "All posts" back link, tags, `h1` title, excerpt as the lead, then `AuthorByline` (or just the date if there's no author).
  2. Optional cover image (`meta.cover`, `next/image`).
  3. The content slot in a `max-w-3xl` column, with a sticky TOC beside it from `lg`.
  4. A "Keep reading" muted section with up to 3 related `PostCard`s. Posts that share a tag come first, then the newest.

**Adding a post:** add `src/content/blog/{slug}.mdx`. Posts are sorted by `date`; the new post is prerendered and appears on the index.

## Docs

| What | Where |
|---|---|
| Route (`/docs` and `/docs/{...slug}`) | `src/app/docs/[[...slug]]/page.tsx` (optional catch-all) |
| Layout | `src/app/docs/layout.tsx` uses `DocsLayout` (`src/components/layout/docs-layout.tsx`) |
| Template | `src/components/layout/docs-page-template.tsx` |
| Collection | `src/lib/docs.ts` (`getDocsNav`, `getDoc`, `getDocSlugs`, `docHref`) |
| Content | `src/content/docs/**/*.mdx` (`index.mdx` is the folder's URL) |

- `DocsLayout`:
  - `SiteHeader` at full width with the main nav.
  - A sticky `DocsSidebar` from `md`, built from front matter. Below `md` it moves into `DocsMobileNav`, a left sheet behind a "Menu" bar.
  - No marketing footer, so the sidebar can run the full height.
- `DocsPageTemplate`, from top to bottom:
  1. Section label (the sidebar group), `h1` title and description as the lead.
  2. The content slot.
  3. `PrevNextLinks` in reading order.
  4. A sticky TOC beside the content from `xl`.
- **Order:** front matter `section` groups pages; `order` sorts pages site-wide, and each section sits where its lowest-ordered page is. The same order drives the sidebar, prev/next and static params.

**Adding a page:** add a file under `src/content/docs/` whose path is the URL, with `section` and `order` in its front matter.

## Shared decisions

- **Same frame, different jobs.** Both templates use `H1` + `Lead` and `Prose`, with a TOC on the right, so they look like one brand.
  - Blog is for reading: the marketing shell, a byline, related posts at the end.
  - Docs is for navigating: an app-style shell, a sidebar, prev/next.
- **No overrides on shared components.** The templates use `H1`, `Lead` and `Prose` as they are. A smaller docs title would need a `size` prop on `H1` (see CLAUDE.md).
- **`params` inside Suspense.** Both routes read `params` inside `<Suspense>`, as the product page does (see [product-pages.md](product-pages.md)). Known slugs are prerendered in full. Unknown slugs return HTTP 200 with the 404 UI and `noindex`.
- **Preserved routes.** With Cache Components, Next keeps the previous page mounted but hidden after client navigation. So don't put fixed `id`s in templates; they would be duplicated in the DOM.
- **Mobile docs sheet** closes on navigation without an effect. It stores the pathname it opened on, and it's open only while that matches.

## Next steps

- **Tag pages.** `TagList` links to `/blog/tags/{tag}`, but those pages don't exist yet, so the links 404.
- **Docs search** and **breadcrumbs** for deeper trees.
- MDX gaps (images, video, link checking) are listed in [mdx.md](mdx.md).
- **Status:** all post and docs copy is **placeholder** (marked TODO).
