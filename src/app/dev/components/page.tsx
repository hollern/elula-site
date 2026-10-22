import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorByline } from "@/components/common/author-byline";
import { Callout } from "@/components/common/callout";
import { CodeBlock } from "@/components/common/code-block";
import { Container } from "@/components/common/container";
import { CtaBanner } from "@/components/common/cta-banner";
import { CtaGroup } from "@/components/common/cta-group";
import { DocsSidebar } from "@/components/common/docs-sidebar";
import { FaqList } from "@/components/common/faq-list";
import { FeatureCard, FeatureGrid } from "@/components/common/feature-grid";
import { Hero } from "@/components/common/hero";
import { Logo } from "@/components/common/logo";
import { LogoCloud } from "@/components/common/logo-cloud";
import { PostCard } from "@/components/common/post-card";
import { PrevNextLinks } from "@/components/common/prev-next-links";
import { PricingCard } from "@/components/common/pricing-card";
import { PricingTable } from "@/components/common/pricing-table";
import { Prose } from "@/components/common/prose";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { SiteFooter } from "@/components/common/site-footer";
import { SiteHeader } from "@/components/common/site-header";
import { TableOfContents } from "@/components/common/table-of-contents";
import { TagList } from "@/components/common/tag-list";
import { TestimonialCard } from "@/components/common/testimonial-card";
import { H1, H2, Lead } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { footer, headerCtas, mainNav, uiCopy } from "@/lib/content";

import { NewsletterDemo } from "./_components/newsletter-demo";
import { preview, toc } from "./_data";

export const metadata: Metadata = {
  title: preview.title,
  robots: { index: false, follow: false },
};

// Labels each demo so the page reads as a catalog. Sits inside the demo's own
// Section/Container, so it gets the same width as the component it labels.
function DemoTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <H2 id={id} className="mb-8 scroll-mt-20 text-xl text-muted-foreground">
      {children}
    </H2>
  );
}

