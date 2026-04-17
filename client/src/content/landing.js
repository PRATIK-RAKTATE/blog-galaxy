import {
  ArrowUpRight,
  Bot,
  Boxes,
  Cable,
  LayoutPanelTop,
  Link2,
  SearchCheck,
} from "lucide-react";

export const site = {
  name: "BlogGalaxy",
  url: "https://bloggalaxy.app/",
  title: "BlogGalaxy | SERP-first blog writing for Google wins",
  description:
    "Write or generate blog posts with live SERP scoring, schema, internal links, and publish-ready SEO structure built into every draft.",
  ogImage: "https://bloggalaxy.app/og/landing-cover.svg",
};

export const navItems = [
  { label: "SERP AI", href: "/serp-blog" },
  { label: "Blogs", href: "/blogs" },
  { label: "Pricing", href: "#pricing" },
];

export const hero = {
  eyebrow: "SERP-first blog workspace",
  title: "You write. We score it for the page you want to win.",
  highlighted: "score it",
  description:
    "Draft manually or start with GPT-4o. Every post ships with schema, link suggestions, keyword clusters, and a ranking-focused workflow before you publish.",
  primaryCta: { label: "Start free — no card", href: "/signup" },
  secondaryCta: { label: "Explore blogs", href: "/blogs" },
  footnote: "We’re measuring ranking lift with our first 100 users. Join the cohort.",
  image: {
    src: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDF8fHx8MTc2ODUzNTUxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Futuristic AI technology interface with glowing code and abstract data visuals",
  },
};

export const trustStrip = {
  title: "Built on top of tools already in your stack",
  items: ["GPT-4o", "Anthropic", "Ahrefs data", "Google Search Console", "WordPress", "Webflow"],
};

export const problem = [
  "AI writes fluff.",
  "Fluff does not rank.",
  "You end up rewriting the whole post anyway.",
];

export const features = [
  {
    icon: SearchCheck,
    eyebrow: "Score live",
    title: "Real-time SERP scoring as you write",
    description: "See intent coverage, entity gaps, and title length before the draft leaves your editor.",
    outcome: "Catch ranking gaps before review starts.",
  },
  {
    icon: Boxes,
    eyebrow: "Ship structure",
    title: "Auto-generated schema",
    description: "Ship Article, FAQ, and HowTo markup without stitching JSON-LD together by hand.",
    outcome: "Publish with technical SEO already attached.",
  },
  {
    icon: LayoutPanelTop,
    eyebrow: "Plan clusters",
    title: "Keyword cluster planner",
    description: "Move from one target term to a connected publishing plan that compounds authority.",
    outcome: "Turn one post into a real search program.",
  },
  {
    icon: Link2,
    eyebrow: "Link library",
    title: "Internal link suggestions",
    description: "Pull relevant posts from your library and slot them in while the piece is still fresh.",
    outcome: "Stop fixing internal links after the draft is done.",
  },
  {
    icon: Cable,
    eyebrow: "Publish fast",
    title: "One-click publishing",
    description: "Send finished posts to WordPress, Ghost, or Webflow with metadata and structure intact.",
    outcome: "Keep the CMS handoff short.",
  },
  {
    icon: Bot,
    eyebrow: "Use AI carefully",
    title: "AI mode with editable outline",
    description: "Start from a model-generated draft, then reshape headings, claims, and links before publish.",
    outcome: "Keep speed without losing editorial control.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Start from a keyword or a live URL",
    description: "Drop in a target page, competitor URL, or topic. The brief forms around the current SERP.",
  },
  {
    number: "02",
    title: "Draft in AI mode or manual mode",
    description: "Use the outline as a starting point, then edit every heading and paragraph with full control.",
  },
  {
    number: "03",
    title: "Publish with structure already done",
    description: "Export schema, internal links, metadata, and a final score alongside the finished article.",
  },
];

export const compareModes = [
  {
    title: "When to use AI mode",
    body: "Use it when the brief is clear, the SERP is stable, and you need a first draft fast. You keep the outline editable, so the model stays useful instead of becoming the source of truth.",
  },
  {
    title: "When to write yourself",
    body: "Write manually when the post needs product nuance, original research, or a strong point of view. The scoring, linking, and schema layers still help even when every paragraph is yours.",
  },
];

export const pricing = {
  toggle: ["Monthly", "Annual"],
  tiers: [
    {
      name: "Free",
      monthly: "$0",
      annual: "$0",
      description: "For testing the workflow on a few posts each month.",
      included: ["3 drafts per month", "SERP preview", "Article schema", "1 CMS connection"],
      excluded: "No team seats, no cluster planner, no advanced content library sync.",
    },
    {
      name: "Pro",
      monthly: "$39",
      annual: "$31",
      description: "For solo marketers shipping search content every week.",
      included: ["Unlimited drafts", "Keyword clusters", "Internal link suggestions", "WordPress, Ghost, Webflow export"],
      excluded: "No approval workflows or shared client workspaces.",
      featured: true,
    },
    {
      name: "Team",
      monthly: "$99",
      annual: "$82",
      description: "For agencies and in-house teams with shared publishing queues.",
      included: ["5 seats included", "Shared content library", "Review states", "Priority support"],
      excluded: "Custom integrations and migration help are still handled separately.",
    },
  ],
};

export const faqs = [
  {
    question: "Do I have to use AI drafting?",
    answer: "No. You can write every paragraph yourself and still use the SERP score, schema generation, and internal linking tools.",
  },
  {
    question: "Which AI model powers the draft mode?",
    answer: "The default drafting flow uses GPT-4o, but the outline stays editable so you can reshape structure before any post goes live.",
  },
  {
    question: "Does BlogGalaxy publish directly to my CMS?",
    answer: "Yes. The current flow supports WordPress, Ghost, and Webflow exports with titles, descriptions, and structural metadata attached.",
  },
  {
    question: "Can I add my existing posts for internal link suggestions?",
    answer: "Yes. The product indexes your post library and suggests relevant internal links while you are still drafting.",
  },
  {
    question: "What happens on the free plan?",
    answer: "You can create three drafts each month, review SERP previews, export schema, and test one CMS connection before upgrading.",
  },
];

export const footer = {
  blurb: "SERP-first drafting for teams that want published posts to have a reason to rank.",
  columns: [
    { title: "Product", links: ["Features", "Pricing", "Blog workspace", "Roadmap"] },
    { title: "Resources", links: ["Docs", "Sample post", "Changelog", "Status"] },
    { title: "Company", links: ["About", "Contact", "Careers", "Partners"] },
    { title: "Legal", links: ["Privacy", "Terms", "DPA", "Cookies"] },
  ],
};
