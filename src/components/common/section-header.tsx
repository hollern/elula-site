import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { H2, Lead } from "@/components/common/typography";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sectionHeaderVariants = cva("flex flex-col gap-4", {
  variants: {
    align: {
      center: "mx-auto max-w-2xl items-center text-center",
      left: "max-w-2xl items-start text-left",
    },
  },
  defaultVariants: {
    align: "center",
  },
});

type SectionHeaderProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof sectionHeaderVariants> & {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    /** Heading level. Defaults to h2; use h1 when this heads the page. */
    titleAs?: "h1" | "h2" | "h3";
  };

function SectionHeader({
  className,
  align,
  eyebrow,
  title,
  subtitle,
  titleAs = "h2",
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(sectionHeaderVariants({ align }), className)}
      {...props}
    >
      {eyebrow && <Badge variant="outline">{eyebrow}</Badge>}
      <H2 as={titleAs} className="border-none pb-0 text-3xl text-balance md:text-4xl">
        {title}
      </H2>
      {subtitle && <Lead className="text-pretty">{subtitle}</Lead>}
    </div>
  );
}

export { SectionHeader, sectionHeaderVariants };
