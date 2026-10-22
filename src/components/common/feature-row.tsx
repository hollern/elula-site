import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureRowProps = {
  title: string;
  description: string;
  points?: string[];
  /** Screenshot or illustration beside the copy. */
  media: ReactNode;
  /** Puts the media on the left on large screens. Alternate it for a zig-zag list. */
  reverse?: boolean;
  /** Heading level. Defaults to h3, under a section's h2. */
  titleAs?: "h2" | "h3";
  className?: string;
};

function FeatureRow({
  title,
  description,
  points,
  media,
  reverse = false,
  titleAs: Title = "h3",
  className,
}: FeatureRowProps) {
  return (
    <div
      data-slot="feature-row"
      className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", className)}
    >
      <div className={cn("flex flex-col gap-4", reverse && "lg:order-last")}>
        <Title className="font-heading text-2xl font-semibold tracking-tight text-balance">{title}</Title>
        <p className="text-lg text-pretty text-muted-foreground">{description}</p>
        {points && points.length > 0 && (
          <ul className="mt-2 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex gap-2">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>{media}</div>
    </div>
  );
}

export { FeatureRow };
