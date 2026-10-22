"use client";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { uiCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  className?: string;
};

function CopyButton({ value, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  const label = copied ? uiCopy.codeBlock.copied : uiCopy.codeBlock.copy;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      title={label}
      onClick={() => copy(value)}
      className={cn("text-muted-foreground", className)}
    >
      {copied ? <Check /> : <Copy />}
      <span aria-live="polite" className="sr-only">
        {copied ? uiCopy.codeBlock.copied : ""}
      </span>
    </Button>
  );
}

export { CopyButton };
