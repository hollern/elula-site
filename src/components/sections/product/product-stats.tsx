import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { StatGrid } from "@/components/common/stat-grid";
import type { Product } from "@/lib/types";

function ProductStats({ stats }: { stats: NonNullable<Product["stats"]> }) {
  return (
    <Section id="results">
      <SectionHeader title={stats.title} subtitle={stats.subtitle} />
      <StatGrid stats={stats.items} className="mt-12" />
    </Section>
  );
}

export { ProductStats };
