# Plan: Baseline UI Primitives (shadcn/ui)

Status: **implemented**. See [ui-components.md](ui-components.md) for the as-built reference.

Differences between this plan and what was built:

- The CLI v4 preset is `radix-nova`, not `new-york`.
- `cn` comes from shadcn's `cn` package, not clsx + tailwind-merge.
- TanStack Table is v9, not v8.

## Current state

- shadcn is **not initialized** yet: there is no `components.json`, no `src/lib/utils.ts`, and no `src/components/`.
- `src/app/globals.css` is the Create Next App default: two hex tokens (`--background`, `--foreground`) and dark mode via `prefers-color-scheme` only.
- Stack: Next 16.4, React 19.3, Tailwind v4, Yarn 1. The `@/*` alias points to `src/*`.

## Phase 1: Initialize shadcn

1. Run `npx shadcn@latest init`:
   - Style: `new-york` (the default). Base color: `neutral`, or whichever color fits the Elula brand.
   - CSS variables: yes.
   - It writes `components.json` and `src/lib/utils.ts` (`cn()`), adds the full token set (`--primary`, `--muted`, `--border`, `--ring`, `--radius`, `--chart-*`, `--sidebar-*`) to `globals.css`, and installs `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` and `tw-animate-css`.
2. Check the generated `components.json` aliases:
   - `ui → @/components/ui`
   - `components → @/components`
   - `lib → @/lib`
   - `hooks → @/hooks`
3. Clean up `globals.css`:
   - Delete the leftover `body { font-family: Arial }` rule so Geist (`--font-sans`) takes effect.
   - Replace the `prefers-color-scheme` block with shadcn's `.dark` class tokens.

## Phase 2: Dark mode plumbing

shadcn's dark mode is class-based, so the site needs a theme provider:

- `yarn add next-themes`
- `src/components/common/theme-provider.tsx` (`"use client"`): wraps `next-themes` with `attribute="class"`, `defaultTheme="system"` and `enableSystem`.
- Wrap `children` in `src/app/layout.tsx` and add `suppressHydrationWarning` to `<html>`.
- Optional: a `ThemeToggle` in `common/` built on `Button` and lucide `Sun`/`Moon`.

## Phase 3: Add the registry components

Install them all in one command:

```bash
npx shadcn@latest add navigation-menu button sheet badge card avatar switch tabs table accordion input separator button-group field input-group item
```

| Component | Registry name | Notes / pulled-in deps |
|---|---|---|
| Navigation Menu | `navigation-menu` | Radix. Main nav for the marketing site. |
| Button | `button` | CVA variants. Most other components depend on it. |
| Sheet | `sheet` | Radix Dialog. Mobile nav drawer and docs sidebar on mobile. |
| Badge | `badge` | Pricing tags, blog categories, "New" labels. |
| Card | `card` | Features, pricing tiers, blog previews. |
| Avatar | `avatar` | Blog authors, testimonials. |
| Switch | `switch` | Monthly/annual pricing toggle. |
| Tabs | `tabs` | Code examples in docs, feature showcases. |
| Table | `table` | Plain styled table: pricing comparison, docs reference tables. |
| Accordion | `accordion` | FAQs. |
| Input | `input` | Newsletter signup, docs search. |
| Separator | `separator` | |
| Button Group | `button-group` | |
| Field | `field` | Form layout primitive. Also pulls in `label`. |
| Input Group | `input-group` | Inputs with icons, addons or buttons. Also pulls in `textarea`. |
| Item | `item` | Generic list row: feature lists, docs link lists. |

The CLI resolves shared dependencies (`button`, `separator`, `label`, `textarea`) automatically, so a few extra files will appear in `ui/`.

Don't hand-edit the generated files. Brand changes go through the CSS tokens in `globals.css`, not through component code.

## Phase 4: The two non-registry items

shadcn does not ship **Data Table** or **Typography** as installable components. Both are documented patterns, so they are hand-written. Per CLAUDE.md, `ui/` holds only generated primitives, so both go in `common/`.

### Data Table: `src/components/common/data-table.tsx`

- `yarn add @tanstack/react-table`
- A generic `DataTable<TData, TValue>({ columns, data })` built on `ui/table`, following the shadcn data-table guide.
- `"use client"`, because TanStack Table holds state.
- Baseline features: sorting, optional filter input, pagination. Column visibility and row selection need `dropdown-menu` and `checkbox`; add them only when a real use case shows up.
- Column definitions stay with the page that uses them.

### Typography: `src/components/common/typography.tsx`

- Small server components that apply the shadcn typography classes: `H1`–`H4`, `P`, `Lead`, `Large`, `Small`, `Muted`, `InlineCode`, `Blockquote` and `List`.
- Each one accepts `className` (merged with `cn()`) and an `asChild`-style `as` prop, so the visual heading style can differ from the semantic level. This keeps the "one `h1` per page" rule easy to follow.
- Later (out of scope here): long-form blog and docs content will probably want `@tailwindcss/typography` (`prose`) for MDX.

## Phase 5: Verification

- Add a dev-only preview route, `src/app/dev/ui/page.tsx`, that renders every primitive. It calls `notFound()` when `NODE_ENV === "production"`.
- Check the preview in light and dark mode and at mobile width (375px).
- Run `yarn lint` and `yarn build`.
- Before writing route code, read the Next 16 docs in `node_modules/next/dist/docs/`, as AGENTS.md requires.

## Phase 6: Documentation

- Add `docs/ui-components.md` covering:
  - the `ui/` vs `common/` split
  - how to add new shadcn components
  - token and theming rules
  - the dark-mode setup
  - where Data Table and Typography live
- Reference it from `CLAUDE.md`.

## Open decisions

- **Base color / brand palette:** is there an Elula brand color for `--primary`?
- **Data Table and Typography location:** `common/` (recommended above) or `ui/` as originally requested?
- **Preview route:** keep `/dev/ui` long term as a kitchen sink, or delete it after verification?
