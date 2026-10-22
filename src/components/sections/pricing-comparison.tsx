import { PlanComparison } from "@/components/common/plan-comparison";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { pricing } from "@/lib/content";

function PricingComparison() {
  const { title, subtitle, caption, groups } = pricing.comparison;

  return (
    <Section id="compare" spacing="sm">
      <SectionHeader title={title} subtitle={subtitle} />
      <PlanComparison tiers={pricing.tiers} groups={groups} caption={caption} className="mt-10" />
    </Section>
  );
}

export { PricingComparison };
