"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { uiCopy } from "@/lib/content";

/**
 * Below `md` the docs sidebar moves into a sheet. Pass the `DocsSidebar` as
 * children. The sheet remembers the path it opened on, so following a link
 * closes it without an effect.
 */
function DocsMobileNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);

  return (
    <Sheet open={openOn === pathname} onOpenChange={(open) => setOpenOn(open ? pathname : null)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <PanelLeft aria-hidden="true" />
          {uiCopy.docs.menuLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle>{uiCopy.docs.navLabel}</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-2 pb-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export { DocsMobileNav };
