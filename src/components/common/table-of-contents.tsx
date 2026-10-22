"use client";

import { useId } from "react";

import { useActiveHeading } from "@/hooks/use-active-heading";
import { uiCopy } from "@/lib/content";
import type { TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

function TableOfContents({ items, className }: TableOfContentsProps) {
  const titleId = useId();
  const activeId = useActiveHeading(items.map((item) => item.id));
  if (items.length === 0) return null;

  // Indent relative to the shallowest heading, so h2-less pages still align.
  const minDepth = Math.min(...items.map((item) => item.depth));

  return (
    <nav data-slot="table-of-contents" aria-labelledby={titleId} className={cn("text-sm", className)}>
      <p id={titleId} className="mb-3 font-medium">
        {uiCopy.toc.title}
      </p>
      <ul className="flex flex-col border-l">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                style={{ paddingLeft: `${0.75 + (item.depth - minDepth) * 0.75}rem` }}
                className={cn(
                  "-ml-px block border-l border-transparent py-1 text-muted-foreground transition-colors hover:text-foreground",
                  active && "border-foreground font-medium text-foreground",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { TableOfContents };
