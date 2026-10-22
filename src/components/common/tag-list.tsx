import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { uiCopy } from "@/lib/content";
import { slugify } from "@/lib/format";
import { cn } from "@/lib/utils";

type TagListProps = {
  tags: string[];
  /** Tag pages live at `${basePath}/${slug}`. Pass `false` for plain badges. */
  basePath?: string | false;
  className?: string;
};

function TagList({ tags, basePath = "/blog/tags", className }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul
      data-slot="tag-list"
      aria-label={uiCopy.blog.tagsLabel}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {tags.map((tag) => (
        <li key={tag}>
          {basePath ? (
            <Badge asChild variant="secondary">
              <Link href={`${basePath}/${slugify(tag)}`}>{tag}</Link>
            </Badge>
          ) : (
            <Badge variant="secondary">{tag}</Badge>
          )}
        </li>
      ))}
    </ul>
  );
}

export { TagList };
