# MDX Pipeline

Blog posts and docs pages are `.mdx` (or `.md`) files in `src/content/`, compiled at build time by **`@next/mdx`** and rendered into the content slot of the page templates (see [content-templates.md](content-templates.md)). How to *write* content is in [content-authoring.md](content-authoring.md).

## Flow

```
src/content/blog/{slug}.mdx ─┐
src/content/docs/{path}.mdx ─┤  @next/mdx loader + plugins (next.config.ts)
                             ▼
     module: default (body) · frontmatter · toc
                             ▼
  src/lib/mdx/load.ts   lists files (fs) and imports them
  src/lib/mdx/schema.ts validates front matter (zod)
  src/lib/blog.ts / docs.ts   build posts, nav, prev/next
                             ▼
  BlogPostTemplate / DocsPageTemplate  ← <Content /> in the slot
                             ▼
  src/mdx-components.tsx  maps elements to our components
```

## Files

| What | Where |
|---|---|
| Plugin config | `next.config.ts` (`createMDX`) |
| Components map (required by `@next/mdx`) | `src/mdx-components.tsx` |
| Local plugins (plain `.mjs`) | `src/lib/mdx/plugins/` |
| File listing and import | `src/lib/mdx/load.ts` |
| Front matter schemas | `src/lib/mdx/schema.ts` |
| Collections | `src/lib/blog.ts`, `src/lib/docs.ts` |
| Markdown link → `next/link` | `src/components/mdx/mdx-link.tsx` |

## Plugins

In order:

| Plugin | Does |
|---|---|
| `remark-frontmatter` + `remark-mdx-frontmatter` | YAML front matter becomes `export const frontmatter` |
| `remark-gfm` | Tables, task lists, strikethrough, footnotes, autolinks |
| `remark-callouts` (local) | `> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]` blockquotes become `<Callout>` (IMPORTANT → note, CAUTION → danger) |
| `remark-code-blocks` (local) | Fenced code becomes `<CodeBlock code lang filename showLineNumbers>`; reads `title="…"` (or `filename=`) and `showLineNumbers` from the fence |
| `rehype-slug` | Heading ids (GitHub-style slugs) |
| `rehype-toc-export` (local) | h2/h3 headings become `export const toc`, the `TocItem[]` the templates take |

## Decisions and gotchas

- **Turbopack takes plugins as strings only.** Functions can't be passed into Rust, so `next.config.ts` lists plugins by package name. Options must be serializable.
- **Local plugins are absolute paths.** `@next/mdx` resolves a plugin string from the folder of the `.mdx` file being compiled, so a relative path breaks. `localPlugin()` in `next.config.ts` builds the absolute path. Plugins are plain `.mjs` (with JSDoc types) because the loader `import()`s them in Node, outside the TypeScript build.
- **Fenced code goes to `CodeBlock`, not `pre`.** Converting in remark keeps the fence meta (MDX drops it before `pre`) and keeps highlighting in our cached Shiki `highlight()`.
- **Listing uses `fs`.** `@next/mdx` compiles imported files but doesn't list them. `listContentFiles()` reads the folder; `importContent()` uses a template-literal `import()` with a static prefix (`@/content/blog/…`) so the bundler includes every file.
- **Caching.** With Cache Components, file reads are uncached I/O, so `listContentFiles`, `getPosts` and the docs page list are `"use cache"` with `cacheLife("max")`; content only changes on deploy. Only plain data is cached; the `Content` component is imported per request (from the module cache). In `yarn dev`, if a newly added file doesn't appear, save any file under `src/lib/` or restart the dev server.
- **Unknown components fail.** MDX only sees what `src/mdx-components.tsx` exports. Using anything else fails the build (prerender) with "Expected component … to be defined".
- **Bad front matter fails the build** with the file path and each problem (zod `prettifyError`). Schemas are strict, so typos in field names fail too.
- **Dates must be quoted** in YAML (`date: "2026-10-22"`) to stay strings.
- **MDX runs code.** Content is trusted (it arrives by reviewed pull request). Don't feed this pipeline content from untrusted sources.

## Adding a component for content

1. Build it in `src/components/common/` like any other (server by default; client components work too).
2. Add it to `components` in `src/mdx-components.tsx`.
3. Document it, with an example, in [content-authoring.md](content-authoring.md) so content authors (and the content project) know it exists.

## Not done yet

- **Images:** markdown images render as plain `<img>`. Mapping `img` to `next/image` needs width and height, which a plugin could read at build time.
- **Video:** no `Video` or `YouTube` component yet.
- **Internal link checking:** broken `/…` links aren't caught at build.
- **Reading time** is set by hand in front matter; it could be computed.
