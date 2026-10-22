"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

// The only client piece of DocsSidebar: reads the pathname so the sidebar can
// live in a layout, which doesn't know the current page.
function DocsSidebarLink({ href, children }: { href: string; children: ReactNode }) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active && "bg-muted font-medium text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export { DocsSidebarLink };
