import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { uiCopy } from "@/lib/content";
import type { Billing, PricingTier } from "@/lib/types";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  tier: PricingTier;
  billing?: Billing;
  className?: string;
};

function PricingCard({ tier, billing = "monthly", className }: PricingCardProps) {
  const copy = uiCopy.pricing;

  return (
    <Card
      data-slot="pricing-card"
      data-highlighted={tier.highlighted || undefined}
      className={cn(
        "h-full gap-6 [--card-spacing:--spacing(6)]",
        tier.highlighted && "shadow-lg ring-2 ring-primary",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>
          <h3 className="text-lg">{tier.name}</h3>
        </CardTitle>
        <CardDescription>{tier.description}</CardDescription>
        {tier.badge && (
          <CardAction>
            <Badge>{tier.badge}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <div className="flex min-h-14 flex-col justify-end">
          {tier.price ? (
            <>
              <p className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-semibold tracking-tight">
                  {tier.price[billing]}
                </span>
                <span className="text-muted-foreground">{copy.perMonth}</span>
              </p>
              {billing === "annual" && (
                <p className="text-xs text-muted-foreground">{copy.billedAnnually}</p>
              )}
            </>
          ) : (
            <p className="font-heading text-4xl font-semibold tracking-tight">{tier.priceLabel}</p>
          )}
        </div>
        <ul className="flex flex-col gap-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t-0 bg-transparent pt-0">
        <Button asChild size="lg" variant={tier.highlighted ? "default" : "outline"} className="w-full">
          <Link href={tier.cta.href}>{tier.cta.label}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { PricingCard };
