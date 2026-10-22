import Link from "next/link";

import { PersonAvatar } from "@/components/common/person-avatar";
import { uiCopy } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Person } from "@/lib/types";
import { cn } from "@/lib/utils";

type AuthorBylineProps = {
  author: Person;
  /** ISO date. */
  date?: string;
  /** Minutes. */
  readingTime?: number;
  size?: "sm" | "default";
  className?: string;
};

function AuthorByline({ author, date, readingTime, size = "default", className }: AuthorBylineProps) {
  const meta = [
    date && (
      <time key="date" dateTime={date}>
        {formatDate(date)}
      </time>
    ),
    readingTime && <span key="time">{uiCopy.blog.readingTime(readingTime)}</span>,
  ].filter(Boolean);

  return (
    <div data-slot="author-byline" className={cn("flex items-center gap-3", className)}>
      <PersonAvatar person={author} size={size === "sm" ? "default" : "lg"} />
      <div className={cn("flex flex-col", size === "sm" ? "text-xs" : "text-sm")}>
        {author.href ? (
          <Link href={author.href} className="font-medium hover:underline">
            {author.name}
          </Link>
        ) : (
          <span className="font-medium">{author.name}</span>
        )}
        {meta.length > 0 && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            {meta.map((item, i) => [
              i > 0 && <span key={`sep-${i}`} aria-hidden="true">·</span>,
              item,
            ])}
          </span>
        )}
      </div>
    </div>
  );
}

export { AuthorByline };
