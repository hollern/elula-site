// Copy for the /product/[slug] pages. Each entry in `products` is one page;
// the order here is the order in the nav dropdown. See docs/product-pages.md.
//
// This file must not import from content.ts: content.ts imports `products`
// to build the nav, and a cycle would leave one side undefined at load time.

import {
  Bell,
  CalendarRange,
  CheckCheck,
  FileText,
  GitPullRequest,
  History,
  Layers,
  Link2,
  ListChecks,
  Rocket,
  ShieldCheck,
  Timer,
  Users,
  Workflow,
} from "lucide-react";

import type { Cta, CustomerLogo, Product } from "@/lib/types";

export const productBasePath = "/product";

export function productHref(slug: string) {
  return `${productBasePath}/${slug}`;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

// TODO: everything below is placeholder copy, stats, customers and quotes.
// Replace it per product before launch.
const signUpCta: Cta = { label: "Start free", href: "/signup" };
const demoCta: Cta = { label: "Book a demo", href: "/contact" };

const customerLogos: { title: string; items: CustomerLogo[] } = {
  title: "Trusted by product and engineering teams at",
  items: [
    { name: "Acme", src: "/logos/placeholder-acme.svg", width: 160, height: 40, invertOnDark: true },
    { name: "Northwind", src: "/logos/placeholder-northwind.svg", width: 160, height: 40, invertOnDark: true },
    { name: "Globex", src: "/logos/placeholder-globex.svg", width: 160, height: 40, invertOnDark: true },
    { name: "Initech", src: "/logos/placeholder-initech.svg", width: 160, height: 40, invertOnDark: true },
    { name: "Umbrella", src: "/logos/placeholder-umbrella.svg", width: 160, height: 40, invertOnDark: true },
  ],
};

export const products: Product[] = [
  {
    slug: "project-planning",
    name: "Planning",
    summary: "Roadmaps and projects linked to the work behind them.",
    icon: CalendarRange,
    metadata: {
      title: "Project planning software",
      description:
        "Plan projects, track milestones and see real progress from the work your team ships, all in Elula.",
    },
    hero: {
      eyebrow: "Planning",
      title: "Plans that update themselves as work ships",
      description:
        "Connect every roadmap item to the issues and pull requests behind it, so progress is always real and never a guess.",
      primaryCta: signUpCta,
      secondaryCta: demoCta,
      pattern: "board",
      mediaLabel: "Preview of a project plan in Elula",
    },
    logos: customerLogos,
    highlights: {
      eyebrow: "Why Elula Planning",
      title: "From roadmap to release without the spreadsheet",
      subtitle: "Elula keeps the plan and the work in one place, so everyone sees the same picture.",
      items: [
        {
          title: "Roadmaps linked to real work",
          description:
            "Every initiative rolls up from the issues and pull requests behind it. Progress bars move when code merges, not when someone remembers to update them.",
          points: ["Link issues from GitHub, Jira or Linear", "Progress calculated from merged work", "One view for every team"],
          pattern: "board",
          mediaLabel: "Preview of a roadmap linked to issues",
        },
        {
          title: "Milestones that warn you early",
          description:
            "Elula compares the work left with your team's pace and flags milestones that are drifting, weeks before the date slips.",
          points: ["Forecasts based on real throughput", "At-risk alerts in Slack", "Scope changes tracked automatically"],
          pattern: "chart",
          mediaLabel: "Preview of a milestone forecast chart",
        },
        {
          title: "Status updates without the meeting",
          description:
            "Weekly summaries write themselves from what actually happened, ready to share with stakeholders in one click.",
          points: ["Auto-drafted weekly updates", "Shareable read-only links", "History of every change"],
          pattern: "list",
          mediaLabel: "Preview of an auto-generated status update",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Everything you need to plan with confidence",
      items: [
        { icon: CalendarRange, title: "Timeline view", description: "Drag-and-drop timelines that stay in sync with the work." },
        { icon: Layers, title: "Initiatives and projects", description: "Group projects under goals and see roll-up progress." },
        { icon: Timer, title: "Forecasting", description: "Delivery dates projected from your team's real pace." },
        { icon: Bell, title: "Risk alerts", description: "Get notified the moment a milestone starts to slip." },
        { icon: FileText, title: "Status reports", description: "Weekly summaries drafted from shipped work." },
        { icon: Link2, title: "Integrations", description: "Two-way sync with GitHub, Jira, Linear and Slack." },
      ],
    },
    stats: {
      title: "Teams plan better with Elula",
      items: [
        { value: "35%", label: "fewer missed milestones", description: "in the first quarter" },
        { value: "4 hrs", label: "saved per manager", description: "every week on status updates" },
        { value: "2x", label: "faster planning cycles", description: "from kickoff to committed plan" },
      ],
    },
    testimonials: {
      eyebrow: "Customers",
      title: "Loved by teams who hate status meetings",
      items: [
        {
          quote: "Our roadmap used to be out of date the day we published it. Now it moves on its own.",
          author: { name: "Jordan Lee", role: "Head of Product", company: "Acme" },
        },
        {
          quote: "The early warnings alone paid for Elula. We caught two slipping launches a month out.",
          author: { name: "Priya Nair", role: "Engineering Manager", company: "Northwind" },
        },
        {
          quote: "I haven't written a weekly update by hand since we switched.",
          author: { name: "Sam Ortiz", role: "Program Manager", company: "Globex" },
        },
      ],
    },
    faqs: {
      eyebrow: "FAQ",
      title: "Questions about Planning",
      items: [
        {
          question: "Which tools does Planning connect to?",
          answer: "GitHub, GitLab, Jira, Linear and Slack today, with more on the way. Connections take a few minutes.",
        },
        {
          question: "Do I have to move my issues into Elula?",
          answer: "No. Elula links to issues where they already live and keeps them in sync both ways.",
        },
        {
          question: "How are forecasts calculated?",
          answer: "Elula looks at the work left in a milestone and your team's recent throughput, then projects a likely delivery range.",
        },
        {
          question: "Is Planning included in every plan?",
          answer: "Core planning is on every plan. Forecasting and risk alerts are part of Team and Enterprise.",
        },
      ],
    },
    finalCta: {
      title: "Start planning with real data",
      description: "Set up your first roadmap in minutes. No credit card required.",
      primaryCta: signUpCta,
      secondaryCta: demoCta,
    },
  },
  {
    slug: "code-review",
    name: "Code reviews",
    summary: "Review queues and reminders that keep pull requests moving.",
    icon: GitPullRequest,
    metadata: {
      title: "Code review workflow",
      description: "Keep pull requests moving with smart review queues, ownership rules and reminders in Elula.",
    },
    hero: {
      eyebrow: "Code reviews",
      title: "Pull requests that never sit waiting",
      description:
        "Elula routes every pull request to the right reviewer and nudges them before it goes stale, so code ships while it's fresh.",
      primaryCta: signUpCta,
      secondaryCta: demoCta,
      pattern: "list",
      mediaLabel: "Preview of a review queue in Elula",
    },
    logos: customerLogos,
    highlights: {
      eyebrow: "Why Elula Code reviews",
      title: "Faster reviews without cutting corners",
      items: [
        {
          title: "A queue for every reviewer",
          description: "Everyone sees exactly what's waiting on them, sorted by age and size, across every repository.",
          points: ["One queue across repos", "Sorted by what's blocking most", "Works with GitHub and GitLab"],
          pattern: "list",
          mediaLabel: "Preview of a personal review queue",
        },
        {
          title: "Routing that follows ownership",
          description: "Ownership rules assign the right reviewers and balance load so no one becomes a bottleneck.",
          points: ["Rules by path, team or label", "Load balancing across reviewers", "Automatic backup reviewers"],
          pattern: "board",
          mediaLabel: "Preview of review assignment rules",
        },
        {
          title: "Insight into review health",
          description: "Track time to first review and time to merge, and see where pull requests get stuck.",
          pattern: "chart",
          mediaLabel: "Preview of review time metrics",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Built for teams that review a lot of code",
      items: [
        { icon: ListChecks, title: "Review queues", description: "Personal and team queues across every repository." },
        { icon: Users, title: "Ownership rules", description: "Assign reviewers by path, team or label." },
        { icon: Bell, title: "Smart reminders", description: "Nudges in Slack before a review goes stale." },
        { icon: Timer, title: "Review metrics", description: "Time to first review and time to merge, per team." },
        { icon: ShieldCheck, title: "Required checks", description: "Make sure the right people approve sensitive changes." },
        { icon: Link2, title: "Integrations", description: "GitHub, GitLab and Slack out of the box." },
      ],
    },
    stats: {
      title: "Reviews move faster with Elula",
      items: [
        { value: "60%", label: "faster first review" },
        { value: "3x", label: "fewer stale pull requests" },
        { value: "1 day", label: "median time to merge" },
      ],
    },
    faqs: {
      eyebrow: "FAQ",
      title: "Questions about Code reviews",
      items: [
        {
          question: "Does this replace GitHub's review tools?",
          answer: "No. Reviews still happen in GitHub or GitLab. Elula decides who reviews, tracks what's waiting and reminds people.",
        },
        {
          question: "Can I use our existing CODEOWNERS file?",
          answer: "Yes. Elula reads CODEOWNERS and lets you layer load balancing and backup reviewers on top.",
        },
        {
          question: "How noisy are the reminders?",
          answer: "You choose the thresholds. By default, reviewers get one nudge per pull request once it's been waiting a working day.",
        },
      ],
    },
    finalCta: {
      title: "Get your pull requests moving",
      description: "Connect a repository and see your review queue in minutes.",
      primaryCta: signUpCta,
      secondaryCta: demoCta,
    },
  },
  {
    slug: "release-management",
    name: "Releases",
    summary: "Checklists, approvals and release notes in one flow.",
    icon: Rocket,
    metadata: {
      title: "Release management software",
      description: "Ship with checklists, approvals and auto-generated release notes, all tracked in Elula.",
    },
    hero: {
      eyebrow: "Releases",
      title: "Release day without the drama",
      description:
        "Checklists, approvals and release notes in one flow, with a clear record of exactly what shipped and when.",
      primaryCta: signUpCta,
      secondaryCta: demoCta,
      pattern: "chart",
      mediaLabel: "Preview of a release in Elula",
    },
    logos: customerLogos,
    highlights: {
      eyebrow: "Why Elula Releases",
      title: "Every release, accounted for",
      items: [
        {
          title: "Checklists that run themselves",
          description: "Reusable release checklists tick off steps automatically as CI passes and approvals land.",
          points: ["Templates per service", "Steps completed from CI events", "Blockers surfaced instantly"],
          pattern: "list",
          mediaLabel: "Preview of a release checklist",
        },
        {
          title: "Release notes from shipped work",
          description: "Elula drafts release notes from the pull requests in each release, ready to edit and publish.",
          points: ["Grouped by feature, fix and chore", "Edit before publishing", "Publish to your changelog"],
          pattern: "board",
          mediaLabel: "Preview of generated release notes",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Ship on schedule, every time",
      items: [
        { icon: CheckCheck, title: "Release checklists", description: "Reusable steps that complete from CI and approvals." },
        { icon: ShieldCheck, title: "Approvals", description: "Sign-offs from the right people before anything ships." },
        { icon: FileText, title: "Release notes", description: "Drafted automatically from merged pull requests." },
        { icon: History, title: "Audit history", description: "A permanent record of what shipped, when and by whom." },
        { icon: Workflow, title: "Environments", description: "Track promotions from staging to production." },
        { icon: Bell, title: "Notifications", description: "Keep stakeholders informed in Slack and email." },
      ],
    },
    testimonials: {
      eyebrow: "Customers",
      title: "Teams that ship every day trust Elula",
      items: [
        {
          quote: "Release notes used to take an afternoon. Now they're drafted before the deploy finishes.",
          author: { name: "Alex Kim", role: "Staff Engineer", company: "Initech" },
        },
        {
          quote: "Auditors ask what shipped and when. We send them a link.",
          author: { name: "Morgan Hale", role: "VP Engineering", company: "Umbrella" },
        },
      ],
    },
    faqs: {
      eyebrow: "FAQ",
      title: "Questions about Releases",
      items: [
        {
          question: "Does Elula deploy our code?",
          answer: "No. Elula tracks releases and coordinates the steps around them. Your existing CI/CD still does the deploy.",
        },
        {
          question: "Can release notes be published automatically?",
          answer: "Yes. You can review drafts first or publish straight to your changelog when a release is marked done.",
        },
      ],
    },
    finalCta: {
      title: "Make your next release the calmest one yet",
      description: "Start free and set up your first release checklist today.",
      primaryCta: signUpCta,
      secondaryCta: demoCta,
    },
  },
];
