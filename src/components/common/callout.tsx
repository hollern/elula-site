import type { ComponentProps, ReactNode } from "react";
import { CircleAlert, Info, Lightbulb, TriangleAlert, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { uiCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

// Colors come from the --info/--success/--warning/--destructive tokens in
// globals.css, so callouts follow light/dark mode.
const calloutVariants = cva("not-prose my-6 px-4 py-3 text-foreground", {
  variants: {
    variant: {
      note: "border-info/30 bg-info/5 *:[svg]:text-info",
      tip: "border-success/30 bg-success/5 *:[svg]:text-success",
      warning: "border-warning/40 bg-warning/10 *:[svg]:text-warning",
      danger: "border-destructive/30 bg-destructive/5 *:[svg]:text-destructive",
    },
  },
  defaultVariants: {
    variant: "note",
  },
});

const icons: Record<NonNullable<VariantProps<typeof calloutVariants>["variant"]>, LucideIcon> = {
  note: Info,
  tip: Lightbulb,
  warning: TriangleAlert,
  danger: CircleAlert,
};

type CalloutProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof calloutVariants> & {
    /** Defaults to the variant name ("Note", "Tip"...). Pass `false` to hide. */
    title?: ReactNode | false;
  };

function Callout({ className, variant = "note", title, children, ...props }: CalloutProps) {
  const key = variant ?? "note";
  const Icon = icons[key];
  const heading = title === undefined ? uiCopy.callout[key] : title;

  return (
    <Alert
      data-slot="callout"
      data-variant={key}
      // Static docs content, so don't announce it like a live alert.
      role="note"
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      <Icon />
      {heading !== false && <AlertTitle>{heading}</AlertTitle>}
      <AlertDescription className="text-foreground/80 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export { Callout, calloutVariants };
