// All user-facing copy lives here, not in JSX. See CLAUDE.md.

export const uiCopy = {
  themeToggle: {
    label: "Toggle theme",
  },
  dataTable: {
    noResults: "No results.",
    previous: "Previous",
    next: "Next",
    filterPlaceholder: "Filter...",
    pageStatus: (page: number, pageCount: number) =>
      `Page ${page} of ${pageCount}`,
    sortLabel: (column: string) => `Sort by ${column}`,
  },
};
