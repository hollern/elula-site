import { cva, type VariantProps } from "class-variance-authority";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Feature } from "@/lib/types";
import { cn } from "@/lib/utils";

type FeatureCardProps = Feature & {
  /** `card` sits on a bordered surface; `plain` is just icon and text. */
  variant?: "card" | "plain";
  className?: string;
};

function FeatureIcon({ icon: Icon }: Pick<Feature, "icon">) {
  return (
    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/5 text-primary ring-1 ring-border">
      <Icon className="size-5" aria-hidden="true" />
    </div>
  );
}

function FeatureCard({ icon, title, description, variant = "card", className }: FeatureCardProps) {
  if (variant === "plain") {
    return (
      <div data-slot="feature-card" className={cn("flex flex-col gap-3", className)}>
        <FeatureIcon icon={icon} />
        <h3 className="font-heading font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    );
  }

  return (
    <Card data-slot="feature-card" className={cn("h-full", className)}>
      <CardHeader className="gap-3">
        <FeatureIcon icon={icon} />
        <CardTitle className="mt-2">
          <h3>{title}</h3>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

const featureGridVariants = cva("grid gap-6", {
  variants: {
    columns: {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

type FeatureGridProps = VariantProps<typeof featureGridVariants> & {
  features: Feature[];
  variant?: FeatureCardProps["variant"];
  className?: string;
};

function FeatureGrid({ features, columns, variant, className }: FeatureGridProps) {
  return (
    <div data-slot="feature-grid" className={cn(featureGridVariants({ columns }), className)}>
      {features.map((feature) => (
        <FeatureCard key={feature.title} variant={variant} {...feature} />
      ))}
    </div>
  );
}

export { FeatureCard, FeatureGrid, featureGridVariants };
