import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Long-form typography for blog posts and docs (MDX output). Colors come from
 * theme tokens via the `prose-tokens` utility in globals.css. Wrap anything
 * that should keep its own styles, such as CodeBlock, in `not-prose`.
 */
function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "prose max-w-none prose-tokens",
        "prose-headings:scroll-m-20 prose-headings:font-heading prose-headings:tracking-tight",
        "prose-a:font-medium prose-a:underline-offset-4 prose-a:decoration-muted-foreground/50 hover:prose-a:decoration-foreground",
        "prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
        // Inline code only; code inside <pre> keeps the block styling.
        "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-[0.3rem] [&_:not(pre)>code]:py-[0.2rem] [&_:not(pre)>code]:text-sm [&_:not(pre)>code]:font-semibold",
        "prose-pre:border prose-img:rounded-xl",
        className,
      )}
      {...props}
    />
  );
}

export { Prose };
