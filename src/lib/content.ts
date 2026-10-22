// All user-facing copy lives here, not in JSX. See CLAUDE.md.

import {
  BarChart3,
  Blocks,
  Briefcase,
  Code2,
  GitPullRequest,
  LayoutDashboard,
  Lock,
  Workflow,
  Zap,
} from "lucide-react";
import { siGithub, siX } from "simple-icons";

import { productHref, products } from "@/lib/product-content";

import type {
  Cta,
  Feature,
  NavGroup,
  NavItem,
  NavLink,
  PlanComparisonGroup,
  PricingTier,
  SocialLink,
  UseCase,
} from "@/lib/types";

// TODO: placeholder brand copy and links until real copy is written.
export const site = {
  name: "Elula",
  tagline: "The platform that helps your team ship with confidence.",
  description:
    "Elula brings planning, reviews and releases into one workspace so your team ships faster with fewer surprises.",
};

export const mainNav: NavItem[] = [
  {
    title: "Product",
    columns: 3,
    items: products.map((product) => ({
      title: product.name,
      href: productHref(product.slug),
      description: product.summary,
    })),
  },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
  { title: "Docs", href: "/docs" },
];

export const headerCtas: { primary: Cta; secondary?: Cta } = {
  primary: { label: "Get started", href: "/signup" },
  secondary: { label: "Log in", href: "/login" },
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
        { title: "Benefits", href: "/#benefits" },
        { title: "Use cases", href: "/#use-cases" },
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

// TODO: placeholder landing copy until real positioning and copy are written.
const signUpCta: Cta = { label: "Start free", href: "/signup" };
const demoCta: Cta = { label: "Book a demo", href: "/contact" };

export const home = {
  hero: {
    eyebrow: { label: "Now in public beta", href: "/blog" },
    title: "Ship faster with fewer surprises",
    description: site.description,
    primaryCta: signUpCta,
    secondaryCta: { label: "See pricing", href: "/pricing" },
    previewLabel: "Preview of the Elula workspace",
  },
  problemSolution: {
    eyebrow: "Why Elula",
    title: "Your team's work is scattered. Elula pulls it together.",
    subtitle:
      "Plans live in one tool, code reviews in another, and release status in someone's head. That's where things slip.",
    problem: {
      title: "Without Elula",
      points: [
        "Status updates mean chasing people across five tools.",
        "Reviews stall because nobody knows they're waiting.",
        "Releases go out without a clear record of what changed.",
        "Leadership finds out about delays after they happen.",
      ],
    },
    solution: {
      title: "With Elula",
      points: [
        "One live view of every project, review and release.",
        "Automatic nudges when work is blocked or waiting.",
        "Release notes generated from the work that actually shipped.",
        "Early warnings when a deadline is at risk.",
      ],
    },
  },
  benefits: {
    eyebrow: "Benefits",
    title: "Everything your team needs to ship with confidence",
    subtitle: "Elula replaces status meetings and spreadsheets with a workspace that keeps itself up to date.",
    items: [
      { icon: LayoutDashboard, title: "One source of truth", description: "Projects, reviews and releases in a single view that updates in real time." },
      { icon: Zap, title: "Less busywork", description: "Status rolls up automatically from the tools you already use. No more manual updates." },
      { icon: GitPullRequest, title: "Faster reviews", description: "Smart reminders and ownership rules keep pull requests moving." },
      { icon: BarChart3, title: "Clear insights", description: "See cycle time, throughput and bottlenecks without building a dashboard." },
      { icon: Blocks, title: "Fits your stack", description: "Connect GitHub, Slack, Jira and more in minutes, not weeks." },
      { icon: Lock, title: "Secure by default", description: "SSO, audit logs and encryption at rest on every plan." },
    ] satisfies Feature[],
  },
  useCases: {
    eyebrow: "Who it's for",
    title: "Built for every team that ships software",
    subtitle: "Whether you write the code, plan the roadmap or report to the board, Elula gives you the view you need.",
    items: [
      {
        icon: Code2,
        title: "Engineering teams",
        description: "Spend less time on updates and more time building.",
        points: ["Review queues that surface what's waiting on you", "Automatic status from commits and PRs", "Release checklists that run themselves"],
      },
      {
        icon: Workflow,
        title: "Product managers",
        description: "Know where every initiative stands without asking.",
        points: ["Roadmaps linked to the work behind them", "Early warning on slipping milestones", "Changelogs drafted from shipped work"],
      },
      {
        icon: Briefcase,
        title: "Engineering leaders",
        description: "Make decisions with real data, not gut feel.",
        points: ["Delivery metrics across every team", "Spot bottlenecks before they spread", "Board-ready reports in one click"],
      },
    ] satisfies UseCase[],
  },
  finalCta: {
    title: "Ready to ship with confidence?",
    description: "Start free in minutes. No credit card required.",
    primaryCta: signUpCta,
    secondaryCta: demoCta,
  },
};

// TODO: placeholder plans and prices until pricing is finalised.
const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For individuals and small teams getting started.",
    price: { monthly: "$0", annual: "$0" },
    features: ["Up to 5 members", "3 projects", "Core integrations", "Community support"],
    cta: signUpCta,
  },
  {
    name: "Team",
    description: "For growing teams that ship every week.",
    price: { monthly: "$24", annual: "$19" },
    features: ["Unlimited members", "Unlimited projects", "All integrations", "Delivery insights", "Priority support"],
    cta: { label: "Start free trial", href: "/signup?plan=team" },
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    description: "For organisations with advanced security needs.",
    priceLabel: "Custom",
    features: ["Everything in Team", "SSO and SCIM", "Audit logs", "Dedicated success manager", "99.9% uptime SLA"],
    cta: { label: "Contact sales", href: "/contact" },
  },
];

