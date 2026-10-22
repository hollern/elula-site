// Placeholder content for the dev-only business component preview. Not product
// copy, so it lives next to the route rather than in src/lib/content.ts.

import { BarChart3, Blocks, Lock, Rocket, Users, Zap } from "lucide-react";

import type {
  CustomerLogo,
  DocNavItem,
  Faq,
  Feature,
  Post,
  PricingTier,
  Testimonial,
  TocItem,
} from "@/lib/types";

export const preview = {
  title: "Business components",
  description:
    "Composites from src/components/common, built on the ui primitives. Dev only; returns 404 in production.",
  primitivesLink: { label: "UI primitives", href: "/dev/ui" },
  sections: {
    layout: { id: "layout", title: "Container, Section, SectionHeader, Logo" },
    ctas: { id: "ctas", title: "CtaGroup" },
    hero: { id: "hero", title: "Hero" },
    features: { id: "features", title: "FeatureCard & FeatureGrid" },
    logos: { id: "logos", title: "LogoCloud" },
    testimonials: { id: "testimonials", title: "TestimonialCard" },
    pricing: { id: "pricing", title: "PricingCard, PricingTable, PlanComparison" },
    faq: { id: "faq", title: "FaqList" },
    ctaBanner: { id: "cta-banner", title: "CtaBanner" },
    newsletter: { id: "newsletter", title: "NewsletterForm" },
    blog: { id: "blog", title: "PostCard, AuthorByline, TagList" },
    prose: { id: "prose", title: "Prose" },
    docs: { id: "docs", title: "Callout, CodeBlock, DocsSidebar, TableOfContents, PrevNextLinks" },
  },
  sectionHeader: {
    eyebrow: "Eyebrow",
    title: "A section header with an eyebrow",
    subtitle: "Subtitles explain the section in a sentence or two and wrap nicely on narrow screens.",
  },
  sectionVariants: { muted: "Section variant=muted", accent: "Section variant=accent" },
  unlinkedTags: ["Plain", "Badges"],
  ctas: {
    primary: { label: "Start free trial", href: "#" },
    secondary: { label: "Book a demo", href: "#" },
  },
  hero: {
    eyebrow: { label: "New: Workflows 2.0", href: "#" },
    title: "Ship faster with fewer surprises",
    description:
      "Elula brings your team's planning, reviews and releases into one place, so nothing falls through the cracks.",
    mediaAlt: "Product screenshot placeholder",
  },
  features: [
    { icon: Zap, title: "Fast by default", description: "Pages load instantly and stay that way as your workspace grows." },
    { icon: Users, title: "Built for teams", description: "Roles, mentions and shared views keep everyone on the same page." },
    { icon: Lock, title: "Secure", description: "SSO, audit logs and encryption at rest on every plan." },
    { icon: BarChart3, title: "Insightful", description: "Dashboards show what shipped, what's blocked and why." },
    { icon: Blocks, title: "Integrates", description: "Connect GitHub, Slack and the rest of your stack in minutes." },
    { icon: Rocket, title: "Ready to scale", description: "From five people to five thousand without changing tools." },
  ] satisfies Feature[],
  logos: {
    title: "Trusted by teams at",
    items: [
      { name: "Next.js", src: "/next.svg", width: 394, height: 80, invertOnDark: true },
      { name: "Vercel", src: "/vercel.svg", width: 1155, height: 1000, invertOnDark: true },
      { name: "Globe", src: "/globe.svg", width: 16, height: 16 },
      { name: "Window", src: "/window.svg", width: 16, height: 16 },
      { name: "File", src: "/file.svg", width: 16, height: 16 },
    ] satisfies CustomerLogo[],
  },
  testimonials: [
    {
      quote: "We replaced three tools with Elula and our release cadence doubled within a quarter.",
      author: { name: "Ada Lovelace", role: "VP Engineering", company: "Analytical" },
    },
    {
      quote: "The first tool our whole team actually enjoys opening in the morning.",
      author: { name: "Grace Hopper", role: "Head of Product", company: "Compilers Inc." },
    },
    {
      quote: "Setup took an afternoon. The integrations just worked.",
      author: { name: "Alan Turing", role: "CTO", company: "Enigma" },
    },
  ] satisfies Testimonial[],
  pricing: {
    annualSavings: "Save 20%",
    tiers: [
      {
        name: "Starter",
        description: "For individuals and small projects.",
        price: { monthly: "$0", annual: "$0" },
        features: ["Up to 3 projects", "Basic integrations", "Community support"],
        cta: { label: "Get started", href: "#" },
      },
      {
        name: "Pro",
        description: "For growing teams.",
        price: { monthly: "$24", annual: "$19" },
        features: ["Unlimited projects", "All integrations", "Priority support", "Advanced analytics"],
        cta: { label: "Start free trial", href: "#" },
        highlighted: true,
        badge: "Popular",
      },
      {
        name: "Enterprise",
        description: "For organizations with advanced needs.",
        priceLabel: "Custom",
        features: ["Everything in Pro", "SSO & SCIM", "Audit logs", "Dedicated support"],
        cta: { label: "Contact sales", href: "#" },
      },
    ] satisfies PricingTier[],
  },
  faqs: [
    { question: "Is there a free plan?", answer: "Yes. Starter is free forever for up to three projects." },
    { question: "Can I change plans later?", answer: "Upgrade or downgrade any time; we prorate the difference." },
    { question: "Do you offer discounts for nonprofits?", answer: "We do. Contact sales and we'll set you up." },
  ] satisfies Faq[],
  ctaBanner: {
    title: "Ready to ship with confidence?",
    description: "Start your free trial today. No credit card required.",
  },
  posts: [
    {
      href: "#",
      title: "How we cut our release cycle in half",
      excerpt:
        "A look at the process changes and tooling that took our team from monthly releases to shipping several times a week.",
      date: "2026-10-14",
      tags: ["Engineering", "Process"],
      author: { name: "Ada Lovelace", role: "VP Engineering" },
      readingTime: 6,
    },
    {
      href: "#",
      title: "Introducing Workflows 2.0",
      excerpt: "Conditional steps, approvals and a brand-new visual editor.",
      date: "2026-10-02",
      tags: ["Changelog"],
      readingTime: 3,
    },
    {
      href: "#",
      title: "A field guide to async standups",
      excerpt: "Fewer meetings, better updates: what we learned running async standups for a year.",
      date: "2026-09-18",
      tags: ["Culture"],
      author: { name: "Grace Hopper", role: "Head of Product" },
      readingTime: 8,
    },
  ] satisfies Post[],
  bylineAuthor: { name: "Ada Lovelace", role: "VP Engineering", href: "#" },
  prose: {
    heading: "Getting started",
    paragraphStart: "Prose styles long-form content from MDX: ",
    link: { label: "links", href: "#" },
    codePrefix: ", inline code like ",
    code: "yarn dev",
    paragraphEnd: ", lists and quotes all pick up theme tokens.",
    list: ["Install the CLI", "Connect your repository", "Invite your team"],
    quote: "Good defaults beat endless configuration.",
    subheading: "Next steps",
    subparagraph: "Read the guides in the docs for deeper dives into each feature.",
  },
  callouts: {
    note: "Settings sync to every device signed in to your workspace.",
    tip: "Press ⌘K anywhere to open the command palette.",
    warning: "Rotating the API key immediately revokes the old one.",
    danger: "Deleting a workspace cannot be undone.",
    customTitle: "Heads up",
  },
  code: {
    filename: "src/app/page.tsx",
    lang: "tsx",
    snippet: `import { Hero } from "@/components/common/hero";

export default function Page() {
  return <Hero title="Hello, Elula" layout="center" />;
}
`,
    shell: "yarn add elula",
  },
  docsNav: [
    {
      title: "Getting started",
      items: [
        { title: "Introduction", href: "/dev/components" },
        { title: "Installation", href: "#installation" },
        { title: "Quickstart", href: "#quickstart" },
      ],
    },
    {
      title: "Guides",
      items: [
        { title: "Workflows", href: "#workflows", items: [{ title: "Approvals", href: "#approvals" }] },
        { title: "Integrations", href: "#integrations" },
      ],
    },
  ] satisfies DocNavItem[],
  prevNext: {
    prev: { title: "Installation", href: "#" },
    next: { title: "Quickstart", href: "#" },
  },
};

// The preview page's own sections, so the TOC demo tracks real headings.
export const toc: TocItem[] = Object.values(preview.sections).map((s) => ({
  id: s.id,
  title: s.title.split(",")[0].split(" & ")[0],
  depth: 2,
}));
