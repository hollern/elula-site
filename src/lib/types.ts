// Shared data shapes for content in src/lib/content.ts and the components
// in src/components/common that render it.

import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";

export type NavLink = {
  title: string;
  href: string;
  description?: string;
};

/** A top-level nav entry: a plain link, or a dropdown when `items` is set. */
export type NavItem = NavLink | { title: string; items: NavLink[] };

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
