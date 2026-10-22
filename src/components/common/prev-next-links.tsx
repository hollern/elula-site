import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { uiCopy } from "@/lib/content";
import type { NavLink } from "@/lib/types";
import { cn } from "@/lib/utils";

type PrevNextLinksProps = {
  prev?: Pick<NavLink, "title" | "href">;
  next?: Pick<NavLink, "title" | "href">;
  className?: string;
};

function PageLink({ link, direction }: { link: Pick<NavLink, "title" | "href">; direction: "prev" | "next" }) {
  const isNext = direction === "next";

  return (
    <Link
      href={link.href}
      rel={direction}
      className={cn(
        "group flex flex-col gap-1 rounded-xl border p-4 transition-colors hover:bg-muted/50",
        isNext && "items-end text-right sm:col-start-2",
      )}
    >
      <span className="text-sm text-muted-foreground">
        {isNext ? uiCopy.prevNext.next : uiCopy.prevNext.previous}
      </span>
      <span className="flex items-center gap-1 font-medium">
        {!isNext && <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />}
        {link.title}
        {isNext && <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
      </span>
    </Link>
  );
}

function PrevNextLinks({ prev, next, className }: PrevNextLinksProps) {
  if (!prev && !next) return null;

  return (
    <nav
      data-slot="prev-next-links"
      aria-label={uiCopy.prevNext.label}
      className={cn("grid gap-4 sm:grid-cols-2", className)}
    >
      {prev && <PageLink link={prev} direction="prev" />}
      {next && <PageLink link={next} direction="next" />}
    </nav>
  );
}

export { PrevNextLinks };
