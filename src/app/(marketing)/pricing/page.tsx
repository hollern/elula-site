import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { pricing } from "@/lib/content";

export const metadata: Metadata = pricing.metadata;

export default function PricingPage() {
  return (
    <>
      <PricingPlans />
      <PricingComparison />
      <CtaBanner {...pricing.finalCta} variant="muted" />
    </>
  );
}
