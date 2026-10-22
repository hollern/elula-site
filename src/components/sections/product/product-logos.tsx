import { LogoCloud } from "@/components/common/logo-cloud";
import { Section } from "@/components/common/section";
import type { Product } from "@/lib/types";

function ProductLogos({ logos }: { logos: NonNullable<Product["logos"]> }) {
  return (
    <Section variant="muted" spacing="sm">
      <LogoCloud title={logos.title} logos={logos.items} />
    </Section>
  );
}

export { ProductLogos };
