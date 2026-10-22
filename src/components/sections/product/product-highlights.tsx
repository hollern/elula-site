import { FeatureRow } from "@/components/common/feature-row";
import { ProductShot } from "@/components/common/product-shot";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import type { Product } from "@/lib/types";

function ProductHighlights({ highlights }: Pick<Product, "highlights">) {
  const { eyebrow, title, subtitle, items } = highlights;

  return (
    <Section id="features">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {items.map((item, i) => (
          <FeatureRow
            key={item.title}
            title={item.title}
            description={item.description}
            points={item.points}
            reverse={i % 2 === 1}
            media={<ProductShot image={item.image} pattern={item.pattern} label={item.mediaLabel} />}
          />
        ))}
      </div>
    </Section>
  );
}

export { ProductHighlights };
