// All user-facing copy lives here, not in JSX. See CLAUDE.md.

import { siGithub, siX } from "simple-icons";

import type { Cta, NavGroup, NavItem, NavLink, SocialLink } from "@/lib/types";

// TODO: placeholder brand copy and links until real copy is written.
export const site = {
  name: "Elula",
  tagline: "The platform that helps your team ship with confidence.",
};

export const mainNav: NavItem[] = [
  {
    title: "Product",
    items: [
      { title: "Features", href: "/#features", description: "What Elula does for your team." },
      { title: "Integrations", href: "/#integrations", description: "Connect the tools you already use." },
      { title: "Security", href: "/#security", description: "How we keep your data safe." },
    ],
  },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
  { title: "Docs", href: "/docs" },
];

export const headerCtas: { primary: Cta; secondary?: Cta } = {
  primary: { label: "Get started", href: "/signup" },
  secondary: { label: "Sign in", href: "/login" },
};

export const footer: {
  columns: NavGroup[];
  legal: NavLink[];
  socials: SocialLink[];
  copyright: (year: number) => string;
} = {
  columns: [
    {
      title: "Product",
      links: [
        { title: "Features", href: "/#features" },
        { title: "Pricing", href: "/pricing" },
        { title: "Changelog", href: "/blog/tags/changelog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Docs", href: "/docs" },
        { title: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
      ],
    },
  ],
  legal: [
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/elula", icon: siGithub },
    { label: "X", href: "https://x.com/elula", icon: siX },
  ],
  copyright: (year) => `© ${year} Elula. All rights reserved.`,
};

export const uiCopy = {
  themeToggle: {
    label: "Toggle theme",
  },
  logo: {
    homeLabel: "Elula home",
  },
  header: {
    menuLabel: "Open menu",
    navLabel: "Main",
  },
  footer: {
    socialLabel: "Social links",
  },
  dataTable: {
    noResults: "No results.",
    previous: "Previous",
    next: "Next",
    filterPlaceholder: "Filter...",
    pageStatus: (page: number, pageCount: number) =>
      `Page ${page} of ${pageCount}`,
    sortLabel: (column: string) => `Sort by ${column}`,
  },
  pricing: {
    billingLabel: "Billing period",
    monthly: "Monthly",
    annual: "Annual",
    perMonth: "/ month",
    billedAnnually: "Billed annually",
  },
  newsletter: {
    title: "Stay in the loop",
    description: "Product updates and new posts, about once a month.",
    label: "Email address",
    placeholder: "you@company.com",
    submit: "Subscribe",
    submitting: "Subscribing...",
    success: "Thanks! Check your inbox to confirm.",
    invalid: "Enter a valid email address.",
    error: "Something went wrong. Please try again.",
  },
  blog: {
    readingTime: (minutes: number) => `${minutes} min read`,
    tagsLabel: "Tags",
  },
  callout: {
    note: "Note",
    tip: "Tip",
    warning: "Warning",
    danger: "Danger",
  },
  codeBlock: {
    copy: "Copy code",
    copied: "Copied",
  },
  toc: {
    title: "On this page",
  },
  docs: {
    navLabel: "Docs",
  },
  prevNext: {
    label: "Pagination",
    previous: "Previous",
    next: "Next",
  },
};
