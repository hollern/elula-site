import { FaqList } from "@/components/common/faq-list";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import type { Product } from "@/lib/types";

function ProductFaq({ faqs }: { faqs: NonNullable<Product["faqs"]> }) {
  return (
    <Section id="faq">
      <SectionHeader eyebrow={faqs.eyebrow} title={faqs.title} subtitle={faqs.subtitle} />
      <FaqList faqs={faqs.items} className="mt-12" />
    </Section>
  );
}

export { ProductFaq };
