# Writing Blog Posts and Docs Pages

The contract for content in this site. It's written to be handed to the project that produces the content. How it's rendered is in [mdx.md](mdx.md).

## Where files go

| Type | Path | URL |
|---|---|---|
| Blog post | `src/content/blog/{slug}.mdx` | `/blog/{slug}` |
| Docs page | `src/content/docs/{path}.mdx` | `/docs/{path}` |
| Docs home | `src/content/docs/index.mdx` | `/docs` |
| Docs folder home | `src/content/docs/guides/index.mdx` | `/docs/guides` |

- Use `.mdx`, or `.md` for content without components.
- Slugs and folder names are lowercase with hyphens: `async-standups-field-guide.mdx`.
- Adding a file publishes it. Nothing else needs registering.

## Front matter

Every file starts with YAML front matter. Unknown fields fail the build, as do missing required ones.

### Blog post

```yaml
---
title: How we cut our release cycle in half        # required
excerpt: One or two sentences for cards and SEO.   # required
date: "2026-10-14"                                 # required, quoted ISO date
tags: [Engineering, Process]                       # optional
author:                                            # optional
  name: Ada Lovelace                               #   required if author is set
  role: VP Engineering                             #   optional
  company: Elula                                   #   optional
  avatar: /avatars/ada.png                         #   optional
  href: /about                                     #   optional
readingTime: 6                                     # optional, minutes
cover:                                             # optional
  src: /blog/release-cycle.png
  alt: A release timeline
---
```

### Docs page

```yaml
---
title: Quickstart                                  # required
description: One sentence under the title.         # optional, also used for SEO
section: Getting started                           # required, sidebar group
order: 2                                           # optional, default 0
---
```

`order` sorts pages across the whole docs site. A section appears where its lowest-ordered page is, so leave gaps between sections (1, 2, … for "Getting started", 10, 11, … for "Guides").

## Body

- **Don't write an h1** (`#`). The page title from front matter is the h1. Start at `##`.
- `##` and `###` headings appear in "On this page" automatically.
- Standard markdown works: paragraphs, **bold**, _italic_, lists, `inline code`, blockquotes, horizontal rules.
- GitHub extras work: tables, task lists, strikethrough, footnotes.

### Links

```md
[See pricing](/pricing)                  <!-- site page: client navigation -->
[Quickstart](/docs/quickstart#install)   <!-- with an anchor -->
[GitHub](https://github.com)             <!-- other site: opens in a new tab -->
```

Use root-relative paths (`/docs/...`) for site pages, not full URLs.

### Code

Fenced code blocks are highlighted and get a copy button.

````md
```bash
npm install -g @elula/cli
```

```ts title="elula.config.ts" showLineNumbers
export default defineConfig({ workspace: "acme" });
```
````

- The language after the fences is a Shiki language id (`ts`, `tsx`, `bash`, `yaml`, `json`...). Unknown ids render as plain text.
- `title="…"` shows a filename header. `showLineNumbers` adds line numbers.

### Callouts

Prefer GitHub alert syntax. It also reads well on GitHub:

```md
> [!NOTE]
> Settings sync to every device.

> [!TIP]
> Press ⌘K to open the command palette.

> [!WARNING]
> Rotating the key revokes the old one.

> [!CAUTION]
> Deleting a workspace can't be undone.
```

`[!IMPORTANT]` renders as a note. In `.mdx` you can also use the component directly, for a custom title:

```mdx
<Callout variant="tip" title="Heads up">
  Callout body, with **markdown**.
</Callout>
```

Variants: `note`, `tip`, `warning`, `danger`.

## Components available in `.mdx`

| Component | Use |
|---|---|
| `<Callout variant title>` | See above |
| `<CodeBlock code lang filename showLineNumbers />` | Prefer fenced code; use this only when a fence won't do |

Nothing else is available. Using another component fails the build. Ask for a component to be added rather than writing HTML or inline styles.

## MDX syntax rules

MDX is stricter than markdown:

- `<` and `{` in prose start JSX or an expression. Write `&lt;` and `&#123;`, or put them in `inline code`.
- Leave a blank line between JSX tags and the markdown inside them, or indent consistently as in the Callout example.
- HTML comments (`<!-- -->`) aren't allowed in `.mdx`; use `{/* comment */}`. (They're fine in `.md`.)
- Don't use `import` or `export` in content files.
- No inline `style` attributes or raw HTML for layout. Styling comes from the site.

## Images and video

Not supported yet. Don't add them until the site has components for them.

## Checking your work

Run `yarn build` in this repo. It fails on bad front matter (it names the file and field), unknown components and MDX syntax errors.
