# Product Pages

Feature and product pages live at `/product/{slug}`, one per entry in `products`. The structure is modeled on UpKeep's product pages (for example `upkeep.com/product/work-order-software/`): a hero with a screenshot, social proof, zig-zag feature rows, a capability grid, stats, quotes, an FAQ and a closing CTA.

## Files

| What | Where |
|---|---|
| Route (static, one page per product) | `src/app/(marketing)/product/[slug]/page.tsx` |
| Copy and data | `src/lib/product-content.ts` (`products`, `getProduct`, `productHref`) |
| Data shape | `Product` and `ProductHighlight` in `src/lib/types.ts` |
| Sections | `src/components/sections/product/` |
| New shared components | `ProductShot`, `FeatureRow` and `StatGrid` in `src/components/common/` |
| Placeholder customer logos | `public/logos/placeholder-*.svg` |

The route sits in the `(marketing)` group, so it gets `MarketingLayout` (see [marketing-pages.md](marketing-pages.md)).

## Page structure

| Order | Section | Anchor | Required | Background |
|---|---|---|---|---|
| 1 | `ProductHero`: split hero (`tone="dark"`), `h1`, `ProductShot` in a bezel beside the copy | – | yes | `bg-hero` (navy, both themes) |
| 2 | `ProductLogos`: `LogoCloud` | – | `logos` | default |
| 3 | `ProductHighlights`: `FeatureRow`s that alternate sides | `#features` | yes | default |
| 4 | `ProductCapabilities`: 3-column `FeatureGrid` | `#capabilities` | yes | muted |
| 5 | `ProductStats`: `StatGrid` | `#results` | `stats` | default |
| 6 | `ProductTestimonials`: `TestimonialCard`s (2 are centered, 3+ use a 3-column grid) | `#customers` | `testimonials` | muted |
| 7 | `ProductFaq`: `FaqList` | `#faq` | `faqs` | default |
| 8 | `CtaBanner` (primary) from `finalCta` | – | yes | primary |

Optional blocks are skipped when the key is missing. Unlike the home sections, product sections take their data slice as a prop, because the content depends on the slug.

## Adding a product

1. Add an entry to `products` in `src/lib/product-content.ts`. The `slug` becomes the URL.
2. The entry automatically shows up in:
   - the Product nav dropdown (in array order),
   - `generateStaticParams`, so it's prerendered at build time,
   - the page metadata (`metadata` + a canonical URL).
3. Unknown slugs call `notFound()` in both `generateMetadata` and the page. `dynamicParams` isn't available with Cache Components.

## Partial Prefetching and `params`

Partial Prefetching (`next.config.ts`) shares one App Shell across every URL of a route, so reading `params` at the top of the page triggers the dev insight "URL data outside of Suspense". The page component is synchronous. `ProductContent` awaits `params` inside `<Suspense>`, and the fallback is an empty `Section variant="hero"` band, so client navigation shows the dark band rather than a light flash. Known slugs are still prerendered in full.

Because the `notFound()` happens in a streamed boundary, an unknown slug responds with HTTP 200, the 404 UI and `<meta name="robots" content="noindex">`. That's expected Next.js streaming behavior.

## Dark hero

- The product hero is a navy band with near-white text in both themes, modeled on UpKeep. `ProductHero` passes `tone="dark"` to `Hero`.
- **Tokens:** `--hero` (background) and `--hero-foreground` (text) in `globals.css`, used as `bg-hero` and `text-hero-foreground`. They're defined only in `:root` because they don't change with the theme. Change them to rebrand the band.
- In `Hero`, `tone="dark"` sets the band and text, a translucent eyebrow badge, the description at `text-hero-foreground/75`, a bezel around the media, and `CtaGroup tone="hero"`, which gives a light primary button and an outlined secondary button.
- `Section variant="hero"` is the same band for any other section. The page's Suspense fallback uses it.
- **No one-off overrides:** `ProductHero` only passes data and `tone="dark"`. All the dark styling lives in the `Hero`, `CtaGroup` and `Section` variants (see CLAUDE.md, "Keep the component library in check").
- This deliberately doesn't use a `.dark` class scope. If the band's CSS ever fails to load, the text would stay readable rather than turning light-on-white.
- **Gotcha:** running `yarn build` while `yarn dev` is running left the dev server serving a stale CSS bundle, missing new tokens and classes. If a new utility doesn't show up in dev, restart `yarn dev`.

## Media

- `ProductShot` takes an optional `image` (`MediaImage`). Without one, it draws a placeholder in theme tokens: `board`, `list` or `chart`.
- Set `image` (rendered with `next/image`) on `hero` or a highlight once real screenshots exist. The hero image loads with `priority`.
- The `mediaLabel` is the placeholder's accessible name. Real images use `image.alt`.

## Navigation

- The Product dropdown is built from `products` in `content.ts`. Dropdown `NavItem`s accept `columns: 1 | 2 | 3`.
- The Product dropdown uses `columns: 3`. It shows 2 columns at `md` so the menu stays inside the viewport, and 3 from `lg`.
- The home anchors (`/#solution`, `/#benefits`, `/#use-cases`) moved out of the dropdown. Benefits and Use cases are still linked from the footer.
- **Import direction:** `content.ts` imports from `product-content.ts`, never the other way, to avoid a circular import.

## Status

- All product copy, stats, customer names, quotes and logos are **placeholders** (marked TODO).
- There is no `/product` index page yet, so that URL returns a 404.
