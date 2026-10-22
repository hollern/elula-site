import { Fragment } from "react";
import { Check, Minus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { uiCopy } from "@/lib/content";
import type { PlanComparisonGroup, PlanComparisonValue, PricingTier } from "@/lib/types";
import { cn } from "@/lib/utils";

type PlanComparisonProps = {
  /** Column order and highlight come from the tiers; values are looked up by `name`. */
  tiers: Pick<PricingTier, "name" | "highlighted">[];
  groups: PlanComparisonGroup[];
  /** Screen-reader caption describing the table. */
  caption: string;
  className?: string;
};

function ComparisonValue({ value }: { value: PlanComparisonValue | undefined }) {
  const copy = uiCopy.pricing;

  if (typeof value === "string") return <span>{value}</span>;
  if (value) {
    return (
      <>
        <Check className="mx-auto size-4 text-primary" aria-hidden="true" />
        <span className="sr-only">{copy.included}</span>
      </>
    );
  }
  return (
    <>
      <Minus className="mx-auto size-4 text-muted-foreground/60" aria-hidden="true" />
      <span className="sr-only">{copy.notIncluded}</span>
    </>
  );
}

// The feature column stays pinned while the plan columns scroll on small screens.
const stickyColumn = "sticky left-0 z-10 bg-background";

function PlanComparison({ tiers, groups, caption, className }: PlanComparisonProps) {
  return (
    <div data-slot="plan-comparison" className={cn("overflow-hidden rounded-xl ring-1 ring-border", className)}>
      <Table className="min-w-[36rem] table-fixed">
        <TableCaption className="sr-only">{caption}</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(stickyColumn, "h-14 w-40 px-4 sm:w-2/5")}>
              {uiCopy.pricing.featureColumn}
            </TableHead>
            {tiers.map((tier) => (
              <TableHead
                key={tier.name}
                scope="col"
                className={cn(
                  "h-14 px-4 text-center font-heading text-base",
                  tier.highlighted && "bg-primary/5 text-primary",
                )}
              >
                {tier.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <Fragment key={group.title}>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead
                  scope="colgroup"
                  colSpan={tiers.length + 1}
                  className="px-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                >
                  {/* Sticky so the label stays in view while the plan columns scroll. */}
                  <span className="sticky left-4">{group.title}</span>
                </TableHead>
              </TableRow>
              {group.rows.map((row) => (
                <TableRow key={row.feature}>
                  <TableHead
                    scope="row"
                    className={cn(stickyColumn, "h-auto px-4 py-3 font-normal whitespace-normal")}
                  >
                    <span className="block">{row.feature}</span>
                    {row.description && (
                      <span className="block text-xs text-muted-foreground">{row.description}</span>
                    )}
                  </TableHead>
                  {tiers.map((tier) => (
                    <TableCell
                      key={tier.name}
                      className={cn(
                        "px-4 py-3 text-center whitespace-normal",
                        tier.highlighted && "bg-primary/5",
                      )}
                    >
                      <ComparisonValue value={row.values[tier.name]} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { PlanComparison };
