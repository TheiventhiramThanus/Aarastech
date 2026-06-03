export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  color: string;
  featured: boolean;
  tag: string;
  author: string;
  authorRole: string;
  image: string;
  content: { heading?: string; body: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "future-of-ai-powered-web-development-2025",
    title: "The Future of AI-Powered Web Development in 2025",
    excerpt:
      "How large language models are reshaping the way we architect, build, and deploy modern web applications — and what it means for developers.",
    category: "AI & Tech",
    readTime: "8 min read",
    date: "15 Jan 2025",
    color: "#0697A7",
    featured: true,
    tag: "Featured",
    author: "Aaras Kumar",
    authorRole: "Founder & Lead Engineer",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "Web development has changed more in the last eighteen months than in the previous decade. Large language models are no longer a curiosity tucked into a sidebar — they sit at the center of the modern stack, generating code, designing components, writing tests, and orchestrating entire deployment pipelines. The question for 2025 is no longer whether AI belongs in your workflow, but how deep you let it run.",
      },
      {
        heading: "From autocomplete to autonomous agents",
        body: "Early AI tooling stopped at intelligent autocomplete. The new generation of agents reads your repo, writes a feature branch, runs the tests, and opens a pull request. We've seen teams ship ten times the volume of small features while focusing senior engineers on architecture and review. The role of the developer is shifting from typist to editor-in-chief.",
      },
      {
        heading: "The new stack: AI-native frameworks",
        body: "Frameworks like Next.js, Astro, and Remix are quietly absorbing AI primitives — streaming responses, structured outputs, and embedding stores — as first-class citizens. Expect to see a `use-llm` hook become as routine as `useState` by year's end.",
      },
      {
        heading: "What this means for you",
        body: "Lean into the parts of the craft that AI still struggles with: deep product thinking, accessibility, performance budgets, and judgment about what not to build. The developers who thrive in 2025 will be the ones who treat AI as a force multiplier on taste, not a replacement for it.",
      },
    ],
  },
  {
    id: 2,
    slug: "building-blazing-fast-react-apps-with-nextjs-15",
    title: "Building Blazing-Fast React Apps with Next.js 15",
    excerpt:
      "A deep dive into the new features of Next.js 15 — React Server Components, partial pre-rendering, and the app router's latest patterns.",
    category: "Web Dev",
    readTime: "6 min read",
    date: "10 Jan 2025",
    color: "#7c3aed",
    featured: false,
    tag: "Web Dev",
    author: "Priya Shah",
    authorRole: "Senior React Engineer",
    image:
      "https://images.unsplash.com/photo-1607706189992-eae578626c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "Next.js 15 is the most opinionated release the framework has shipped — and that's a good thing. The app router has matured, server components are stable, and partial pre-rendering blurs the line between static and dynamic in ways that finally feel natural.",
      },
      {
        heading: "React Server Components, demystified",
        body: "RSCs aren't a different React — they're a different runtime boundary. Components marked as server-only never ship JavaScript to the browser, which means a typical marketing page can drop from 200KB of JS to under 20KB. The trick is knowing where to draw the line; data-heavy, non-interactive surfaces belong on the server, while anything stateful stays on the client.",
      },
      {
        heading: "Partial pre-rendering in practice",
        body: "PPR lets you render the static shell of a page instantly while streaming dynamic regions as they resolve. We've used it to ship product detail pages that show in under 100ms while pricing and inventory fill in moments later. It's the closest thing to having your cake and eating it too.",
      },
      {
        heading: "Migration tips",
        body: "If you're moving from the pages router, take it one route at a time. Keep your old `getServerSideProps` flows alive while you port; don't try to rewrite the whole app in a weekend.",
      },
    ],
  },
  {
    id: 3,
    slug: "ui-design-trends-dominating-2025-glassmorphism-is-back",
    title: "UI Design Trends Dominating 2025: Glassmorphism is Back",
    excerpt:
      "From bento grids to kinetic typography — the design movements reshaping digital products in 2025 and how to implement them tastefully.",
    category: "Design",
    readTime: "5 min read",
    date: "5 Jan 2025",
    color: "#ec4899",
    featured: false,
    tag: "Design",
    author: "Maya Iyer",
    authorRole: "Design Director",
    image:
      "https://images.unsplash.com/photo-1684569546963-792efe6b2a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "Design trends move in cycles, and 2025 belongs to depth. After years of flat, sterile interfaces, glassmorphism is back — but smarter, softer, and more performance-conscious than its 2021 incarnation.",
      },
      {
        heading: "Bento grids are everywhere",
        body: "Apple's product pages popularised the look, and the rest of the industry has caught on. The appeal is obvious: bento layouts let you communicate multiple value propositions at a glance without overwhelming the viewer. The trick is restraint — three or four tiles, not nine.",
      },
      {
        heading: "Kinetic typography returns",
        body: "Animated headlines, scroll-bound text, and shader-driven gradients are back in fashion. Used sparingly, they signal craft. Overused, they slow the page and exhaust the reader.",
      },
      {
        heading: "How to use glass without the lag",
        body: "Modern glass effects rely on `backdrop-filter` blur, which is expensive. Limit it to small surfaces — nav bars, modal overlays — rather than full-page backgrounds, and your Lighthouse score will thank you.",
      },
    ],
  },
  {
    id: 4,
    slug: "how-to-scale-a-digital-agency-from-0-to-500k-arr",
    title: "How to Scale a Digital Agency from £0 to £500K ARR",
    excerpt:
      "Lessons from building AarasTech — positioning, pricing, hiring, and the operational playbook that took us from freelance to full agency.",
    category: "Business",
    readTime: "10 min read",
    date: "28 Dec 2024",
    color: "#10b981",
    featured: false,
    tag: "Business",
    author: "Aaras Kumar",
    authorRole: "Founder & Lead Engineer",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "Three years ago, AarasTech was a laptop and a Notion doc. Today it's a team of nine shipping work for clients on three continents. Here's what actually moved the needle — and what we wish we'd skipped.",
      },
      {
        heading: "Positioning beats pricing",
        body: "We charged what other freelancers charged for our first year and worked ourselves into the ground. The breakthrough wasn't raising rates — it was narrowing the offer. The moment we stopped saying 'we build websites' and started saying 'we build AI-native product surfaces for B2B SaaS,' inbound interest doubled and price sensitivity dropped.",
      },
      {
        heading: "Hire your weaknesses, not your friends",
        body: "Our first two hires were people we liked. Our next two were people who were better than us at something we hated doing — finance and project management. Guess which pair changed the company more.",
      },
      {
        heading: "The ops playbook nobody talks about",
        body: "Templated proposals, weekly retros, a single source of truth for pricing, and a hard rule against starting work before a signed SOW. Boring, unglamorous, and the reason the wheels stay on.",
      },
    ],
  },
  {
    id: 5,
    slug: "integrating-gpt-4-into-your-saas-product-complete-guide",
    title: "Integrating GPT-4 into Your SaaS Product: A Complete Guide",
    excerpt:
      "Step-by-step walkthrough of adding OpenAI's API to a production SaaS — streaming responses, cost optimisation, and guardrails.",
    category: "Tutorials",
    readTime: "12 min read",
    date: "20 Dec 2024",
    color: "#f59e0b",
    featured: false,
    tag: "Tutorial",
    author: "Devansh Patel",
    authorRole: "AI Engineering Lead",
    image:
      "https://images.unsplash.com/photo-1675557009483-e6cf3867976b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "Adding an LLM to a SaaS product looks easy in a demo and hard in production. The gap is everything that happens between the first call and the thousandth concurrent user.",
      },
      {
        heading: "Start with streaming",
        body: "Users will forgive a slow response if they see it happening. Stream tokens to the client over Server-Sent Events from the very first prototype — retrofitting streaming later is painful, and a non-streaming UI feels broken in 2025.",
      },
      {
        heading: "Cost is a design problem",
        body: "Caching prompts, summarising long contexts, and routing simple queries to a smaller model are not optimisations you do later — they are the architecture. We routinely cut LLM bills by 70% with no quality drop by routing intelligently.",
      },
      {
        heading: "Guardrails and evals",
        body: "Ship an evaluation harness before you ship the feature. You cannot improve what you cannot measure, and prompt regressions are silent killers. A spreadsheet of 50 golden prompts is enough to start.",
      },
    ],
  },
  {
    id: 6,
    slug: "why-typescript-is-non-negotiable-for-modern-teams",
    title: "Why TypeScript is Non-Negotiable for Modern Teams",
    excerpt:
      "The concrete, ROI-driven case for strict TypeScript in production codebases — fewer bugs, faster onboarding, and better tooling.",
    category: "Web Dev",
    readTime: "5 min read",
    date: "12 Dec 2024",
    color: "#06b6d4",
    featured: false,
    tag: "Web Dev",
    author: "Priya Shah",
    authorRole: "Senior React Engineer",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "Every team we've worked with that resisted TypeScript eventually adopted it — and not one has ever switched back. The pattern is too consistent to ignore.",
      },
      {
        heading: "The ROI is in onboarding",
        body: "The biggest win isn't catching bugs — it's that a new engineer can navigate an unfamiliar codebase with the editor as their guide. Hover, jump-to-definition, and autocomplete cut ramp-up time roughly in half on every team we've measured.",
      },
      {
        heading: "Strict mode or it doesn't count",
        body: "Half-strict TypeScript is worse than none. The `any` escape hatch becomes a load-bearing wall, and the type system gives you false confidence. Turn on `strict`, fix the errors, never look back.",
      },
      {
        heading: "Tooling that pays for itself",
        body: "End-to-end type safety from the database to the UI — via tools like Drizzle, tRPC, and Zod — eliminates an entire class of integration bugs. The first time you rename a column and the editor highlights every dependent component, you'll understand the appeal.",
      },
    ],
  },
  {
    id: 7,
    slug: "tailwind-css-v4-everything-you-need-to-know",
    title: "Tailwind CSS v4: Everything You Need to Know",
    excerpt:
      "Breaking down the CSS-native configuration, new utility classes, and performance improvements in Tailwind v4 that change the styling game.",
    category: "Web Dev",
    readTime: "7 min read",
    date: "5 Dec 2024",
    color: "#0697A7",
    featured: false,
    tag: "Web Dev",
    author: "Maya Iyer",
    authorRole: "Design Director",
    image:
      "https://images.unsplash.com/photo-1731937389219-0482470c099e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "Tailwind v4 is the biggest rewrite the project has shipped since the JIT engine. Most of it is invisible — your existing classes still work — but the new foundations open up patterns that v3 could only dream of.",
      },
      {
        heading: "Goodbye tailwind.config.js",
        body: "Configuration now lives in CSS via `@theme` blocks, which means design tokens are real CSS variables you can override per-component, per-section, or per-theme. No more rebuilds to tweak a colour.",
      },
      {
        heading: "Faster, smaller, simpler",
        body: "The Rust-based engine compiles a large project in milliseconds, and the generated CSS is noticeably smaller. We've seen 30% reductions in stylesheet size on real production sites with zero changes to markup.",
      },
      {
        heading: "New utilities worth your attention",
        body: "Container queries, `text-balance`, dynamic viewport units, and 3D transforms are all first-class now. The container-query support alone retires half the JavaScript we used to write for responsive components.",
      },
    ],
  },
  {
    id: 8,
    slug: "building-a-design-system-from-scratch-in-figma",
    title: "Building a Design System from Scratch in Figma",
    excerpt:
      "How we built and maintain AarasTech's internal design system — tokens, component libraries, documentation, and handoff workflows.",
    category: "Design",
    readTime: "9 min read",
    date: "28 Nov 2024",
    color: "#7c3aed",
    featured: false,
    tag: "Design",
    author: "Maya Iyer",
    authorRole: "Design Director",
    image:
      "https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    content: [
      {
        body: "A design system is not a Figma file. It's an agreement between designers, engineers, and the product about how decisions get made. The Figma file is just where that agreement lives.",
      },
      {
        heading: "Start with tokens, not components",
        body: "Resist the urge to draw buttons on day one. Define your colour, spacing, and typography tokens first — every component you build later will inherit from them. If you skip this step, you'll spend the next six months reconciling fifteen shades of gray.",
      },
      {
        heading: "Components are contracts",
        body: "Every component you publish is a promise to the team that it will behave a certain way. Treat new components like API endpoints — version them, document them, and don't break them lightly.",
      },
      {
        heading: "Bridge to code with Code Connect",
        body: "Figma's Code Connect maps your design components to their real implementations in your codebase. Engineers see the actual import path in the inspect panel, and designers stop drawing components that don't exist. It's the single biggest workflow upgrade we've made in two years.",
      },
    ],
  },
];

export const USER_BLOG_POSTS_KEY = "aarastech_user_blog_posts";

export const getStoredBlogPosts = (): BlogPost[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USER_BLOG_POSTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getAllBlogPosts = () => [...getStoredBlogPosts(), ...blogPosts];

export const getBlogPost = (slug: string) =>
  getAllBlogPosts().find((p) => p.slug === slug);
