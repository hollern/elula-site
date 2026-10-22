import { cva, type VariantProps } from "class-variance-authority";

import { Container } from "@/components/common/container";
import { CtaGroup } from "@/components/common/cta-group";
import type { Cta } from "@/lib/types";
import { cn } from "@/lib/utils";

const ctaBannerVariants = cva(
  "flex flex-col items-center gap-6 rounded-3xl px-6 py-14 text-center md:px-12 md:py-20",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        muted: "bg-muted text-foreground ring-1 ring-border",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type CtaBannerProps = VariantProps<typeof ctaBannerVariants> & {
  title: string;
  description?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  className?: string;
};

function CtaBanner({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant,
  className,
}: CtaBannerProps) {
  const inverted = variant !== "muted";

  return (
    <section data-slot="cta-banner" className={cn("py-16 md:py-24", className)}>
      <Container>
        <div className={ctaBannerVariants({ variant })}>
          <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "max-w-xl text-lg text-pretty",
                inverted ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}
          <CtaGroup
            primary={primaryCta}
            secondary={secondaryCta}
            align="center"
            tone={inverted ? "inverted" : "default"}
            className="mt-2 w-full sm:w-auto"
          />
        </div>
      </Container>
    </section>
  );
}

export { CtaBanner, ctaBannerVariants };
