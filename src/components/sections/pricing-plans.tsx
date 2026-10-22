import { PricingTable } from "@/components/common/pricing-table";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Muted } from "@/components/common/typography";
import { pricing } from "@/lib/content";

function PricingPlans() {
  const { header, tiers, annualSavings, perSeatNote } = pricing;

  return (
    <Section className="bg-linear-to-b from-muted/60 to-background">
      <SectionHeader titleAs="h1" {...header} />
      <PricingTable tiers={tiers} annualSavings={annualSavings} className="mt-10" />
      <Muted className="mt-6 text-center">{perSeatNote}</Muted>
    </Section>
  );
}

export { PricingPlans };
