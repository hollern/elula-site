import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { TestimonialCard } from "@/components/common/testimonial-card";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

function ProductTestimonials({
  testimonials,
}: {
  testimonials: NonNullable<Product["testimonials"]>;
}) {
  const { eyebrow, title, items } = testimonials;

  return (
    <Section id="customers" variant="muted">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div
        className={cn(
          "mt-12 grid gap-6",
          items.length === 2 ? "mx-auto max-w-4xl md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((testimonial) => (
          <TestimonialCard key={testimonial.author.name} {...testimonial} />
        ))}
      </div>
    </Section>
  );
}

export { ProductTestimonials };
