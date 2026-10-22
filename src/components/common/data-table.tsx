"use client";

import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { uiCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

const copy = uiCopy.dataTable;

// TanStack Table v9 registers features explicitly; this is the set every
// DataTable supports. Must stay module-level so it's referentially stable.
const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
  filterFns: { includesString: filterFn_includesString },
});

type DataTableFeatures = typeof dataTableFeatures;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- column values are heterogeneous
type DataTableColumnDef<TData extends RowData> = ColumnDef<DataTableFeatures, TData, any>;

/** Column helper pre-bound to DataTable's features. Call at module scope. */
function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>();
}

type DataTableProps<TData extends RowData> = {
  /** Must be referentially stable (module scope or memoized). */
  columns: DataTableColumnDef<TData>[];
  data: TData[];
  /** Column id to filter on; renders a filter input when set. */
  filterColumn?: string;
  filterPlaceholder?: string;
  /** Rows per page; pagination controls are hidden when everything fits. */
  pageSize?: number;
  className?: string;
};

function DataTable<TData extends RowData>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = copy.filterPlaceholder,
  pageSize = 10,
  className,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    initialState: { pagination: { pageIndex: 0, pageSize } },
  });

  const filter = filterColumn ? table.getColumn(filterColumn) : undefined;
  const { pageIndex } = table.state.pagination;
  const rows = table.getRowModel().rows;

  return (
    <div data-slot="data-table" className={cn("flex flex-col gap-4", className)}>
      {filter && (
        <Input
          placeholder={filterPlaceholder}
          value={(filter.getFilterValue() as string) ?? ""}
          onChange={(event) => filter.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      )}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {copy.noResults}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-end gap-2">
          <span className="mr-auto text-sm text-muted-foreground">
            {copy.pageStatus(pageIndex + 1, table.getPageCount())}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {copy.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {copy.next}
          </Button>
        </div>
      )}
    </div>
  );
}

type DataTableColumnHeaderProps<TData extends RowData, TValue> = {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
  className?: string;
};

/** Sortable header for use in a column's `header` render function. */
function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <span className={className}>{title}</span>;
  }

  const sorted = column.getIsSorted();
  const Icon =
    sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-2.5", className)}
      onClick={() => column.toggleSorting(sorted === "asc")}
      aria-label={copy.sortLabel(title)}
    >
      {title}
      <Icon data-icon="inline-end" />
    </Button>
  );
}

export {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
  type DataTableColumnDef,
  type DataTableFeatures,
};
