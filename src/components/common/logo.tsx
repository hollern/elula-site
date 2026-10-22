import type { ComponentProps } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { site, uiCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

const logoVariants = cva(
  "inline-flex shrink-0 items-center font-heading font-semibold tracking-tight text-foreground",
  {
    variants: {
      size: {
        sm: "gap-1.5 text-base [&_svg]:size-6",
        md: "gap-2 text-lg [&_svg]:size-7",
        lg: "gap-2.5 text-2xl [&_svg]:size-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type LogoProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof logoVariants> & {
    /** `icon` shows just the mark; `full` adds the wordmark. */
    variant?: "icon" | "full";
    /** Wraps the logo in a link, e.g. "/" in the site header. */
    href?: string;
  };

// Placeholder mark until the brand has a final logo: a lowercase "e" in a
// rounded square, drawn with theme tokens so it follows light/dark mode.
function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M9.5 16h13a6.5 6.5 0 1 0-1.9 4.6"
        fill="none"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      />
    </svg>
  );
}

function Logo({ className, size, variant = "full", href, ...props }: LogoProps) {
  const content = (
    <span data-slot="logo" className={cn(logoVariants({ size }), className)} {...props}>
      <LogoMark />
      {variant === "full" ? (
        <span>{site.name}</span>
      ) : (
        !href && <span className="sr-only">{site.name}</span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label={uiCopy.logo.homeLabel}
      className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {content}
    </Link>
  );
}

export { Logo, LogoMark, logoVariants };
