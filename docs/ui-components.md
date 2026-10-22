# UI Components

How the component layer is set up and how to extend it. The original proposal is in [ui-primitives-plan.md](ui-primitives-plan.md).

## Setup

- **shadcn CLI v4**, `radix-nova` style: Radix primitives, Lucide icons, `neutral` base color. Config lives in `components.json`.
- Radix comes from the unified `radix-ui` package, not individual `@radix-ui/react-*` packages.
- **`cn()`** comes from shadcn's `cn` package, which replaces clsx + tailwind-merge. Generated files import it from `"cn"`. Hand-written code imports it from `@/lib/utils`.
- **Theme tokens** live in `src/app/globals.css`:
  - `:root` holds light values and `.dark` holds dark values, all in oklch.
  - `@theme inline` maps them to Tailwind utilities such as `bg-primary` and `text-muted-foreground`.
  - To rebrand, change the tokens, not the components.
  - Beyond the shadcn set there are semantic `--info`, `--success` and `--warning` tokens (used by `Callout`) and a `prose-tokens` utility that points `@tailwindcss/typography` at the tokens.
- **Fonts:**
  - `--font-sans` maps to Geist (`--font-geist-sans`, set in `layout.tsx`).
  - `--font-heading` defaults to the sans font. Point it at a display font later if the brand wants one.
  - Watch out: `shadcn init` wrote `--font-sans: var(--font-sans)`, which refers to itself and is invalid. It was fixed by hand, so re-check it if `init` is ever re-run.

## Dark mode

- `next-themes` runs through `src/components/common/theme-provider.tsx`:
  - `attribute="class"`
  - `defaultTheme="system"`
  - `disableTransitionOnChange`
- `<html suppressHydrationWarning>` is required because next-themes sets the class before hydration. This follows the Next 16 "Preventing flash before hydration" guide.
- `ThemeToggle` (`common/theme-toggle.tsx`) swaps its icons with `dark:` classes rather than reading theme state. That keeps the server and client render identical, so there's no hydration mismatch.

## Where things go

| Folder | Contents | Rules |
|---|---|---|
| `src/components/ui/` | Generated shadcn primitives | Don't hand-edit. Regenerate with the CLI instead. |
| `src/components/common/` | Hand-written wrappers and composites | Import from `ui/`. Copy comes from `src/lib/content.ts`. |

### Primitives in `ui/`

accordion, alert, avatar, badge, button, button-group, card, field, input, input-group, item, label\*, navigation-menu, separator, sheet, sonner, switch, table, tabs, textarea\*

\* `label` and `textarea` were pulled in as dependencies of `field` and `input-group`.

### Hand-written components in `common/`

- `theme-provider.tsx` and `theme-toggle.tsx`.
- `typography.tsx`:
  - Components: `H1`–`H4`, `P`, `Lead`, `Large`, `Small`, `Muted`, `InlineCode`, `Blockquote` and `List`.
  - Each accepts `as` to change the rendered element. Use it to keep one `h1` per page, e.g. `<H1 as="p">` for an h1-sized display line.
- `data-table.tsx`: a generic table on **TanStack Table v9**. More below.
- The business components (layout, shell, landing, blog and docs) are documented in [business-components.md](business-components.md) and previewed at `/dev/components`.

## Data Table (TanStack Table v9)

shadcn's data-table guide targets v8. v9 changed the API:

- `useReactTable` became `useTable`.
- Features must be registered explicitly with `tableFeatures()`.
- Types take a features parameter, e.g. `ColumnDef<TFeatures, TData, TValue>`.

`DataTable` registers sorting, column filtering and pagination once, at module level, as `dataTableFeatures`. Consumers build columns with the pre-bound helper:

```tsx
"use client";
const helper = createDataTableColumnHelper<Customer>();
const columns = helper.columns([
  helper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  }),
  helper.accessor("email", { header: "Email" }),
]);

<DataTable columns={columns} data={rows} filterColumn="email" pageSize={10} />
```

Rules:

- **Columns must be defined in a client module, at module scope.** They contain render functions, which can't cross the server/client boundary. TanStack also needs them to be referentially stable.
- To add a feature such as row selection or column visibility, add it to `dataTableFeatures` and add UI for it. Feature APIs simply don't exist until the feature is registered.
- The package ships its own guides in `node_modules/@tanstack/react-table/skills/` and `node_modules/@tanstack/table-core/skills/`. Read those before changing table code.

## Adding components

```bash
npx shadcn@latest add <name>
```

- The project uses Yarn 1, so there's no `yarn dlx`.
- The CLI installs dependencies with yarn and pulls in any registry dependencies.
- After adding a component, add a sample of it to the preview page.

## Preview page: `/dev/ui`

- Lives at `src/app/dev/ui/`. It renders every primitive, with the header nav switching to a sheet on mobile.
- Calls `notFound()` in production (checked: `next start` returns 404) and is marked `noindex`.
- Demo content lives in `_data.ts` next to the route, because it isn't product copy. The client-only data-table demo is in `_components/`.
- Use it to check light/dark mode and a 375px viewport after changing tokens or components.

## Copy

UI microcopy, such as the table's "No results." and "Next" and the theme toggle's label, lives in `uiCopy` in `src/lib/content.ts`, following CLAUDE.md.
