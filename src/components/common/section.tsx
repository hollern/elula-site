import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Container, type ContainerProps } from "@/components/common/container";
import { cn } from "@/lib/utils";

const sectionVariants = cva(
  // scroll-mt clears the sticky header when jumping to an anchor id.
  "scroll-mt-16",
  {
    variants: {
      variant: {
        default: "bg-background",
        muted: "bg-muted/50",
        accent: "bg-accent text-accent-foreground",
      },
      spacing: {
        sm: "py-10 md:py-14",
        default: "py-16 md:py-24",
        lg: "py-20 md:py-32",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "default",
    },
  },
);

type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    /** Width of the inner Container. Pass `false` to render children unwrapped. */
    container?: ContainerProps["size"] | false;
  };

function Section({
  className,
  variant,
  spacing,
  container = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ variant, spacing }), className)}
      {...props}
    >
      {container === false ? children : <Container size={container}>{children}</Container>}
    </section>
  );
}

export { Section, sectionVariants };
