# Marketing Pages

The home page (`/`) and pricing page (`/pricing`). They're built from the business components in [business-components.md](business-components.md).

## Routing and layout

- Both pages live in the `src/app/(marketing)/` route group. Its `layout.tsx` renders `MarketingLayout`, so every page in the group gets the same navbar and footer.
- `MarketingLayout` (`src/components/layout/marketing-layout.tsx`) is made of:
  - a skip link to `#main`,
  - `MarketingHeader`: `SiteHeader` with `mainNav` and `headerCtas` (Get started and Log in),
  - `<main id="main">`,
  - `MarketingFooter`: `SiteFooter` with `footer` from content.
- `MarketingHeader` and `MarketingFooter` are also exported on their own. Blog and docs layouts can reuse them, or pass their own props to `SiteHeader` (for example `containerSize="full"` for docs).
- Site-wide metadata is in the root `layout.tsx`. The title template is `%s | Elula`. Pages set `metadata` from `content.ts`, for example `pricing.metadata`.

## Sections (`src/components/sections/`)

There is one file per section. Each section reads its copy straight from `content.ts`, so pages only arrange the sections.

| Page | Section | File | Anchor |
|---|---|---|---|
| Home | `HomeHero` | `home-hero.tsx` | – |
| | `ProblemSolution` | `problem-solution.tsx` | `#solution` |
| | `Benefits` | `benefits.tsx` | `#benefits` |
| | `UseCases` | `use-cases.tsx` | `#use-cases` |
| | `FinalCta` | `final-cta.tsx` | – |
| Pricing | `PricingPlans` | `pricing-plans.tsx` | – |
| | `PricingComparison` | `pricing-comparison.tsx` | `#compare` |

- The pricing page ends with `CtaBanner` (muted variant), using `pricing.finalCta`.
- The anchors are linked from the Product dropdown in `mainNav` and from the footer. If you rename an anchor, update the links in `content.ts` too.
- `HomeHero` draws a **placeholder product preview** with theme tokens (`ProductPreview`). Replace it with a `next/image` screenshot when real product shots exist.

## Content (`src/lib/content.ts`)

- `home`: hero, problemSolution, benefits, useCases and finalCta.
- `pricing`: metadata, header, tiers, annualSavings, perSeatNote, comparison and finalCta.
- All of this copy, including the plans and prices, is a **placeholder** and marked TODO.

## Plan comparison table

`PlanComparison` (`src/components/common/plan-comparison.tsx`) is a server component built on the `ui/table` primitive.

- Columns come from `PricingTier[]`, so they stay in the same order as the pricing cards, and the highlighted tier is tinted in both.
- Rows are `PlanComparisonGroup[]`:
  - Each row's `values` is keyed by tier `name`.
  - `true` shows a check, and `false` or a missing key shows a dash. Both have screen-reader text from `uiCopy.pricing`.
  - A string value is shown as is.
  - When you rename a tier, rename its keys in `comparisonGroups` too.
- On small screens the table scrolls horizontally (`min-w-[36rem]`). The feature column and the group labels are sticky, so they stay in view.
