// Placeholder content for the dev-only component preview. Not product copy, so
// it lives next to the route rather than in src/lib/content.ts.

export const preview = {
  title: "UI primitives",
  description:
    "Every baseline component in light and dark mode. Dev only; returns 404 in production.",
  nav: {
    brand: "Elula",
    menuLabel: "Open menu",
    product: {
      label: "Product",
      links: [
        { title: "Features", href: "#", description: "What Elula does for your team." },
        { title: "Integrations", href: "#", description: "Connect the tools you already use." },
        { title: "Security", href: "#", description: "How we keep your data safe." },
      ],
    },
    simpleLinks: [
      { title: "Pricing", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Docs", href: "#" },
    ],
  },
  sections: {
    typography: "Typography",
    buttons: "Button & Button Group",
    badges: "Badge & Avatar",
    cards: "Card & Switch",
    tabs: "Tabs",
    accordion: "Accordion",
    forms: "Field, Input & Input Group",
    items: "Item",
    table: "Table",
    dataTable: "Data Table",
    sheet: "Sheet",
  },
  typography: {
    h1: "Heading one",
    h2: "Heading two",
    h3: "Heading three",
    h4: "Heading four",
    lead: "A lead paragraph sets up the section that follows.",
    p: "Body text sits at a comfortable line height for long-form reading in the blog and docs.",
    code: "yarn dev",
    codePrefix: "Run ",
    codeSuffix: " to start the dev server.",
    quote: "Good primitives make every page faster to build.",
    list: ["First item", "Second item", "Third item"],
    large: "Large text",
    small: "Small text",
    muted: "Muted helper text.",
  },
  buttons: {
    default: "Default",
    secondary: "Secondary",
    outline: "Outline",
    ghost: "Ghost",
    destructive: "Destructive",
    link: "Link",
    withIcon: "Get started",
    group: ["Day", "Week", "Month"],
    copyLabel: "Copy",
  },
  badges: ["New", "Secondary", "Outline", "Destructive"],
  avatars: ["EL", "AB", "CD"],
  pricing: {
    title: "Pro",
    description: "For growing teams.",
    price: "$24",
    period: "/ month",
    annualLabel: "Bill annually",
    cta: "Choose plan",
  },
  tabs: [
    { value: "npm", label: "npm", code: "npm install elula" },
    { value: "yarn", label: "yarn", code: "yarn add elula" },
    { value: "pnpm", label: "pnpm", code: "pnpm add elula" },
  ],
  faqs: [
    { q: "Is there a free trial?", a: "Yes, every plan starts with a 14-day trial." },
    { q: "Can I cancel anytime?", a: "Yes, cancel from your account settings at any time." },
  ],
  form: {
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    emailDescription: "We'll only use this for product updates.",
    searchPlaceholder: "Search docs...",
    searchShortcut: "⌘K",
    subscribe: "Subscribe",
  },
  items: [
    { title: "Fast setup", description: "Go from sign-up to first result in minutes." },
    { title: "Secure by default", description: "SSO, audit logs and encryption at rest." },
  ],
  itemAction: "Learn more",
  invoices: {
    caption: "Recent invoices",
    headers: ["Invoice", "Status", "Amount"],
    rows: [
      ["INV-001", "Paid", "$250.00"],
      ["INV-002", "Pending", "$150.00"],
      ["INV-003", "Unpaid", "$350.00"],
    ],
  },
  sheet: {
    trigger: "Open sheet",
    title: "Sheet title",
    description: "Sheets slide in from any edge; used for mobile nav and the docs sidebar.",
    close: "Close",
  },
};

export type Customer = {
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
  seats: number;
};

export const dataTableColumns = {
  name: "Name",
  email: "Email",
  plan: "Plan",
  seats: "Seats",
  filterPlaceholder: "Filter emails...",
};

export const customers: Customer[] = [
  { name: "Ada Lovelace", email: "ada@example.com", plan: "Enterprise", seats: 120 },
  { name: "Alan Turing", email: "alan@example.com", plan: "Pro", seats: 14 },
  { name: "Grace Hopper", email: "grace@example.com", plan: "Enterprise", seats: 85 },
  { name: "Linus Torvalds", email: "linus@example.com", plan: "Free", seats: 1 },
  { name: "Margaret Hamilton", email: "margaret@example.com", plan: "Pro", seats: 22 },
  { name: "Dennis Ritchie", email: "dennis@example.com", plan: "Free", seats: 2 },
  { name: "Barbara Liskov", email: "barbara@example.com", plan: "Pro", seats: 9 },
];
