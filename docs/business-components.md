# Business Components

Hand-written composites in `src/components/common/`, built on the `ui/` primitives. They follow the plan below (layout first, then shell, landing, blog, docs). Preview every one at **`/dev/components`** (dev only; 404 in production). For primitives, tokens and dark mode, see [ui-components.md](ui-components.md).

## Principles

- **Data-driven.** Components take arrays and props, never hard-coded copy. Site-wide copy and microcopy live in `src/lib/content.ts`. Shared data shapes such as `Feature`, `PricingTier`, `Post` and `DocNavItem` live in `src/lib/types.ts`.
- **Variants over duplicates.** Use `cva` for visual variants: `Section` (`variant`, `spacing`), `Container` (`size`), `FeatureGrid` (`columns`), `Callout`, `CtaBanner`, `Logo` and `SectionHeader` (`align`).
- **Server by default.** These are client components:
  - `SiteHeader`: mobile sheet, scroll state, active link.
  - `ThemeToggle`.
  - `PricingTable`: billing toggle.
  - `NewsletterForm`.
  - `CopyButton`: the only client part of `CodeBlock`.
  - `TableOfContents`.
  - `DocsSidebarLink` and `DocsSidebarSection`: the client parts of `DocsSidebar` (active link; collapsible section).
  - `DocsMobileNav`: the sheet that holds `DocsSidebar` below `md`.
- **Heading levels are a prop.** `Hero` defaults to `h1` and `SectionHeader` to `h2`. Pass `titleAs` to keep one `h1` per page.

## Catalog

| Area | Component | File | Notes |
|---|---|---|---|
| Layout | `Container` | `container.tsx` | `size`: narrow / default / wide / full |
| | `Section` | `section.tsx` | `variant`: default / muted / accent / hero (always-dark band); `spacing`; wraps children in a Container unless `container={false}`; `scroll-mt-16` for anchors |
| | `SectionHeader` | `section-header.tsx` | eyebrow, title, subtitle, `align`, `titleAs` |
| | `Logo` | `logo.tsx` | `variant`: icon / full; `size`; `href` makes it a link (`inline-flex`, so it centers in the header without extra space below it). The mark is a **placeholder SVG** drawn with tokens |
| Shell | `SiteHeader` | `site-header.tsx` | Sticky. Border and blur appear after scrolling (`useScrolled`). Dropdowns come from `NavItem.items`. Mobile `Sheet`. `containerSize="full"` for docs |
| | `SiteFooter` | `site-footer.tsx` | Async. Link columns, legal, socials and a `newsletter` slot. `copyright` is a `(year) => string` |
| | `ThemeToggle` | `theme-toggle.tsx` | Unchanged from the primitives work |
| | `CtaGroup` | `cta-group.tsx` | Primary + optional secondary. `tone="inverted"` for `bg-primary` surfaces, `tone="hero"` for the `bg-hero` band |
| Landing | `Hero` | `hero.tsx` | `layout`: center / split; `tone`: default / dark (navy `bg-hero` band); `media` slot; optional linked eyebrow |
| | `FeatureCard`, `FeatureGrid` | `feature-grid.tsx` | `columns` 2/3/4; `variant`: card / plain |
| | `LogoCloud` | `logo-cloud.tsx` | `next/image`, grayscale until hover; `invertOnDark` per logo |
| | `TestimonialCard` | `testimonial-card.tsx` | `figure`/`blockquote`/`figcaption` |
| | `PricingCard`, `PricingTable` | `pricing-*.tsx` | The table owns the monthly/annual `Tabs`. A tier without `price` shows `priceLabel` |
| | `PlanComparison` | `plan-comparison.tsx` | Feature table under the pricing cards. Columns come from `PricingTier[]`; rows are `PlanComparisonGroup[]` keyed by tier name. See [marketing-pages.md](marketing-pages.md) |
| | `FaqList` | `faq-list.tsx` | Single, collapsible accordion |
| | `CtaBanner` | `cta-banner.tsx` | `variant`: primary / muted |
| | `FeatureRow` | `feature-row.tsx` | Text + media row; `reverse` puts the media on the left for zig-zag lists |
| | `ProductShot` | `product-shot.tsx` | Framed `next/image` screenshot, or a token-drawn placeholder (`board` / `list` / `chart`) |
| | `StatGrid` | `stat-grid.tsx` | Headline figures as a `dl`; 1px dividers at any column count |
| | `NewsletterForm` | `newsletter-form.tsx` | Needs an `action` (see below) |
| Blog | `PostCard` | `post-card.tsx` | Stretched title link; tags sit above it with `z-10` |
| | `AuthorByline` | `author-byline.tsx` | avatar, name, date, reading time |
| | `Prose` | `prose.tsx` | `@tailwindcss/typography` + `prose-tokens` |
| | `TagList` | `tag-list.tsx` | Links to `${basePath}/${slug}`. `basePath={false}` renders plain badges |
| Docs | `Callout` | `callout.tsx` | note / tip / warning / danger, built on `Alert`, `role="note"` |
| | `CodeBlock` | `code-block.tsx` | Async server component with Shiki, a filename header and line numbers |
| | `TableOfContents` | `table-of-contents.tsx` | Takes `TocItem[]`; `useActiveHeading` highlights the current one |
| | `DocsSidebar` | `docs-sidebar.tsx` | Takes a `DocNavItem[]` tree; top-level entries are section headings, rendered as `DocsSidebarSection` |
| | `DocsSidebarSection` | `docs-sidebar-section.tsx` | Collapsible section (`ui/collapsible`). Closed by default; opens when the current page is in it, and keeps the reader's toggles across navigations |
| | `PrevNextLinks` | `prev-next-links.tsx` | Either side is optional |
| | `DocsMobileNav` | `docs-mobile-nav.tsx` | Left `Sheet` with a "Menu" trigger; pass `DocsSidebar` as children. Closes on navigation |

