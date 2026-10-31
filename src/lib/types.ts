// Shared data shapes for content in src/lib/content.ts and the components
// in src/components/common that render it.

import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";

export type NavLink = {
  title: string;
  href: string;
  description?: string;
};

/**
 * A top-level nav entry: a plain link, or a dropdown when `items` is set.
 * `columns` lays the dropdown out as a grid on large screens (default 1).
 */
export type NavItem = NavLink | { title: string; items: NavLink[]; columns?: 1 | 2 | 3 };

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type Cta = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: SimpleIcon;
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type CustomerLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  href?: string;
  /** Set for dark-on-transparent logos so they stay visible in dark mode. */
  invertOnDark?: boolean;
};

export type Person = {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  href?: string;
};

export type Testimonial = {
  quote: string;
  author: Person;
};

export type Billing = "monthly" | "annual";

export type PricingTier = {
  name: string;
  description: string;
  /** Display prices per billing period. Omit for "contact us" tiers. */
  price?: Record<Billing, string>;
  /** Shown instead of a price when `price` is omitted, e.g. "Custom". */
  priceLabel?: string;
  features: string[];
  cta: Cta;
  highlighted?: boolean;
  badge?: string;
};

/** A cell in the pricing comparison: `true`/`false` for included, or text such as "10 GB". */
export type PlanComparisonValue = boolean | string;

export type PlanComparisonRow = {
  feature: string;
  description?: string;
  /** Keyed by `PricingTier.name`. A missing key renders as not included. */
  values: Record<string, PlanComparisonValue>;
};

export type PlanComparisonGroup = {
  title: string;
  rows: PlanComparisonRow[];
};

export type UseCase = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

export type Faq = {
  question: string;
  answer: string;
};

export type Post = {
  href: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-10-22". */
  date: string;
  tags: string[];
  cover?: { src: string; alt: string };
  author?: Person;
  readingTime?: number;
};

export type DocNavItem = {
  title: string;
  href?: string;
  items?: DocNavItem[];
};

export type TocItem = {
  id: string;
  title: string;
  /** Heading level: 2 for h2, 3 for h3, and so on. */
  depth: number;
};

/** A static image rendered with next/image. */
export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Stat = {
  /** The headline figure, e.g. "40%" or "3x". */
  value: string;
  label: string;
  description?: string;
};

/** Placeholder pattern `ProductShot` draws until a real screenshot exists. */
export type ProductShotPattern = "board" | "list" | "chart";

/** One alternating text-and-media row on a product page. */
export type ProductHighlight = {
  title: string;
  description: string;
  points?: string[];
  /** Real screenshot. Without it, `ProductShot` draws `pattern` as a placeholder. */
  image?: MediaImage;
  pattern?: ProductShotPattern;
  /** Accessible name for the placeholder; ignored when `image` is set. */
  mediaLabel: string;
};

/** Everything a `/product/[slug]` page renders. Optional blocks are skipped when omitted. */
export type Product = {
  slug: string;
  /** Short name used in the nav and related links. */
  name: string;
  /** One line under the name in the nav dropdown. */
  summary: string;
  icon: LucideIcon;
  metadata: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
    image?: MediaImage;
    pattern?: ProductShotPattern;
    mediaLabel: string;
  };
  logos?: { title: string; items: CustomerLogo[] };
  highlights: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: ProductHighlight[];
  };
  capabilities: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: Feature[];
  };
  stats?: { title: string; subtitle?: string; items: Stat[] };
  testimonials?: { eyebrow?: string; title: string; items: Testimonial[] };
  faqs?: { eyebrow?: string; title: string; subtitle?: string; items: Faq[] };
  finalCta: {
    title: string;
    description?: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
  };
};

/**
 * One long-form page: its metadata plus the `Content` component that a page
 * template renders into its content slot. Built from the MDX files in
 * `src/content/` by `src/lib/blog.ts` and `src/lib/docs.ts`.
 */
export type ContentEntry<TMeta> = {
  meta: TMeta;
  Content: ComponentType;
};

/** A blog post's front matter plus its slug and TOC. The URL is `/blog/{slug}`. */
export type BlogPostMeta = Omit<Post, "href"> & {
  slug: string;
  /** h2/h3 headings in `Content`, generated at build time. */
  toc?: TocItem[];
};

/** A docs page's front matter plus its slug and TOC. The URL is `/docs/{slug}`; `""` is `/docs`. */
export type DocPageMeta = {
  slug: string;
  title: string;
  description?: string;
  /** h2/h3 headings in `Content`, generated at build time. */
  toc?: TocItem[];
};

export type BlogPostEntry = ContentEntry<BlogPostMeta>;
export type DocPageEntry = ContentEntry<DocPageMeta>;
