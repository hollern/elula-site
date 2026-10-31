"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type DocsSidebarSectionProps = {
  title: string;
  /** Every page href in the section; the section opens when one is the current page. */
  hrefs: string[];
  children: ReactNode;
};

// A collapsible DocsSidebar section, closed by default. It opens whenever the
// pathname moves into it, and otherwise keeps whatever the reader toggled
// (the docs layout persists across navigations).
function DocsSidebarSection({ title, hrefs, children }: DocsSidebarSectionProps) {
  const pathname = usePathname();
  const containsActive = hrefs.includes(pathname);
  const [open, setOpen] = useState(containsActive);
  const [openedFor, setOpenedFor] = useState(pathname);

  if (pathname !== openedFor) {
    setOpenedFor(pathname);
    if (containsActive) setOpen(true);
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col gap-1">
      <h2>
        <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium tracking-wide text-foreground uppercase transition-colors hover:bg-muted">
          {title}
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
          />
        </CollapsibleTrigger>
      </h2>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

export { DocsSidebarSection };
