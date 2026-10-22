# CLAUDE.md

## Project
Marketing site for Elula: SaaS landing page, blog, and docs.
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui.

## Commands
- `yarn dev` — start dev server
- `yarn build` — production build (run before finishing any task)
- `yarn lint` — lint
- Add shadcn components with `npx shadcn@latest add <name>` (Yarn 1, so no `yarn dlx`)

## Page concepts
- The site will initially serve three primary purposes: the marketing/landing experience (e.g., homepage, pricing, features), the blog, and the product documentation.
- These areas should share a cohesive overall brand, design language, and visual identity, while still feeling distinct and purpose-built.
- The navigation, page structure, and user experience can vary between the landing page, blog, and docs to reflect their different purposes.

## Structure
- `src/app/` — routes, layouts, metadata
- `src/components/ui/` — generated shadcn primitive components; don't hand-edit unless necessary
- `src/components/common/` — business level wrappers of ui components
- `src/components/layout` — general layout components; we need to have initial layouts for home page, blog, and docs
- `src/components/sections/` — landing page sections, one per file
- `src/lib/content.ts` — all marketing copy, features, pricing, FAQs as data
- `src/hooks/` — reusable logic to be used throughout the application
- `src/lib` — utilities

## Conventions
- Server components by default; add `"use client"` only for interactivity
- Use existing shadcn components before writing custom UI
- Style with Tailwind utilities and theme tokens (`bg-background`, `text-muted-foreground`), never hardcoded colors
- Icons from `lucide-react`
- Images via `next/image`; one `h1` per page
- Keep copy out of JSX; put it in `src/lib/content.ts`
- Must work in light and dark mode and on mobile

## Documentation
- Create md files to document important design decisions, processes, workflows, and other items that may got lost when context is cleared.
- Save these md files in the `docs` directory of this project.
- Add references into this `CLAUDE.md` file to be added into context when needed.

### Reference docs
- `docs/ui-components.md`: read before adding or changing UI components. Covers shadcn setup (radix-nova, `cn` package), theme tokens, dark mode, the `ui/` vs `common/` split, the Data Table (TanStack Table v9 API) and the `/dev/ui` preview page.
- `docs/business-components.md`: read before building pages or changing `src/components/common`. Catalogs the layout, shell, landing, blog and docs components, the `/dev/components` preview, and gotchas (Cache Components and the clock, Shiki, Prose tokens, status tokens).
- `docs/ui-primitives-plan.md`: the original plan for the baseline primitives, now implemented.
