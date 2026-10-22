import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { ProductCapabilities } from "@/components/sections/product/product-capabilities";
import { ProductFaq } from "@/components/sections/product/product-faq";
import { ProductHero } from "@/components/sections/product/product-hero";
import { ProductHighlights } from "@/components/sections/product/product-highlights";
import { ProductLogos } from "@/components/sections/product/product-logos";
import { ProductStats } from "@/components/sections/product/product-stats";
import { ProductTestimonials } from "@/components/sections/product/product-testimonials";
import { getProduct, productHref, products } from "@/lib/product-content";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return {
    ...product.metadata,
    alternates: { canonical: productHref(product.slug) },
  };
}

// Partial Prefetching shares one App Shell across every product URL, so the
// slug is read inside Suspense. Every known slug is still prerendered in full;
// the dark band fallback only shows briefly on client navigation.
export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<Section variant="hero" spacing="lg" aria-hidden="true" />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Pick<PageProps<"/product/[slug]">, "params">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <ProductHero hero={product.hero} />
      {product.logos && <ProductLogos logos={product.logos} />}
      <ProductHighlights highlights={product.highlights} />
      <ProductCapabilities capabilities={product.capabilities} />
      {product.stats && <ProductStats stats={product.stats} />}
      {product.testimonials && <ProductTestimonials testimonials={product.testimonials} />}
      {product.faqs && <ProductFaq faqs={product.faqs} />}
      <CtaBanner {...product.finalCta} />
    </>
  );
}