const comparisonGroups: PlanComparisonGroup[] = [
  {
    title: "Core",
    rows: [
      { feature: "Members", values: { Starter: "Up to 5", Team: "Unlimited", Enterprise: "Unlimited" } },
      { feature: "Projects", values: { Starter: "3", Team: "Unlimited", Enterprise: "Unlimited" } },
      { feature: "Real-time workspace", values: { Starter: true, Team: true, Enterprise: true } },
      { feature: "Release checklists", values: { Starter: true, Team: true, Enterprise: true } },
      { feature: "History", values: { Starter: "30 days", Team: "1 year", Enterprise: "Unlimited" } },
    ],
  },
  {
    title: "Automation & insights",
    rows: [
      { feature: "Review reminders", values: { Starter: true, Team: true, Enterprise: true } },
      { feature: "Generated release notes", values: { Team: true, Enterprise: true } },
      { feature: "Delivery insights", description: "Cycle time, throughput and bottlenecks.", values: { Team: true, Enterprise: true } },
      { feature: "Custom reports", values: { Enterprise: true } },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { feature: "GitHub and Slack", values: { Starter: true, Team: true, Enterprise: true } },
      { feature: "Jira, Linear and more", values: { Team: true, Enterprise: true } },
      { feature: "API access", values: { Team: true, Enterprise: true } },
    ],
  },
  {
    title: "Security & support",
    rows: [
      { feature: "Encryption at rest", values: { Starter: true, Team: true, Enterprise: true } },
      { feature: "SSO (SAML)", values: { Enterprise: true } },
      { feature: "SCIM provisioning", values: { Enterprise: true } },
      { feature: "Audit logs", values: { Enterprise: true } },
      { feature: "Support", values: { Starter: "Community", Team: "Priority email", Enterprise: "Dedicated manager" } },
      { feature: "Uptime SLA", values: { Enterprise: "99.9%" } },
    ],
  },
];

export const pricing = {
  metadata: {
    title: "Pricing",
    description: "Simple, transparent pricing for teams of every size. Start free and upgrade as you grow.",
  },
  header: {
    eyebrow: "Pricing",
    title: "Simple pricing that scales with your team",
    subtitle: "Start free, upgrade when you're ready. Every plan includes a 14-day trial of Team features.",
  },
  tiers: pricingTiers,
  annualSavings: "Save 20%",
  perSeatNote: "Prices are per member, per month.",
  comparison: {
    title: "Compare plans",
    subtitle: "Every feature, side by side.",
    caption: "Features included in each plan",
    groups: comparisonGroups,
  },
  finalCta: {
    title: "Not sure which plan is right?",
    description: "Talk to us and we'll help you find the best fit for your team.",
    primaryCta: signUpCta,
    secondaryCta: { label: "Contact sales", href: "/contact" },
  },
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
    featureColumn: "Feature",
    included: "Included",
    notIncluded: "Not included",
  },
  layout: {
    skipToContent: "Skip to content",
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
