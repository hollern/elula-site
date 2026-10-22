import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { CtaGroup } from "@/components/common/cta-group";
import { H1, Lead } from "@/components/common/typography";
import { Badge } from "@/components/ui/badge";
import type { Cta } from "@/lib/types";
import { cn } from "@/lib/utils";

type HeroProps = {
  title: string;
  description?: string;
  /** Small announcement above the title; links when `href` is set. */
  eyebrow?: { label: string; href?: string };
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Screenshot, illustration or video. Below the copy when centered, beside it when split. */
  media?: ReactNode;
  layout?: "center" | "split";
  /** Heading level. Defaults to h1 since the hero usually heads the page. */
  titleAs?: "h1" | "h2";
  className?: string;
};

function Hero({
  title,
  description,
  eyebrow,
  primaryCta,
  secondaryCta,
  media,
  layout = "center",
  titleAs = "h1",
  className,
}: HeroProps) {
  const centered = layout === "center";

  return (
    <section data-slot="hero" className={cn("py-16 md:py-24", className)}>
      <Container
        className={cn(
          "grid gap-12",
          !centered && media && "lg:grid-cols-2 lg:items-center",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-6",
            centered ? "mx-auto max-w-3xl items-center text-center" : "items-start",
          )}
        >
          {eyebrow &&
            (eyebrow.href ? (
              <Badge asChild variant="secondary" className="h-6 px-3">
                <Link href={eyebrow.href}>
                  {eyebrow.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Badge>
            ) : (
              <Badge variant="secondary" className="h-6 px-3">
                {eyebrow.label}
              </Badge>
            ))}
          <H1 as={titleAs} className="md:text-6xl">{title}</H1>
          {description && <Lead className="max-w-2xl text-pretty">{description}</Lead>}
          {primaryCta && (
            <CtaGroup
              primary={primaryCta}
              secondary={secondaryCta}
              align={centered ? "center" : "start"}
              className="mt-2 w-full sm:w-auto"
            />
          )}
        </div>
        {media && (
          <div className={cn("relative", centered && "mx-auto w-full max-w-5xl")}>{media}</div>
        )}
      </Container>
    </section>
  );
}

export { Hero };
