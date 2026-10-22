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
  /** `dark` sets the always-dark `bg-hero` band with light text, an uppercase eyebrow and framed media, in both themes. */
  tone?: "default" | "dark";
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
  tone = "default",
  className,
}: HeroProps) {
  const centered = layout === "center";
  const dark = tone === "dark";
  // The dark band uses an all-caps eyebrow label, like UpKeep's product pages.
  const badgeTone =
    dark && "bg-hero-foreground/10 tracking-wide text-hero-foreground uppercase ring-1 ring-hero-foreground/20";

  return (
    <section
      data-slot="hero"
      className={cn("py-16 md:py-24", dark && "bg-hero text-hero-foreground", className)}
    >
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
              <Badge asChild variant="secondary" className={cn("h-6 px-3", badgeTone)}>
                <Link href={eyebrow.href}>
                  {eyebrow.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Badge>
            ) : (
              <Badge variant="secondary" className={cn("h-6 px-3", badgeTone)}>
                {eyebrow.label}
              </Badge>
            ))}
          <H1 as={titleAs} className="md:text-6xl">{title}</H1>
          {description && (
            <Lead className={cn("max-w-2xl text-pretty", dark && "text-hero-foreground/75")}>
              {description}
            </Lead>
          )}
          {primaryCta && (
            <CtaGroup
              primary={primaryCta}
              secondary={secondaryCta}
              align={centered ? "center" : "start"}
              tone={dark ? "hero" : "default"}
              className="mt-2 w-full sm:w-auto"
            />
          )}
        </div>
        {media && (
          <div
            className={cn(
              "relative",
              centered && "mx-auto w-full max-w-5xl",
              // Bezel lifts the media off the dark band, like a device frame.
              dark && "rounded-2xl bg-hero-foreground/10 p-2 ring-1 ring-hero-foreground/15",
            )}
          >
            {media}
          </div>
        )}
      </Container>
    </section>
  );
}

export { Hero };
