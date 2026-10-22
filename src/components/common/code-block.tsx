import { FileCode } from "lucide-react";

import { CopyButton } from "@/components/common/copy-button";
import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  /** Any Shiki language id ("tsx", "bash"...). Unknown ids render as plain text. */
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
};

// Async server component: highlighting runs at render time on the server, so
// no highlighter ships to the browser. Only the copy button is a client component.
async function CodeBlock({ code, lang, filename, showLineNumbers, className }: CodeBlockProps) {
  const trimmed = code.replace(/\n$/, "");
  let html = await highlight(trimmed, lang);
  if (showLineNumbers) html = html.replace("<pre ", "<pre data-line-numbers ");

  return (
    <div
      data-slot="code-block"
      className={cn("not-prose group/code relative my-6 overflow-hidden rounded-xl border bg-muted/50", className)}
    >
      {filename ? (
        <div className="flex h-10 items-center gap-2 border-b pr-1.5 pl-4 text-xs text-muted-foreground">
          <FileCode className="size-3.5" aria-hidden="true" />
          <span className="flex-1 truncate font-mono">{filename}</span>
          <CopyButton value={trimmed} />
        </div>
      ) : (
        <CopyButton
          value={trimmed}
          className="absolute top-1.5 right-1.5 z-10 bg-muted/80 opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
        />
      )}
      <div
        className="overflow-x-auto font-mono text-sm leading-relaxed [&_pre]:w-fit [&_pre]:min-w-full [&_pre]:bg-transparent! [&_pre]:p-4"
        // Shiki escapes the code it renders, so this HTML is safe.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export { CodeBlock };
