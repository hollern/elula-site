import type { Stat } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatGridProps = {
  stats: Stat[];
  className?: string;
};

/** Headline figures in a row. Renders as a description list: label is the term, value the detail. */
function StatGrid({ stats, className }: StatGridProps) {
  return (
    <dl
      data-slot="stat-grid"
      className={cn(
        // The 1px gap over a border-colored background draws the dividers at any column count.
        "grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border",
        stats.length === 2 && "sm:grid-cols-2",
        stats.length === 3 && "sm:grid-cols-3",
        stats.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-2 bg-card p-8 text-center">
          <dt className="flex flex-col gap-1">
            <span className="font-medium">{stat.label}</span>
            {stat.description && (
              <span className="text-sm text-muted-foreground">{stat.description}</span>
            )}
          </dt>
          <dd className="font-heading text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { StatGrid };
