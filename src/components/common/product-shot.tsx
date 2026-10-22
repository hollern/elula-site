import Image from "next/image";

import type { MediaImage, ProductShotPattern } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductShotProps = {
  /** Real screenshot. When omitted, a placeholder `pattern` is drawn with theme tokens. */
  image?: MediaImage;
  pattern?: ProductShotPattern;
  /** Accessible name for the placeholder. */
  label: string;
  /** Pass for above-the-fold shots, e.g. in a hero. */
  priority?: boolean;
  className?: string;
};

function BoardPattern() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[3, 2, 3].map((cards, c) => (
        <div key={c} className="flex flex-col gap-2 rounded-lg bg-muted/50 p-2">
          <span className="h-2.5 w-14 rounded bg-muted-foreground/25" />
          {Array.from({ length: cards }, (_, i) => (
            <div key={i} className="flex flex-col gap-1.5 rounded-md bg-card p-2 ring-1 ring-border">
              <span className={cn("h-2 w-3/4 rounded", i === c ? "bg-primary/50" : "bg-muted")} />
              <span className="h-2 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ListPattern() {
  return (
    <div className="flex flex-col divide-y rounded-lg ring-1 ring-border">
      {["w-2/3", "w-1/2", "w-3/4", "w-2/5", "w-3/5"].map((width, i) => (
        <div key={width} className="flex items-center gap-3 p-3">
          <span className={cn("size-3 shrink-0 rounded-full", i < 2 ? "bg-primary/60" : "bg-muted")} />
          <span className={cn("h-2.5 rounded bg-muted", width)} />
          <span className="ml-auto h-4 w-12 rounded-full bg-muted" />
        </div>
      ))}
    </div>
  );
}

function ChartPattern() {
  const bars = ["h-1/3", "h-1/2", "h-2/5", "h-2/3", "h-3/5", "h-4/5", "h-full"];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg p-3 ring-1 ring-border">
            <span className="h-2.5 w-12 rounded bg-muted" />
            <span className="h-5 w-16 rounded bg-foreground/15" />
          </div>
        ))}
      </div>
      <div className="flex h-32 items-end gap-2 rounded-lg p-3 ring-1 ring-border">
        {bars.map((height, i) => (
          <span
            key={height}
            className={cn("flex-1 rounded-t", height, i === bars.length - 1 ? "bg-primary/60" : "bg-muted")}
          />
        ))}
      </div>
    </div>
  );
}

const patterns: Record<ProductShotPattern, () => React.JSX.Element> = {
  board: BoardPattern,
  list: ListPattern,
  chart: ChartPattern,
};

/** A framed product screenshot, or a token-drawn placeholder until one exists. */
function ProductShot({ image, pattern = "board", label, priority, className }: ProductShotProps) {
  const frame = "overflow-hidden rounded-xl bg-card shadow-xl ring-1 ring-border";

  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(frame, "h-auto w-full", className)}
      />
    );
  }

  const Pattern = patterns[pattern];

  return (
    <div data-slot="product-shot" role="img" aria-label={label} className={cn(frame, className)}>
      <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-4 h-4 w-32 rounded bg-muted" />
      </div>
      <div className="p-4 md:p-6">
        <Pattern />
      </div>
    </div>
  );
}

export { ProductShot };
