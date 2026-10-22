import { FeatureGrid } from "@/components/common/feature-grid";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { home } from "@/lib/content";

function Benefits() {
  const { eyebrow, title, subtitle, items } = home.benefits;

  return (
    <Section id="benefits" variant="muted">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <FeatureGrid features={items} columns={3} className="mt-12" />
    </Section>
  );
}

export { Benefits };
