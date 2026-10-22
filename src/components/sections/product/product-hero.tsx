import { Hero } from "@/components/common/hero";
import { ProductShot } from "@/components/common/product-shot";
import type { Product } from "@/lib/types";

function ProductHero({ hero }: Pick<Product, "hero">) {
  const { eyebrow, title, description, primaryCta, secondaryCta, image, pattern, mediaLabel } = hero;

  return (
    <Hero
      layout="split"
      eyebrow={{ label: eyebrow }}
      title={title}
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      tone="dark"
      media={<ProductShot image={image} pattern={pattern} label={mediaLabel} priority />}
    />
  );
}

export { ProductHero };
