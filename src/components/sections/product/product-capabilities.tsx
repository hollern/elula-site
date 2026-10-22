import { FeatureGrid } from "@/components/common/feature-grid";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import type { Product } from "@/lib/types";

function ProductCapabilities({ capabilities }: Pick<Product, "capabilities">) {
  const { eyebrow, title, subtitle, items } = capabilities;

  return (
    <Section id="capabilities" variant="muted">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <FeatureGrid features={items} columns={3} className="mt-12" />
    </Section>
  );
}

export { ProductCapabilities };
