"use client";

import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
} from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";

import { customers, dataTableColumns as labels, type Customer } from "../_data";

// Column defs contain render functions, so they must live in a client module.
// Module scope keeps them referentially stable, as TanStack Table requires.
const helper = createDataTableColumnHelper<Customer>();

const columns = helper.columns([
  helper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={labels.name} />
    ),
  }),
  helper.accessor("email", { header: labels.email }),
  helper.accessor("plan", {
    header: labels.plan,
    cell: ({ getValue }) => <Badge variant="secondary">{getValue()}</Badge>,
  }),
  helper.accessor("seats", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={labels.seats} />
    ),
  }),
]);

export function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={customers}
      filterColumn="email"
      filterPlaceholder={labels.filterPlaceholder}
      pageSize={5}
    />
  );
}
