"use client";

import { useState } from "react";

import { PricingCard } from "@/components/common/pricing-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uiCopy } from "@/lib/content";
import type { Billing, PricingTier } from "@/lib/types";
import { cn } from "@/lib/utils";

type PricingTableProps = {
  tiers: PricingTier[];
  defaultBilling?: Billing;
  /** Badge on the annual toggle, e.g. "Save 20%". */
  annualSavings?: string;
  className?: string;
};

function PricingTable({
  tiers,
  defaultBilling = "monthly",
  annualSavings,
  className,
}: PricingTableProps) {
  const [billing, setBilling] = useState<Billing>(defaultBilling);
  const copy = uiCopy.pricing;
  // Only show the toggle when some tier actually has a per-period price.
  const hasPrices = tiers.some((tier) => tier.price);

  return (
    <div data-slot="pricing-table" className={cn("flex flex-col items-center gap-10", className)}>
      {hasPrices && (
        <Tabs value={billing} onValueChange={(value) => setBilling(value as Billing)}>
          <TabsList aria-label={copy.billingLabel}>
            <TabsTrigger value="monthly" className="px-4">
              {copy.monthly}
            </TabsTrigger>
            <TabsTrigger value="annual" className="px-4">
              {copy.annual}
              {annualSavings && (
                <Badge variant="secondary" className="ml-1">
                  {annualSavings}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <div
        className={cn(
          "grid w-full items-stretch gap-6",
          tiers.length === 2 && "mx-auto max-w-3xl md:grid-cols-2",
          tiers.length >= 3 && "md:grid-cols-2 lg:grid-cols-3",
          tiers.length >= 4 && "xl:grid-cols-4",
        )}
      >
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} billing={billing} />
        ))}
      </div>
    </div>
  );
}

export { PricingTable };