Page templates (`BlogPostTemplate`, `DocsPageTemplate`) and `DocsLayout` live in `src/components/layout/`; see [content-templates.md](content-templates.md). `SkipLink` (`layout/skip-link.tsx`) is shared by the marketing and docs layouts.

Helpers: `PersonAvatar` (avatar with an initials fallback) and `SocialIcon` (simple-icons SVG).

Hooks in `src/hooks/`: `useScrolled`, `useCopyToClipboard`, `useActiveHeading`.

## Decisions worth knowing

- **Cache Components is on** (`next.config.ts`), so reading the clock (`new Date()`, `Date.now()`) during render fails the prerender:
  - `getCurrentYear()` in `src/lib/format.ts` is `"use cache"` with `cacheLife("days")`. Use it for anything year-based.
  - `highlight()` in `src/lib/highlight.ts` is `"use cache"` with `cacheLife("max")`. Shiki reads the clock internally, and the output depends only on `(code, lang)`.
- **Syntax highlighting** runs on the server:
  - Shiki with the JavaScript regex engine (no WASM) and one shared highlighter. Languages load on demand; unknown languages fall back to plain text.
  - Both themes (`github-light`, `github-dark`) render as CSS variables (`defaultColor: false`), and `globals.css` picks one per mode. The background comes from our tokens, not the Shiki theme.
- **Prose colors** come from the `prose-tokens` utility in `globals.css`, which maps `--tw-prose-*` to theme tokens. Don't add `prose-invert`. Dark mode and rebrands flow through the tokens. Components that keep their own styles inside Prose (`CodeBlock`, `Callout`) use `not-prose`.
- **Semantic status tokens** `--info`, `--success` and `--warning` (light and dark) were added to `globals.css` for `Callout`. Use `text-info`, `bg-warning/10` and similar instead of palette colors.
- **Brand icons:** lucide v1 removed them, so socials use `simple-icons` path data. simple-icons no longer ships LinkedIn.
- **Active links in layouts:** layouts don't know the pathname, so `DocsSidebar` stays a server component and only `DocsSidebarLink` and `DocsSidebarSection` read `usePathname()`. `SiteHeader` does the same for its nav.
- **Dates** use `formatDate()`, which formats in UTC so server and client output match.
- **Toasts:** `<Toaster />` (sonner) is mounted once in the root layout.
- **Avatars** use the Radix `AvatarImage`, not `next/image`, so the initials fallback still works. This is the one exception to the `next/image` rule.

## NewsletterForm action

`NewsletterForm` validates the email client-side, then calls `action(email)` and expects `{ ok: true }` or `{ ok: false, message? }`. Pass a server action. No real provider is wired up yet; the preview page uses a fake one (`src/app/dev/components/_components/newsletter-demo.tsx`).

## Content

`src/lib/content.ts` holds `site`, `mainNav`, `headerCtas`, `footer` and `uiCopy` (all microcopy). The tagline, nav targets and social URLs are **placeholders** marked with a TODO. Landing and pricing copy lives in `home` and `pricing` (see [marketing-pages.md](marketing-pages.md)). The preview page's sample data stays in `src/app/dev/components/_data.ts`.