export default function ComponentsPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const s = preview.sections;

  return (
    <>
      <SiteHeader items={mainNav} primaryCta={headerCtas.primary} secondaryCta={headerCtas.secondary} />

      <main className="flex-1">
        <Container className="flex flex-col gap-2 pt-10">
          <H1>{preview.title}</H1>
          <Lead>{preview.description}</Lead>
          <Button asChild variant="link" className="w-fit px-0">
            <Link href={preview.primitivesLink.href}>{preview.primitivesLink.label}</Link>
          </Button>
        </Container>

        <Section spacing="sm">
          <DemoTitle id={s.layout.id}>{s.layout.title}</DemoTitle>
          <div className="flex flex-col gap-10">
            <SectionHeader {...preview.sectionHeader} />
            <SectionHeader {...preview.sectionHeader} align="left" />
            <div className="flex flex-wrap items-center gap-8">
              <Logo size="sm" />
              <Logo />
              <Logo size="lg" />
              <Logo variant="icon" size="lg" />
            </div>
          </div>
        </Section>
        <Section variant="muted" spacing="sm">
          <SectionHeader {...preview.sectionHeader} eyebrow={preview.sectionVariants.muted} />
        </Section>
        <Section variant="accent" spacing="sm">
          <SectionHeader {...preview.sectionHeader} eyebrow={preview.sectionVariants.accent} />
        </Section>

        <Section spacing="sm">
          <DemoTitle id={s.ctas.id}>{s.ctas.title}</DemoTitle>
          <CtaGroup primary={preview.ctas.primary} secondary={preview.ctas.secondary} />
        </Section>

        <Section spacing="sm" container={false}>
          <Container>
            <DemoTitle id={s.hero.id}>{s.hero.title}</DemoTitle>
          </Container>
          <Hero
            {...preview.hero}
            titleAs="h2"
            primaryCta={preview.ctas.primary}
            secondaryCta={preview.ctas.secondary}
            media={
              <div
                role="img"
                aria-label={preview.hero.mediaAlt}
                className="aspect-video rounded-2xl bg-muted ring-1 ring-border"
              />
            }
          />
          <Hero
            {...preview.hero}
            titleAs="h2"
            layout="split"
            primaryCta={preview.ctas.primary}
            media={<div className="aspect-[4/3] rounded-2xl bg-muted ring-1 ring-border" />}
          />
        </Section>

        <Section variant="muted" spacing="sm">
          <DemoTitle id={s.features.id}>{s.features.title}</DemoTitle>
          <div className="flex flex-col gap-12">
            <FeatureGrid features={preview.features} />
            <FeatureGrid features={preview.features.slice(0, 4)} columns={4} variant="plain" />
            <FeatureCard {...preview.features[0]} className="max-w-sm" />
          </div>
        </Section>

        <Section spacing="sm">
          <DemoTitle id={s.logos.id}>{s.logos.title}</DemoTitle>
          <LogoCloud title={preview.logos.title} logos={preview.logos.items} />
        </Section>

        <Section variant="muted" spacing="sm">
          <DemoTitle id={s.testimonials.id}>{s.testimonials.title}</DemoTitle>
          <div className="grid gap-6 md:grid-cols-3">
            {preview.testimonials.map((t) => (
              <TestimonialCard key={t.author.name} {...t} />
            ))}
          </div>
        </Section>

        <Section spacing="sm">
          <DemoTitle id={s.pricing.id}>{s.pricing.title}</DemoTitle>
          <div className="flex flex-col gap-12">
            <PricingTable tiers={preview.pricing.tiers} annualSavings={preview.pricing.annualSavings} />
            <PricingCard tier={preview.pricing.tiers[1]} billing="annual" className="max-w-sm" />
          </div>
        </Section>

        <Section variant="muted" spacing="sm">
          <DemoTitle id={s.faq.id}>{s.faq.title}</DemoTitle>
          <FaqList faqs={preview.faqs} />
        </Section>

        <Section spacing="sm" container={false}>
          <Container>
            <DemoTitle id={s.ctaBanner.id}>{s.ctaBanner.title}</DemoTitle>
          </Container>
          <CtaBanner
            {...preview.ctaBanner}
            primaryCta={preview.ctas.primary}
            secondaryCta={preview.ctas.secondary}
            className="py-0 md:py-0"
          />
          <CtaBanner
            {...preview.ctaBanner}
            variant="muted"
            primaryCta={preview.ctas.primary}
            secondaryCta={preview.ctas.secondary}
          />
        </Section>

        <Section variant="muted" spacing="sm">
          <DemoTitle id={s.newsletter.id}>{s.newsletter.title}</DemoTitle>
          <div className="grid gap-10 md:grid-cols-2">
            <NewsletterDemo description={uiCopy.newsletter.description} />
            <NewsletterDemo title={uiCopy.newsletter.title} description={uiCopy.newsletter.description} />
          </div>
        </Section>

        <Section spacing="sm">
          <DemoTitle id={s.blog.id}>{s.blog.title}</DemoTitle>
          <div className="flex flex-col gap-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {preview.posts.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-10">
              <AuthorByline author={preview.bylineAuthor} date={preview.posts[0].date} readingTime={6} />
              <TagList tags={preview.posts[0].tags} />
              <TagList tags={preview.unlinkedTags} basePath={false} />
            </div>
          </div>
        </Section>

        <Section variant="muted" spacing="sm" container="narrow">
          <DemoTitle id={s.prose.id}>{s.prose.title}</DemoTitle>
          <Prose>
            <h2>{preview.prose.heading}</h2>
            <p>
              {preview.prose.paragraphStart}
              <a href={preview.prose.link.href}>{preview.prose.link.label}</a>
              {preview.prose.codePrefix}
              <code>{preview.prose.code}</code>
              {preview.prose.paragraphEnd}
            </p>
            <ul>
              {preview.prose.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <blockquote>{preview.prose.quote}</blockquote>
            <Callout variant="tip">{preview.callouts.tip}</Callout>
            <h3>{preview.prose.subheading}</h3>
            <p>{preview.prose.subparagraph}</p>
            <CodeBlock code={preview.code.shell} lang="bash" />
          </Prose>
        </Section>

        <Section spacing="sm" container="wide">
          <DemoTitle id={s.docs.id}>{s.docs.title}</DemoTitle>
          <div className="grid gap-10 lg:grid-cols-[14rem_1fr] xl:grid-cols-[14rem_1fr_13rem]">
            <DocsSidebar items={preview.docsNav} className="hidden lg:flex" />
            <div className="flex min-w-0 flex-col">
              <Callout variant="note">{preview.callouts.note}</Callout>
              <Callout variant="tip">{preview.callouts.tip}</Callout>
              <Callout variant="warning">{preview.callouts.warning}</Callout>
              <Callout variant="danger" title={preview.callouts.customTitle}>
                {preview.callouts.danger}
              </Callout>
              <CodeBlock code={preview.code.snippet} lang={preview.code.lang} filename={preview.code.filename} />
              <CodeBlock code={preview.code.snippet} lang={preview.code.lang} showLineNumbers />
              <PrevNextLinks {...preview.prevNext} className="mt-6" />
              <PrevNextLinks next={preview.prevNext.next} className="mt-6" />
            </div>
            <aside className="hidden xl:block">
              <TableOfContents items={toc} className="sticky top-24" />
            </aside>
          </div>
        </Section>
      </main>

      <SiteFooter
        columns={footer.columns}
        legal={footer.legal}
        socials={footer.socials}
        copyright={footer.copyright}
        newsletter={<NewsletterDemo title={uiCopy.newsletter.title} description={uiCopy.newsletter.description} />}
      />
    </>
  );
}
