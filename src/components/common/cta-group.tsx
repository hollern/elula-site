import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import type { Cta } from "@/lib/types";
import { cn } from "@/lib/utils";

const ctaGroupVariants = cva("flex flex-col gap-3 sm:flex-row", {
  variants: {
    align: {
      start: "sm:justify-start",
      center: "sm:justify-center",
    },
  },
  defaultVariants: {
    align: "start",
  },
});

type CtaGroupProps = ComponentProps<"div"> &
  VariantProps<typeof ctaGroupVariants> & {
    primary: Cta;
    secondary?: Cta;
    size?: "default" | "lg";
    /** `inverted` for `bg-primary` surfaces such as the CTA banner; `hero` for the always-dark `bg-hero` band. */
    tone?: "default" | "inverted" | "hero";
  };

function CtaGroup({
  className,
  align,
  primary,
  secondary,
  size = "lg",
  tone = "default",
  ...props
}: CtaGroupProps) {
  const inverted = tone === "inverted";
  const hero = tone === "hero";

  return (
    <div data-slot="cta-group" className={cn(ctaGroupVariants({ align }), className)} {...props}>
      <Button
        asChild
        size={size}
        variant={inverted ? "secondary" : "default"}
        className={cn("px-4", hero && "bg-hero-foreground text-hero hover:bg-hero-foreground/90")}
      >
        <Link href={primary.href}>
          {primary.label}
          <ArrowRight data-icon="inline-end" />
        </Link>
      </Button>
      {secondary && (
        <Button
          asChild
          size={size}
          variant={inverted || hero ? "ghost" : "outline"}
          className={cn(
            "px-4",
            inverted &&
              "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground dark:hover:bg-primary-foreground/10",
            hero &&
              "text-hero-foreground ring-1 ring-hero-foreground/25 hover:bg-hero-foreground/10 hover:text-hero-foreground dark:hover:bg-hero-foreground/10",
          )}
        >
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      )}
    </div>
  );
}

export { CtaGroup, ctaGroupVariants };
