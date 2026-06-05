import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, BarChart3, FolderOpen, Layers, Users, BookOpen,
  MessageSquare, Settings, X, TrendingUp, ArrowUp, ArrowDown,
  Bell, Search, Zap, Star, Plus, Edit2, Trash2, Eye, Send,
  Globe, Smartphone, Brain, Palette, ShoppingCart, Megaphone,
  Cloud, Bot, ToggleLeft, ToggleRight, User, Lock, MousePointerClick,
  Palette as PaletteIcon, Mail, Phone, MapPin, Save, ExternalLink,
  AlertTriangle, MessageCircle, Upload, RefreshCw, Activity, Calendar
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "../../imports/ChatGPT_Image_May_27__2026__10_20_02_PM.png";
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy, getDocs, writeBatch,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { SEED_TESTIMONIALS } from "../data/seedTestimonials";
import { blogPostToContentText, blogPosts as BLOG_POSTS_FOR_SEED } from "../data/blogPosts";
import { AdsSection } from "./AdsSection";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string; name: string; client: string; type: string;
  budget: string; due: string; status: string; progress: number; color: string;
}
interface Client {
  id: string; name: string; company: string; email: string;
  location: string; projects: number; spent: string; status: string; avatar: string;
}
interface BlogPost {
  id: string; title: string; category: string; date: string;
  status: string; views: number; color: string;
  slug?: string; excerpt?: string; readTime?: string; tag?: string;
  author?: string; authorRole?: string; image?: string; contentText?: string;
}
interface Service {
  id: string; title: string; desc: string; features: string; color: string; image?: string; active: boolean; icon: string;
}
interface Message {
  id: string; name: string; company: string; email: string;
  msg: string; service?: string; budget?: string; time: string; unread: boolean; avatar: string; thread: string[];
}
interface CommunityComment {
  id: string; title: string; desc: string; icon: string; color: string; status: string; time: string;
  image?: string; link?: string;
  pdfUrl?: string; pdfName?: string;
}
interface Testimonial {
  id: string; name: string; role: string; location: string;
  avatar: string; rating: number; text: string; color: string;
}
export interface Ad {
  id: string; title: string; description: string; image: string; link: string;
  position: string; status: "Active" | "Inactive"; views: number; clicks: number;
  start_date: string; end_date: string; color?: string; target_pages?: string[];
}

// ─── Seed Data ─────────────────────────────────────────────────────────────────

const SEED_PROJECTS = [
  { name: "FinanceFlow AI Platform", client: "NexTech Solutions", status: "Active", progress: 75, budget: "$12,000", due: "2025-06-30", color: "#0697A7", type: "AI" },
  { name: "MedConnect Mobile App", client: "HealthConnect", status: "Review", progress: 92, budget: "$9,500", due: "2025-05-28", color: "#7c3aed", type: "Mobile" },
  { name: "LuxBrand Identity", client: "LuxBrand Co", status: "Complete", progress: 100, budget: "$4,200", due: "2025-05-10", color: "#10b981", type: "Branding" },
  { name: "CloudDesk SaaS", client: "CloudDesk Inc", status: "Active", progress: 45, budget: "$18,000", due: "2025-08-15", color: "#f59e0b", type: "SaaS" },
  { name: "SmartBot Integration", client: "RetailMax", status: "Planning", progress: 20, budget: "$6,800", due: "2025-09-01", color: "#ec4899", type: "AI" },
  { name: "NexCommerce Store", client: "NexStore Ltd", status: "Active", progress: 60, budget: "$11,500", due: "2025-07-20", color: "#06b6d4", type: "Web" },
];

const SEED_CLIENTS = [
  { name: "James Richardson", company: "NexTech Solutions", email: "james@nextech.co.uk", location: "London, UK", projects: 3, spent: "$31,500", status: "Active", avatar: "JR" },
  { name: "Priya Wickramasinghe", company: "HealthConnect", email: "priya@healthconnect.lk", location: "Colombo, LK", projects: 2, spent: "$18,700", status: "Active", avatar: "PW" },
  { name: "Marcus Thompson", company: "CloudDesk Inc", email: "marcus@clouddesk.io", location: "Manchester, UK", projects: 1, spent: "$18,000", status: "Active", avatar: "MT" },
  { name: "Amara Perera", company: "LuxBrand Co", email: "amara@luxbrand.lk", location: "Kandy, LK", projects: 2, spent: "$9,200", status: "Active", avatar: "AP" },
  { name: "David Clarke", company: "RetailMax", email: "david@retailmax.co.uk", location: "Bristol, UK", projects: 1, spent: "$6,800", status: "Pending", avatar: "DC" },
];

const SEED_SERVICES = [
  { title: "Custom Website Development", desc: "Blazing-fast, SEO-optimized websites built with React, Next.js, and modern frameworks.", features: "React / Next.js, SEO optimized, Mobile-first, CMS integration", color: "#0697A7", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Globe" },
  { title: "AI-Powered Applications", desc: "Intelligent web apps leveraging GPT-4, machine learning, and automation.", features: "GPT integration, ML models, Predictive analytics, NLP chatbots", color: "#7c3aed", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Brain" },
  { title: "Mobile App Development", desc: "Native iOS & Android apps and cross-platform solutions.", features: "React Native, iOS & Android, Push notifications, Offline support", color: "#06b6d4", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Smartphone" },
  { title: "UI/UX Design", desc: "Premium interface design from research to pixel-perfect final UI.", features: "Figma design, User research, Prototyping, Design systems", color: "#ec4899", image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Palette" },
  { title: "E-Commerce Solutions", desc: "Full-featured online stores with Stripe, PayPal, inventory management.", features: "Shopify / custom, Payment gateways, Inventory system, Analytics", color: "#f59e0b", image: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "ShoppingCart" },
  { title: "Branding & Creative Design", desc: "Complete brand identity — logo design, style guides, typography.", features: "Logo design, Brand guidelines, Print & digital, Motion graphics", color: "#10b981", image: "https://images.unsplash.com/photo-1770591060040-25fd7d6a4c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Star" },
  { title: "SEO & AEO Optimization", desc: "Technical SEO, answer engine optimization, schema markup, and content strategy for better discovery.", features: "Technical SEO, AEO content, Schema markup, Analytics", color: "#0697A7", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Megaphone" },
  { title: "Social Media Management", desc: "Strategic social media presence with content creation and community management.", features: "Content creation, Scheduling, Community mgmt, Reporting", color: "#7c3aed", image: "https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "BarChart3" },
  { title: "SaaS Platform Development", desc: "Scalable, multi-tenant SaaS products from concept to production.", features: "Multi-tenant, Stripe billing, Role management, AWS / GCP", color: "#06b6d4", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Layers" },
  { title: "Business Portfolio Websites", desc: "Professional portfolio and corporate websites that showcase your brand.", features: "Corporate sites, Portfolio, Case studies, Lead capture", color: "#ec4899", image: "https://images.unsplash.com/photo-1779700210487-a01758a3c55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Globe" },
  { title: "AI Chatbot Integration", desc: "Intelligent conversational AI systems that automate customer support.", features: "GPT-powered, Multi-language, CRM integration, Analytics", color: "#f59e0b", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Bot" },
  { title: "Automation Systems", desc: "Business process automation eliminating repetitive tasks.", features: "Zapier / Make, Custom scripts, API integration, Data pipelines", color: "#10b981", image: "https://images.unsplash.com/photo-1593062037896-764e9f52029e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Zap" },
  { title: "Cloud Solutions", desc: "Enterprise-grade cloud architecture, CI/CD pipelines, containerization.", features: "AWS / Azure / GCP, Docker & K8s, CI/CD pipelines, 24/7 monitoring", color: "#0697A7", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", active: true, icon: "Cloud" },
];

const SEED_COMMENTS = [
  { title: "New AarasTech Service Launched!", desc: "We're excited to announce our new AI-Powered Automation service. Click to learn how it can streamline your business operations.", icon: "Rocket", color: "#ec4899", status: "Pinned", time: "Today", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", link: "https://aarastech.com/services" },
  { title: "Free tools", desc: "Useful no-cost tools, templates, and productivity links.", icon: "Wrench", color: "#0697A7", status: "Published", time: "Today" },
  { title: "Certificates", desc: "Free and trusted certificate opportunities from official sources.", icon: "GraduationCap", color: "#7c3aed", status: "Published", time: "Today" },
  { title: "Jobs & internships", desc: "Genuine hiring links, internships, and career openings.", icon: "Briefcase", color: "#10b981", status: "Published", time: "Today" },
  { title: "Tech resources", desc: "Learning paths, docs, and practical resources for builders.", icon: "Sparkles", color: "#ec4899", status: "Published", time: "Today" },
  { title: "Community support", desc: "Friendly help, guidance, and peer-to-peer support.", icon: "HeartHandshake", color: "#f59e0b", status: "Published", time: "Today" },
  { title: "Trusted sources", desc: "No spam. No fake links. Only valuable updates.", icon: "ShieldCheck", color: "#38bdf8", status: "Published", time: "Today" },
];

const LEGACY_SEED_BLOG_POSTS = [
  { title: "The Future of AI-Powered Web Development in 2025", category: "AI & Tech", date: "2025-01-15", status: "Published", views: 1205, color: "#0697A7", slug: "future-of-ai-powered-web-development-2025", excerpt: "How large language models are reshaping the way we architect, build, and deploy modern web applications.", readTime: "8 min read", tag: "Featured", author: "Aaras Kumar", authorRole: "Founder & Lead Engineer", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600", contentText: "The web development landscape is undergoing a massive transformation as we move further into 2025, primarily driven by the rapid evolution of artificial intelligence. At AarasTech, we've witnessed firsthand how AI is no longer just a buzzword, but a foundational element in building modern, scalable web applications. The integration of large language models (LLMs) and intelligent APIs is completely reshaping the way we architect solutions for our clients.\n\nIn the past, adding AI capabilities to a website was an expensive, time-consuming endeavor reserved for tech giants. Today, the democratization of AI tools means that businesses of all sizes can leverage intelligent features. From dynamic chatbots that understand natural language context to predictive analytics engines that personalize user experiences in real-time, the possibilities are boundless. AarasTech specializes in seamlessly integrating these powerful AI capabilities into custom web platforms, ensuring our clients stay ahead of the curve.\n\nOne of the most significant shifts we are observing is the move towards autonomous AI agents. These are not just simple script-followers; they can analyze complex user inputs, make decisions based on extensive data sets, and execute multi-step workflows. For e-commerce sites, this means hyper-personalized product recommendations and dynamic pricing models. For SaaS platforms, it means intelligent onboarding flows and automated customer support that actually solves problems.\n\nHowever, implementing AI successfully requires more than just calling an API. It demands a robust underlying architecture that can handle asynchronous requests, manage token limits efficiently, and ensure data privacy and security. Our engineering team at AarasTech utilizes modern frameworks like Next.js and robust cloud infrastructure to build these resilient systems. We focus on optimizing performance so that AI-driven features enhance, rather than degrade, the core user experience.\n\nLooking ahead, the synergy between AI and web development will only deepen. Generative UI, where interfaces adapt and reconfigure themselves based on user behavior and preferences, is already on the horizon. At AarasTech, we are committed to pushing these boundaries. By combining our deep expertise in web technologies with the latest advancements in artificial intelligence, we build digital products that are not just functional, but truly intelligent and adaptable." },
  { title: "Building Blazing-Fast React Apps with Next.js 15", category: "Web Dev", date: "2025-01-10", status: "Published", views: 890, color: "#7c3aed", slug: "building-blazing-fast-react-apps-with-nextjs-15", excerpt: "A deep dive into the new features of Next.js 15 — React Server Components, partial pre-rendering.", readTime: "6 min read", tag: "Web Dev", author: "Priya Shah", authorRole: "Senior React Engineer", image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600", contentText: "Performance has always been the cornerstone of a successful digital product. In today's fast-paced digital economy, every millisecond counts. That's why at AarasTech, we consistently choose Next.js 15 as our premier framework for building blazing-fast, scalable React applications. This latest iteration of Next.js brings a host of powerful features that allow us to deliver unparalleled user experiences for our enterprise and startup clients alike.\n\nThe defining feature of Next.js 15 is its matured implementation of React Server Components (RSCs). Unlike traditional React where the entire component tree is bundled and sent to the browser, RSCs allow us to render components exclusively on the server. This fundamentally changes the performance equation. By executing data fetching and heavy logic server-side, we significantly reduce the amount of JavaScript sent over the wire. The result? Dramatically faster initial page loads and a more responsive interface, especially on low-powered mobile devices.\n\nBut speed isn't just about reducing payload size. Next.js 15 introduces advanced caching mechanisms and partial pre-rendering (PPR). PPR is a game-changer for dynamic applications. It allows us to serve a static shell of the page instantly from a CDN, while seamlessly streaming in dynamic content—like shopping carts or personalized feeds—in the background. At AarasTech, we leverage these techniques to build complex e-commerce and SaaS platforms that feel instantaneous, blurring the lines between static sites and dynamic web apps.\n\nFurthermore, the new routing paradigm and enhanced data mutation patterns make building complex applications more intuitive and robust. Server Actions allow our developers to write server-side mutation logic directly alongside our client components, eliminating the need for boilerplate API routes. This streamlines our development process, allowing us to deliver robust features faster and more securely.\n\nSecurity is also inherently improved with this architecture. Because sensitive logic and API keys remain strictly on the server, the attack surface of the client application is minimized. At AarasTech, we prioritize secure, high-performance architecture. By mastering the advanced capabilities of Next.js 15, we ensure that the web applications we build are not only visually stunning and highly functional but also engineered for maximum speed and scalability." },
  { title: "Designing for the Next Generation of UI", category: "Design", date: "2025-02-01", status: "Published", views: 760, color: "#ec4899", slug: "designing-next-generation-ui", excerpt: "Exploring the shift towards spatial computing and generative UI in modern applications.", readTime: "5 min read", tag: "Design", author: "Maya Chen", authorRole: "Lead Designer", image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600", contentText: "The principles of user interface (UI) and user experience (UX) design are undergoing a profound evolution. We are moving away from static, one-size-fits-all screens towards dynamic, context-aware environments. At AarasTech, our design philosophy is deeply rooted in this transition. We believe that the next generation of UI design is not just about looking good; it's about anticipating user needs, reducing cognitive load, and creating fluid, immersive digital experiences.\n\nOne of the most exciting trends we are integrating into our design process is the concept of Generative UI. This approach moves beyond traditional responsive design (which adapts to screen sizes) to interfaces that adapt to the user themselves. Imagine a dashboard that reorganizes its widgets based on the time of day or the user's current workflow. By leveraging user data and intelligent algorithms, we can design systems that learn and evolve, presenting the right information at exactly the right moment.\n\nFurthermore, the rise of spatial computing is forcing designers to think beyond the 2D constraints of traditional screens. While fully immersive AR/VR applications are still maturing, the design language they introduce—depth, lighting, and spatial audio—is already influencing web and mobile interfaces. We are incorporating subtle micro-interactions, soft 3D elements, and physics-based animations to create interfaces that feel tactile and grounded in reality. These aren't just decorative elements; they provide crucial visual feedback and make digital interactions feel more intuitive and natural.\n\nAccessibility remains a core pillar of our design strategy at AarasTech. The next generation of UI must be inclusive by default. We are utilizing advanced contrast checking, dynamic typography scales, and comprehensive screen-reader support from the very beginning of the design phase. We believe that beautiful design should never come at the expense of usability.\n\nUltimately, our goal at AarasTech is to craft digital products that resonate with users on a deeper level. By combining cutting-edge aesthetic trends with rigorous UX research and innovative concepts like Generative UI, we deliver interfaces that are not only visually stunning but also highly functional, adaptable, and a joy to use. The future of design is dynamic, and we are excited to build it." },
  { title: "Growing Your Digital Business in a Crowded Market", category: "Business", date: "2025-02-14", status: "Published", views: 1120, color: "#f59e0b", slug: "growing-digital-business", excerpt: "Actionable strategies to differentiate your brand and acquire customers in competitive industries.", readTime: "7 min read", tag: "Strategy", author: "Samir Patel", authorRole: "Growth Strategist", image: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600", contentText: "In today's hyper-competitive digital landscape, simply having a good product or service is no longer enough to guarantee success. The barrier to entry has never been lower, meaning markets are more crowded and attention spans are shorter than ever. At AarasTech, we partner with ambitious brands to navigate this complexity, providing the strategic technical foundation and digital marketing expertise needed to cut through the noise and achieve sustainable growth.\n\nThe first step to standing out is establishing a distinctive and authoritative digital presence. Your website is often the first point of contact between your brand and a potential customer. It cannot just be an online brochure; it must be a conversion engine. We focus on building bespoke, high-performance websites that tell a compelling brand story while meticulously guiding the user towards a desired action. From lightning-fast load times to frictionless checkout processes, every technical decision we make is optimized for conversion and customer acquisition.\n\nHowever, building a great platform is only half the battle. You need a targeted strategy to drive qualified traffic. This is where a holistic approach to SEO (Search Engine Optimization) and content marketing becomes critical. We don't just chase vanity metrics or keyword rankings; we focus on semantic search and user intent. By creating deep, authoritative content that genuinely answers your target audience's questions, we build domain authority that translates into sustainable, organic growth.\n\nFurthermore, leveraging data is paramount in a crowded market. Gut feelings are no longer sufficient. At AarasTech, we implement robust analytics and user tracking setups that provide granular insights into user behavior. We utilize A/B testing, heatmaps, and conversion funnel analysis to continuously iterate and refine the user experience. This data-driven approach ensures that marketing budgets are spent efficiently and that the platform is constantly evolving to meet user needs.\n\nFinally, we emphasize the power of automation to scale your operations. From automated email nurturing sequences to intelligent CRM integrations, we build systems that handle the heavy lifting, allowing your team to focus on high-level strategy and customer relationships. Growing a digital business in 2025 requires a unified approach combining exceptional technology, strategic marketing, and intelligent automation. At AarasTech, we deliver all three." },
  { title: "Mastering Tailwind CSS: Advanced Techniques", category: "Tutorials", date: "2025-03-05", status: "Published", views: 940, color: "#10b981", slug: "mastering-tailwind-css", excerpt: "Take your Tailwind CSS skills to the next level with custom configurations and plugins.", readTime: "4 min read", tag: "Code", author: "Priya Shah", authorRole: "Senior React Engineer", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600", contentText: "Tailwind CSS has fundamentally shifted how developers approach styling on the web. It has moved us away from the bloated, difficult-to-maintain stylesheets of the past and into an era of rapid, utility-first development. At AarasTech, Tailwind CSS is a core component of our frontend tech stack. While many developers grasp the basics quickly, true mastery lies in leveraging its advanced features to build scalable, highly customized design systems.\n\nOne of the most powerful aspects of Tailwind is its configuration file (`tailwind.config.js`). It's not just a place to define colors; it's the central source of truth for your entire design language. We highly recommend moving beyond the default palette. By meticulously defining custom color scales, typography settings, and spacing variables that perfectly align with your brand guidelines, you ensure absolute consistency across your application. We frequently utilize CSS variables within our Tailwind configuration, allowing us to implement seamless dynamic theming and robust dark mode support with minimal effort.\n\nAnother crucial technique for large-scale applications is the strategic use of Tailwind plugins. While the core utilities cover 90% of use cases, complex components like custom scrollbars, complex grid layouts, or specific typography rules often require specialized CSS. Instead of reverting to arbitrary CSS files, writing custom Tailwind plugins allows you to package these complex styles as reusable utility classes, maintaining the unified workflow that makes Tailwind so powerful.\n\nFurthermore, we must address the challenge of bloated HTML markup, a common critique of the utility-first approach. At AarasTech, we solve this by effectively combining Tailwind with component-based frameworks like React. By encapsulating complex, heavily-styled elements within reusable components, we keep our markup clean and maintainable. We also utilize tools like `clsx` and `tailwind-merge` to handle dynamic class composition elegantly, ensuring that conditional styling doesn't lead to specificity conflicts or unreadable code.\n\nFinally, optimizing for production is essential. Tailwind's JIT (Just-In-Time) compiler ensures that only the classes you actually use are included in your final CSS bundle, resulting in incredibly small file sizes. By mastering these advanced techniques—custom configuration, plugin development, intelligent component encapsulation, and optimization—Tailwind CSS transforms from a simple utility library into a robust engine for building enterprise-grade, pixel-perfect user interfaces." },
];

const SEED_BLOG_POSTS = BLOG_POSTS_FOR_SEED.map(({ id, content, ...post }) => ({
  ...post,
  status: "Published",
  views: id === 1 ? 1205 : 0,
  contentText: blogPostToContentText(content),
}));

const SEED_SEEDED_KEY = "aarastech_firebase_seeded_v7";

// Force-clear a collection then write fresh seed data
async function forceReseedCollection(collectionName: string, seedData: object[]) {
  // Delete all existing docs
  const snap = await getDocs(collection(db, collectionName));
  if (!snap.empty) {
    const delBatch = writeBatch(db);
    snap.docs.forEach(d => delBatch.delete(d.ref));
    await delBatch.commit();
  }
  // Write new seed data
  const addBatch = writeBatch(db);
  seedData.forEach(item => {
    const ref = doc(collection(db, collectionName));
    addBatch.set(ref, { ...item, createdAt: serverTimestamp() });
  });
  await addBatch.commit();
}

async function seedAllIfNeeded() {
  if (localStorage.getItem(SEED_SEEDED_KEY)) return;
  // Clear old seed keys so we always re-seed on version bump
  ["v1","v2","v3","v4","v5","v6","v7"].forEach(v => localStorage.removeItem(`aarastech_firebase_seeded_${v}`));
  await Promise.all([
    forceReseedCollection("services", SEED_SERVICES),
    forceReseedCollection("blog_posts", SEED_BLOG_POSTS),
    forceReseedCollection("community_comments", SEED_COMMENTS),
    forceReseedCollection("testimonials", SEED_TESTIMONIALS),
    // projects & clients: only seed if empty (don't wipe user data)
    (async () => {
      const s = await getDocs(collection(db, "projects"));
      if (s.empty) {
        const b = writeBatch(db);
        SEED_PROJECTS.forEach(item => { const r = doc(collection(db, "projects")); b.set(r, { ...item, createdAt: serverTimestamp() }); });
        await b.commit();
      }
    })(),
    (async () => {
      const s = await getDocs(collection(db, "clients"));
      if (s.empty) {
        const b = writeBatch(db);
        SEED_CLIENTS.forEach(item => { const r = doc(collection(db, "clients")); b.set(r, { ...item, createdAt: serverTimestamp() }); });
        await b.commit();
      }
    })(),
  ]);
  localStorage.setItem(SEED_SEEDED_KEY, "true");
}

// ─── Charts Data ──────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 8400, projects: 3, visitors: 1200 },
  { month: "Feb", revenue: 12000, projects: 5, visitors: 1800 },
  { month: "Mar", revenue: 9800, projects: 4, visitors: 1500 },
  { month: "Apr", revenue: 15600, projects: 7, visitors: 2100 },
  { month: "May", revenue: 11200, projects: 5, visitors: 1900 },
  { month: "Jun", revenue: 18900, projects: 8, visitors: 2600 },
  { month: "Jul", revenue: 14300, projects: 6, visitors: 2300 },
  { month: "Aug", revenue: 22100, projects: 9, visitors: 3100 },
  { month: "Sep", revenue: 19800, projects: 8, visitors: 2800 },
  { month: "Oct", revenue: 25400, projects: 11, visitors: 3500 },
  { month: "Nov", revenue: 23100, projects: 10, visitors: 3200 },
  { month: "Dec", revenue: 28700, projects: 12, visitors: 4000 },
];

const serviceBreakdown = [
  { name: "Web Dev", value: 30, color: "#0697A7" },
  { name: "Mobile", value: 20, color: "#7c3aed" },
  { name: "AI", value: 18, color: "#a855f7" },
  { name: "Design", value: 15, color: "#ec4899" },
  { name: "SEO", value: 10, color: "#10b981" },
  { name: "Other", value: 7, color: "#f59e0b" },
];

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string }> = {
    Active: { color: "#0697A7", bg: "rgba(6,151,167,0.1)" },
    Review: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    Complete: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    Planning: { color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
    Published: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    Draft: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
    Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    Pinned: { color: "#0697A7", bg: "rgba(6,151,167,0.1)" },
  };
  const s = map[status] || { color: "#888", bg: "rgba(136,136,136,0.1)" };
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ color: s.color, background: s.bg }}>
      {status}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-[#0a0a0a] ${className}`} style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-3xl max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl p-4 sm:p-6 relative my-3 sm:my-4"
          style={{ background: "#0f0f0f", border: "1px solid rgba(6,151,167,0.2)", boxShadow: "0 0 60px rgba(6,151,167,0.1)" }}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 px-4 pt-4 pb-4 sm:px-6 sm:pt-6 mb-4 flex items-center justify-between bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-white/5">
            <h2 className="text-white font-semibold text-base sm:text-lg pr-4" style={{ fontFamily: "Space Grotesk" }}>{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={18} /></button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ConfirmDelete({ label, onConfirm, onCancel }: { label: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal title="Confirm Delete" onClose={onCancel}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
          <AlertTriangle size={26} className="text-red-400" />
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Are you sure you want to delete <span className="text-white font-semibold">"{label}"</span>?
          <br />This action cannot be undone.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-gray-400 text-sm font-medium transition-all" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold bg-red-500 hover:bg-red-600 transition-all">Delete</button>
        </div>
      </div>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-gray-400 text-xs mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full min-w-0 rounded-xl px-4 py-3 sm:py-2.5 text-white text-sm outline-none bg-white/5 border border-white/10 focus:border-[#0697A7]/50 transition-all placeholder:text-gray-600";
const selectCls = inputCls + " appearance-none";

// ─── Project Form ──────────────────────────────────────────────────────────────

const PROJECT_COLORS: Record<string, string> = {
  AI: "#7c3aed", Mobile: "#06b6d4", Web: "#0697A7", SaaS: "#f59e0b",
  Branding: "#10b981", Design: "#ec4899",
};

function ProjectForm({ initial, onSave, onClose, loading }: {
  initial?: Partial<Project>; onSave: (p: Omit<Project, "id">) => void; onClose: () => void; loading?: boolean;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "", client: initial?.client ?? "", type: initial?.type ?? "Web",
    budget: initial?.budget ?? "", due: initial?.due ?? "", status: initial?.status ?? "Planning",
    progress: initial?.progress ?? 0, color: initial?.color ?? "#0697A7",
  });
  const set = (k: string, v: string | number) => setForm(p => ({ ...p, [k]: v }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, color: PROJECT_COLORS[form.type] ?? form.color });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Project Name"><input required className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Project name" /></Field>
        <Field label="Client"><input required className={inputCls} value={form.client} onChange={e => set("client", e.target.value)} placeholder="Client name" /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Type">
          <select className={selectCls} style={{ backgroundColor: "#0f0f0f" }} value={form.type} onChange={e => set("type", e.target.value)}>
            {["Web", "Mobile", "AI", "SaaS", "Branding", "Design"].map(t => <option key={t} value={t} className="bg-[#0f0f0f]">{t}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={selectCls} style={{ backgroundColor: "#0f0f0f" }} value={form.status} onChange={e => set("status", e.target.value)}>
            {["Planning", "Active", "Review", "Complete"].map(s => <option key={s} value={s} className="bg-[#0f0f0f]">{s}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Budget"><input required className={inputCls} value={form.budget} onChange={e => set("budget", e.target.value)} placeholder="$0,000" /></Field>
        <Field label="Due Date"><input required type="date" className={inputCls} value={form.due} onChange={e => set("due", e.target.value)} /></Field>
      </div>
      <Field label={`Progress: ${form.progress}%`}>
        <input type="range" min={0} max={100} value={form.progress} onChange={e => set("progress", Number(e.target.value))} className="w-full accent-[#0697A7]" />
      </Field>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-gray-400 text-sm font-medium" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-black text-sm font-bold" style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          {loading ? "Saving..." : initial?.id ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}

// ─── Client Form ──────────────────────────────────────────────────────────────

function ClientForm({ initial, onSave, onClose, loading }: {
  initial?: Partial<Client>; onSave: (c: Omit<Client, "id">) => void; onClose: () => void; loading?: boolean;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "", company: initial?.company ?? "", email: initial?.email ?? "",
    location: initial?.location ?? "", projects: initial?.projects ?? 0, spent: initial?.spent ?? "$0",
    status: initial?.status ?? "Active", avatar: initial?.avatar ?? "",
  });
  const set = (k: string, v: string | number) => setForm(p => ({ ...p, [k]: v }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const avatar = form.avatar || form.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
    onSave({ ...form, avatar });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name"><input required className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="John Smith" /></Field>
        <Field label="Company"><input required className={inputCls} value={form.company} onChange={e => set("company", e.target.value)} placeholder="Company Ltd" /></Field>
      </div>
      <Field label="Email"><input required type="email" className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@company.com" /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Location"><input required className={inputCls} value={form.location} onChange={e => set("location", e.target.value)} placeholder="City, Country" /></Field>
        <Field label="Status">
          <select className={selectCls} style={{ backgroundColor: "#0f0f0f" }} value={form.status} onChange={e => set("status", e.target.value)}>
            {["Active", "Pending"].map(s => <option key={s} value={s} className="bg-[#0f0f0f]">{s}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Total Projects"><input type="number" min={0} className={inputCls} value={form.projects} onChange={e => set("projects", Number(e.target.value))} /></Field>
        <Field label="Total Spent"><input className={inputCls} value={form.spent} onChange={e => set("spent", e.target.value)} placeholder="$0,000" /></Field>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-gray-400 text-sm font-medium" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-black text-sm font-bold" style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          {loading ? "Saving..." : initial?.id ? "Save Changes" : "Add Client"}
        </button>
      </div>
    </form>
  );
}

// ─── Blog Post Form ───────────────────────────────────────────────────────────

const POST_COLORS: Record<string, string> = {
  "AI & Technology": "#0697A7", "UI/UX Design": "#7c3aed", "Mobile Dev": "#10b981",
  "SaaS & Cloud": "#f59e0b", "Marketing": "#ec4899", "Other": "#06b6d4",
};

function slugifyTitle(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `post-${Date.now()}`;
}

function PostForm({ initial, onSave, onClose, loading }: {
  initial?: Partial<BlogPost>; onSave: (p: Omit<BlogPost, "id">) => void; onClose: () => void; loading?: boolean;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "", slug: initial?.slug ?? "", excerpt: initial?.excerpt ?? "",
    category: initial?.category ?? "AI & Technology", date: initial?.date ?? new Date().toISOString().split("T")[0],
    status: initial?.status ?? "Published", readTime: initial?.readTime ?? "5 min read",
    tag: initial?.tag ?? "Article", author: initial?.author ?? "AarasTech Team",
    authorRole: initial?.authorRole ?? "Digital Product Team", image: initial?.image ?? "",
    contentText: initial?.contentText ?? "", views: initial?.views ?? 0, color: initial?.color ?? "#0697A7",
  });
  const set = (k: string, v: string | number) => setForm(p => ({ ...p, [k]: v }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") set("image", reader.result); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug.trim() || slugifyTitle(form.title);
    onSave({ ...form, slug, color: POST_COLORS[form.category] ?? "#0697A7" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Title"><input required className={inputCls} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Post title..." /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Slug / Page URL"><input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="auto-created-from-title" /></Field>
        <Field label="Read Time"><input className={inputCls} value={form.readTime} onChange={e => set("readTime", e.target.value)} placeholder="8 min read" /></Field>
      </div>
      <Field label="Excerpt / Short Description">
        <textarea required className={`${inputCls} min-h-20 resize-none`} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short blog summary..." />
      </Field>
      <Field label="Cover Image">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
            <input required className={inputCls} value={form.image} onChange={e => set("image", e.target.value)} placeholder="Paste image URL or choose file" />
            <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 sm:py-2.5 text-sm font-semibold text-[#0697A7] border border-[#0697A7]/30 bg-[#0697A7]/10 hover:bg-[#0697A7]/15 cursor-pointer whitespace-nowrap transition-all">
              <Upload size={15} /> Choose Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          {form.image && (
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <img src={form.image} alt="Blog cover preview" className="h-36 w-full object-cover" />
            </div>
          )}
        </div>
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Category">
          <select className={selectCls} style={{ backgroundColor: "#0f0f0f" }} value={form.category} onChange={e => set("category", e.target.value)}>
            {Object.keys(POST_COLORS).map(c => <option key={c} value={c} className="bg-[#0f0f0f]">{c}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={selectCls} style={{ backgroundColor: "#0f0f0f" }} value={form.status} onChange={e => set("status", e.target.value)}>
            {["Draft", "Published"].map(s => <option key={s} value={s} className="bg-[#0f0f0f]">{s}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Date"><input type="date" className={inputCls} value={form.date} onChange={e => set("date", e.target.value)} /></Field>
        <Field label="Tag"><input className={inputCls} value={form.tag} onChange={e => set("tag", e.target.value)} placeholder="Featured / Tutorial" /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Author"><input className={inputCls} value={form.author} onChange={e => set("author", e.target.value)} placeholder="Author name" /></Field>
        <Field label="Author Role"><input className={inputCls} value={form.authorRole} onChange={e => set("authorRole", e.target.value)} placeholder="Founder / Writer" /></Field>
      </div>
      <Field label="Full Blog Content">
        <textarea required className={`${inputCls} min-h-48 resize-y`} value={form.contentText} onChange={e => set("contentText", e.target.value)} placeholder={"Paste full blog content here.\n\nUse headings as separate lines; paragraphs will become article sections automatically."} />
      </Field>
      <div className="text-xs text-gray-500 rounded-xl bg-[#0697A7]/5 border border-[#0697A7]/15 p-3">
        After saving, page created at <span className="text-[#0697A7]">/blog/{form.slug || slugifyTitle(form.title || "your-title")}</span>.
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-gray-400 text-sm font-medium" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-black text-sm font-bold" style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          {loading ? "Saving..." : initial?.id ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}

// ─── Service Form ─────────────────────────────────────────────────────────────

function ServiceForm({ initial, onSave, onClose, loading }: {
  initial?: Partial<Service>; onSave: (s: Omit<Service, "id">) => void; onClose: () => void; loading?: boolean;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "", desc: initial?.desc ?? "", features: initial?.features ?? "",
    icon: initial?.icon ?? "Globe",
    active: initial?.active ?? true, color: initial?.color ?? "#0697A7", image: initial?.image ?? "",
  });
  const set = (k: string, v: string | number | boolean) => setForm(p => ({ ...p, [k]: v }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") set("image", reader.result); };
    reader.readAsDataURL(file);
  };

  const COLORS = ["#0697A7", "#7c3aed", "#10b981", "#ec4899", "#f59e0b", "#06b6d4", "#a855f7"];
  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Service Title"><input required className={inputCls} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Service title" /></Field>
        <Field label="Icon Name (Lucide)"><input required className={inputCls} value={form.icon} onChange={e => set("icon", e.target.value)} placeholder="Globe, Brain, etc." /></Field>
      </div>
      <Field label="Description">
        <textarea required className={`${inputCls} h-20 resize-none`} value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="Short description..." />
      </Field>
      <Field label="Features (comma separated)"><input required className={inputCls} value={form.features} onChange={e => set("features", e.target.value)} placeholder="Feature 1, Feature 2, Feature 3" /></Field>
      <Field label="Service Image">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
            <input className={inputCls} value={form.image} onChange={e => set("image", e.target.value)} placeholder="Paste image URL or choose file" />
            <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 sm:py-2.5 text-sm font-semibold text-[#0697A7] border border-[#0697A7]/30 bg-[#0697A7]/10 cursor-pointer whitespace-nowrap">
              <Upload size={15} /> Choose Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          {form.image && <img src={form.image} alt="Service preview" className="h-32 w-full object-cover rounded-xl border border-white/10" />}
        </div>
      </Field>
      <Field label="Accent Color">
        <div className="flex gap-2 mt-1">
          {COLORS.map(c => (
            <button key={c} type="button" onClick={() => set("color", c)} className="w-7 h-7 rounded-full transition-transform hover:scale-110"
              style={{ background: c, border: form.color === c ? "2px solid white" : "2px solid transparent" }} />
          ))}
        </div>
      </Field>
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-400 text-sm">Active on website</span>
        <button type="button" onClick={() => set("active", !form.active)}>
          {form.active ? <ToggleRight size={24} style={{ color: "#0697A7" }} /> : <ToggleLeft size={24} className="text-gray-600" />}
        </button>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-gray-400 text-sm font-medium" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-black text-sm font-bold" style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          {loading ? "Saving..." : initial?.id ? "Save Changes" : "Add Service"}
        </button>
      </div>
    </form>
  );
}

// ─── Comment Form ─────────────────────────────────────────────────────────────

function CommentForm({ initial, onSave, onClose, loading }: {
  initial?: Partial<CommunityComment>; onSave: (c: Omit<CommunityComment, "id">) => void; onClose: () => void; loading?: boolean;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "", desc: initial?.desc ?? "",
    status: initial?.status ?? "Published", color: initial?.color ?? "#0697A7",
    time: initial?.time ?? "Just now", icon: initial?.icon ?? "Wrench",
    image: initial?.image ?? "", link: initial?.link ?? "",
    pdfUrl: initial?.pdfUrl ?? "", pdfName: initial?.pdfName ?? "",
  });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  
  const COLORS = ["#0697A7", "#7c3aed", "#10b981", "#ec4899", "#f59e0b", "#38bdf8"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality to reduce base64 size significantly
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          set("image", dataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please select a valid PDF file.");
        return;
      }
      if (file.size > 700 * 1024) {
        alert("PDF is too large. Please select a PDF file smaller than 700 KB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof reader.result === "string") {
          set("pdfUrl", reader.result);
          set("pdfName", file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Resource Title"><input required className={inputCls} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Free Tools" /></Field>
        <Field label="Icon Name (Lucide)"><input required className={inputCls} value={form.icon} onChange={e => set("icon", e.target.value)} placeholder="Wrench, Sparkles, etc." /></Field>
      </div>
      <Field label="Description">
        <textarea required className={`${inputCls} h-20 resize-none`} value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="Description of this community resource..." />
      </Field>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Image (Optional)">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mt-1">
            <input className={inputCls} value={form.image} onChange={e => set("image", e.target.value)} placeholder="Image URL" />
            <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 sm:py-2.5 text-sm font-semibold text-[#0697A7] border border-[#0697A7]/30 bg-[#0697A7]/10 cursor-pointer whitespace-nowrap">
              <Upload size={15} /> Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </Field>
        <Field label="Link URL (Optional)">
          <input className={inputCls} value={form.link} onChange={e => set("link", e.target.value)} placeholder="https://..." />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="PDF Document (Optional)">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mt-1">
            <input className={inputCls} readOnly value={form.pdfName || (form.pdfUrl ? "Document.pdf" : "")} placeholder="Upload PDF file" />
            <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 sm:py-2.5 text-sm font-semibold text-[#0697A7] border border-[#0697A7]/30 bg-[#0697A7]/10 cursor-pointer whitespace-nowrap">
              <Upload size={15} /> Upload PDF
              <input type="file" accept="application/pdf" className="hidden" onChange={handlePdfUpload} />
            </label>
          </div>
          {form.pdfUrl && (
            <button type="button" onClick={() => { set("pdfUrl", ""); set("pdfName", ""); }} className="text-red-400 text-xs mt-1 hover:underline block text-left">
              Remove PDF
            </button>
          )}
        </Field>
        <Field label="Status">
          <select className={selectCls} style={{ backgroundColor: "#0f0f0f" }} value={form.status} onChange={e => set("status", e.target.value)}>
            {["Published", "Pinned", "Review", "Draft"].map(s => <option key={s} value={s} className="bg-[#0f0f0f]">{s}</option>)}
          </select>
        </Field>
      </div>

      <div>
        <Field label="Accent Color">
          <div className="flex gap-2 mt-1">
            {COLORS.map(c => (
              <button key={c} type="button" onClick={() => set("color", c)} className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                style={{ background: c, border: form.color === c ? "2px solid white" : "2px solid transparent" }} />
            ))}
          </div>
        </Field>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-gray-400 text-sm font-medium" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-black text-sm font-bold" style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          {loading ? "Saving..." : initial?.id ? "Save Resource" : "Add Resource"}
        </button>
      </div>
    </form>
  );
}

// ─── Testimonial Form ──────────────────────────────────────────────────────────

function TestimonialForm({ initial, onSave, onClose, loading }: {
  initial?: Partial<Testimonial>; onSave: (t: Omit<Testimonial, "id">) => void; onClose: () => void; loading?: boolean;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "", role: initial?.role ?? "", location: initial?.location ?? "",
    avatar: initial?.avatar ?? "", rating: initial?.rating ?? 5, text: initial?.text ?? "", color: initial?.color ?? "#0697A7",
  });
  const set = (k: string, v: string | number) => setForm(p => ({ ...p, [k]: v }));
  const COLORS = ["#0697A7", "#7c3aed", "#10b981", "#ec4899", "#f59e0b", "#06b6d4"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const avatar = form.avatar || form.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
    onSave({ ...form, avatar });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Client Name"><input required className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Full Name" /></Field>
        <Field label="Role / Company"><input required className={inputCls} value={form.role} onChange={e => set("role", e.target.value)} placeholder="CEO, TechCorp" /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Location"><input required className={inputCls} value={form.location} onChange={e => set("location", e.target.value)} placeholder="City, Country" /></Field>
        <Field label="Rating (1-5)"><input type="number" min={1} max={5} className={inputCls} value={form.rating} onChange={e => set("rating", Number(e.target.value))} /></Field>
      </div>
      <Field label="Testimonial Text">
        <textarea required className={`${inputCls} h-28 resize-y`} value={form.text} onChange={e => set("text", e.target.value)} placeholder="What did they say?" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Avatar Initials (Auto-generated if empty)"><input className={inputCls} value={form.avatar} onChange={e => set("avatar", e.target.value)} placeholder="e.g. JD" maxLength={2} /></Field>
        <Field label="Accent Color">
          <div className="flex gap-2 mt-1">
            {COLORS.map(c => (
              <button key={c} type="button" onClick={() => set("color", c)} className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                style={{ background: c, border: form.color === c ? "2px solid white" : "2px solid transparent" }} />
            ))}
          </div>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-gray-400 text-sm font-medium" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-black text-sm font-bold" style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          {loading ? "Saving..." : initial?.id ? "Save Changes" : "Add Testimonial"}
        </button>
      </div>
    </form>
  );
}

// ─── Testimonials Admin Section ───────────────────────────────────────────────

function TestimonialsAdminSection({ testimonials, onCreate, onUpdate, onDelete }: {
  testimonials: Testimonial[];
  onCreate: (t: Omit<Testimonial, "id">) => Promise<void>;
  onUpdate: (id: string, t: Omit<Testimonial, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [modal, setModal] = useState<null | "create" | Testimonial>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <motion.div key="testimonials-admin" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-end mb-5">
        <button onClick={() => setModal("create")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-black font-semibold"
          style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          <Plus size={14} /> Add Testimonial
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {testimonials.length === 0 && <div className="col-span-full py-10 text-center text-gray-500">No testimonials found.</div>}
        {testimonials.map(t => (
          <Card key={t.id} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModal(t)} className="text-gray-400 hover:text-white p-1"><Edit2 size={14} /></button>
                <button onClick={() => setDeleteTarget(t)} className="text-gray-400 hover:text-red-400 p-1"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-gray-300 text-sm line-clamp-3 italic mb-3">"{t.text}"</p>
            <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12}/> {t.location}</div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < t.rating ? t.color : "none"} style={{ color: i < t.rating ? t.color : "#333" }} />)}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {modal && (
        <Modal title={modal === "create" ? "Add Testimonial" : "Edit Testimonial"} onClose={() => setModal(null)}>
          <TestimonialForm loading={loading} initial={modal !== "create" ? modal : undefined}
            onSave={async data => { 
              setLoading(true); 
              try {
                await (modal === "create" ? onCreate(data) : onUpdate((modal as Testimonial).id, data)); 
                setModal(null); 
              } finally { setLoading(false); }
            }}
            onClose={() => setModal(null)} />
        </Modal>
      )}
      {deleteTarget && (
        <ConfirmDelete label={deleteTarget.name}
          onConfirm={async () => { await onDelete(deleteTarget.id); setDeleteTarget(null); }}
          onCancel={() => setDeleteTarget(null)} />
      )}
    </motion.div>
  );
}

// ─── Dashboard Overview ───────────────────────────────────────────────────────


function DashboardSection({ projects, clients, messages }: { projects: Project[]; clients: Client[]; messages: Message[] }) {
  const statsCards = [
    { title: "Active Projects", value: String(projects.filter(p => p.status === "Active").length), change: "+4", up: true, icon: FolderOpen, color: "#7c3aed" },
    { title: "Total Clients", value: String(clients.length), change: "+8", up: true, icon: Users, color: "#10b981" },
    { title: "Unread Messages", value: String(messages.filter(m => m.unread).length), change: "", up: true, icon: MessageSquare, color: "#f59e0b" },
    { title: "Total Revenue", value: "$189,400", change: "+22.4%", up: true, icon: TrendingUp, color: "#0697A7" },
  ];
  return (
    <motion.div key="dashboard" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-[#0a0a0a]"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: card.color + "18" }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              {card.change && (
                <span className={`flex items-center gap-0.5 text-xs font-medium ${card.up ? "text-green-400" : "text-red-400"}`}>
                  {card.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{card.change}
                </span>
              )}
            </div>
            <div className="text-white mb-0.5" style={{ fontFamily: "Orbitron, monospace", fontSize: "1.4rem", fontWeight: 700 }}>{card.value}</div>
            <div className="text-gray-500 text-xs">{card.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <Card className="lg:col-span-2 p-6">
          <div className="text-white font-semibold mb-1" style={{ fontFamily: "Space Grotesk" }}>Revenue Overview</div>
          <div className="text-gray-500 text-xs mb-4">Monthly revenue for 2025</div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="dash-rev-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0697A7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0697A7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#4b5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4b5563", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(6,151,167,0.2)", borderRadius: 12, color: "white" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#0697A7" strokeWidth={2} fill="url(#dash-rev-grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <div className="text-white font-semibold mb-1" style={{ fontFamily: "Space Grotesk" }}>Service Breakdown</div>
          <div className="text-gray-500 text-xs mb-4">Revenue by service</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={0}>
                {serviceBreakdown.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white" }} formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {serviceBreakdown.map(s => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-gray-400 text-xs">{s.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="text-white font-semibold mb-4" style={{ fontFamily: "Space Grotesk" }}>Recent Projects</div>
          <div className="space-y-4">
            {projects.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm truncate">{p.name}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                        className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}80)` }} />
                    </div>
                    <span className="text-gray-500 text-xs w-8 text-right">{p.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-white font-semibold mb-4" style={{ fontFamily: "Space Grotesk" }}>Recent Messages</div>
          <div className="space-y-4">
            {messages.slice(0, 4).map(msg => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #0697A7, #7c3aed)" }}>{msg.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">{msg.name}</span>
                    <span className="text-gray-600 text-xs">{msg.time}</span>
                  </div>
                  <div className="text-gray-500 text-xs truncate">{msg.msg}</div>
                </div>
                {msg.unread && <div className="w-2 h-2 bg-[#0697A7] rounded-full flex-shrink-0 mt-1.5" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection({ projects, onCreate, onUpdate, onDelete }: {
  projects: Project[];
  onCreate: (p: Omit<Project, "id">) => Promise<void>;
  onUpdate: (id: string, p: Omit<Project, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<null | "create" | Project>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const filters = ["All", "Active", "Review", "Complete", "Planning"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.status === filter);

  return (
    <motion.div key="projects" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={filter === f ? { background: "#0697A7", color: "#000" } : { background: "rgba(255,255,255,0.05)", color: "#9ca3af" }}>{f}</button>
          ))}
        </div>
        <button onClick={() => setModal("create")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-black font-semibold"
          style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          <Plus size={14} /> New Project
        </button>
      </div>
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Project", "Client", "Type", "Budget", "Due Date", "Progress", "Status", ""].map(h => (
                  <th key={h} className="text-left text-xs text-gray-500 px-5 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={8} className="px-5 py-10 text-center text-gray-600 text-sm">No projects found.</td></tr>}
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="group hover:bg-white/2 transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                      <span className="text-white text-sm whitespace-nowrap">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm whitespace-nowrap">{p.client}</td>
                  <td className="px-5 py-3.5"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: p.color + "18", color: p.color }}>{p.type}</span></td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm">{p.budget}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm whitespace-nowrap">{p.due}</td>
                  <td className="px-5 py-3.5 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg,${p.color},${p.color}80)` }} />
                      </div>
                      <span className="text-gray-500 text-xs w-8">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setModal(p)} className="text-gray-500 hover:text-[#0697A7] transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => setDeleteTarget(p)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {modal && (
        <Modal title={modal === "create" ? "New Project" : "Edit Project"} onClose={() => setModal(null)}>
          <ProjectForm loading={loading} initial={modal !== "create" ? modal : undefined}
            onSave={async data => { setLoading(true); await (modal === "create" ? onCreate(data) : onUpdate((modal as Project).id, data)); setLoading(false); setModal(null); }}
            onClose={() => setModal(null)} />
        </Modal>
      )}
      {deleteTarget && (
        <ConfirmDelete label={deleteTarget.name}
          onConfirm={async () => { await onDelete(deleteTarget.id); setDeleteTarget(null); }}
          onCancel={() => setDeleteTarget(null)} />
      )}
    </motion.div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

function ServicesSection({ services, onCreate, onUpdate, onDelete }: {
  services: Service[];
  onCreate: (s: Omit<Service, "id">) => Promise<void>;
  onUpdate: (id: string, s: Omit<Service, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [modal, setModal] = useState<null | "create" | Service>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <motion.div key="services" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-end mb-5">
        <button onClick={() => setModal("create")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-black font-semibold"
          style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          <Plus size={14} /> Add Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-[#0a0a0a] group flex flex-col"
            style={{ border: `1px solid ${s.active ? s.color + "30" : "rgba(255,255,255,0.06)"}` }}>
            {s.image && (
              <div className="-m-5 mb-4 h-32 overflow-hidden rounded-t-2xl border-b border-white/10">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + "18" }}>
                <Zap size={18} style={{ color: s.color }} />
              </div>
              <button onClick={async () => { await onUpdate(s.id, { ...s, active: !s.active }); }}>
                {s.active ? <ToggleRight size={22} style={{ color: "#0697A7" }} /> : <ToggleLeft size={22} />}
              </button>
            </div>
            <div className="text-white text-sm font-semibold mb-2" style={{ fontFamily: "Space Grotesk" }}>{s.title}</div>
            <p className="text-gray-400 text-xs line-clamp-2 mb-3">{s.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {s.features?.split(",").slice(0, 2).map((f, i) => (
                <span key={i} className="px-2 py-1 rounded-md text-[10px] font-medium" style={{ background: "rgba(255,255,255,0.05)", color: "#a1a1aa" }}>{f.trim()}</span>
              ))}
              {(s.features?.split(",").length || 0) > 2 && <span className="px-2 py-1 rounded-md text-[10px] font-medium" style={{ background: "rgba(255,255,255,0.05)", color: "#a1a1aa" }}>+{(s.features?.split(",").length || 0) - 2} more</span>}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className={`text-xs font-medium ${s.active ? "text-green-400" : "text-gray-500"}`}>{s.active ? "● Active" : "○ Inactive"}</span>
              <div className="flex gap-2">
                <button onClick={() => setModal(s)} className="text-gray-600 hover:text-[#0697A7] transition-colors"><Edit2 size={13} /></button>
                <button onClick={() => setDeleteTarget(s)} className="text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "create" ? "Add Service" : "Edit Service"} onClose={() => setModal(null)}>
          <ServiceForm loading={loading} initial={modal !== "create" ? modal : undefined}
            onSave={async data => { setLoading(true); await (modal === "create" ? onCreate(data) : onUpdate((modal as Service).id, data)); setLoading(false); setModal(null); }}
            onClose={() => setModal(null)} />
        </Modal>
      )}
      {deleteTarget && (
        <ConfirmDelete label={deleteTarget.title}
          onConfirm={async () => { await onDelete(deleteTarget.id); setDeleteTarget(null); }}
          onCancel={() => setDeleteTarget(null)} />
      )}
    </motion.div>
  );
}

// ─── Clients Section ──────────────────────────────────────────────────────────

function ClientsSection({ clients, onCreate, onUpdate, onDelete }: {
  clients: Client[];
  onCreate: (c: Omit<Client, "id">) => Promise<void>;
  onUpdate: (id: string, c: Omit<Client, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [modal, setModal] = useState<null | "create" | Client>(null);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <motion.div key="clients" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-end mb-5">
        <button onClick={() => setModal("create")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-black font-semibold"
          style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          <Plus size={14} /> Add Client
        </button>
      </div>
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Client", "Company", "Location", "Projects", "Total Spent", "Status", ""].map(h => (
                  <th key={h} className="text-left text-xs text-gray-500 px-5 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 && <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-600 text-sm">No clients yet.</td></tr>}
              {clients.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/2 transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)" }}>{c.avatar}</div>
                      <div>
                        <div className="text-white text-sm font-medium">{c.name}</div>
                        <div className="text-gray-500 text-xs">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm">{c.company}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm whitespace-nowrap">{c.location}</td>
                  <td className="px-5 py-3.5 text-white text-sm text-center">{c.projects}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold" style={{ color: "#0697A7" }}>{c.spent}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setModal(c)} className="text-gray-500 hover:text-[#0697A7] transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => setDeleteTarget(c)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {modal && (
        <Modal title={modal === "create" ? "Add Client" : "Edit Client"} onClose={() => setModal(null)}>
          <ClientForm loading={loading} initial={modal !== "create" ? modal : undefined}
            onSave={async data => { setLoading(true); await (modal === "create" ? onCreate(data) : onUpdate((modal as Client).id, data)); setLoading(false); setModal(null); }}
            onClose={() => setModal(null)} />
        </Modal>
      )}
      {deleteTarget && (
        <ConfirmDelete label={deleteTarget.name}
          onConfirm={async () => { await onDelete(deleteTarget.id); setDeleteTarget(null); }}
          onCancel={() => setDeleteTarget(null)} />
      )}
    </motion.div>
  );
}

// ─── Blog Section ─────────────────────────────────────────────────────────────

function BlogSection({ posts, onCreate, onUpdate, onDelete }: {
  posts: BlogPost[];
  onCreate: (p: Omit<BlogPost, "id">) => Promise<void>;
  onUpdate: (id: string, p: Omit<BlogPost, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [modal, setModal] = useState<null | "create" | BlogPost>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <motion.div key="blog" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-end mb-5">
        <button onClick={() => setModal("create")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-black font-semibold"
          style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          <Plus size={14} /> New Post
        </button>
      </div>
      <div className="space-y-3">
        {posts.length === 0 && <div className="text-center py-12 text-gray-600 text-sm">No blog posts yet. Create your first post!</div>}
        {posts.map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a0a] group hover:bg-[#0f0f0f] transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ background: post.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium mb-1 truncate">{post.title}</div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span style={{ color: post.color }}>{post.category}</span>
                <span>•</span><span>{post.date}</span>
                {post.slug && <><span>•</span><span className="text-[#0697A7]">/blog/{post.slug}</span></>}
                {post.status === "Published" && <><span>•</span><span className="flex items-center gap-1"><Eye size={10} /> {(post.views || 0).toLocaleString()} views</span></>}
              </div>
            </div>
            <StatusBadge status={post.status} />
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setModal(post)} className="text-gray-500 hover:text-[#0697A7] transition-colors"><Edit2 size={14} /></button>
              <button onClick={() => setDeleteTarget(post)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "create" ? "New Post" : "Edit Post"} onClose={() => setModal(null)}>
          <PostForm loading={loading} initial={modal !== "create" ? modal : undefined}
            onSave={async data => { setLoading(true); await (modal === "create" ? onCreate(data) : onUpdate((modal as BlogPost).id, data)); setLoading(false); setModal(null); }}
            onClose={() => setModal(null)} />
        </Modal>
      )}
      {deleteTarget && (
        <ConfirmDelete label={deleteTarget.title}
          onConfirm={async () => { await onDelete(deleteTarget.id); setDeleteTarget(null); }}
          onCancel={() => setDeleteTarget(null)} />
      )}
    </motion.div>
  );
}

// ─── Messages Section ─────────────────────────────────────────────────────────

function MessagesSection({ messages, onDelete, onMarkRead }: {
  messages: Message[];
  onDelete: (id: string) => Promise<void>;
  onMarkRead: (id: string) => Promise<void>;
}) {
  const [activeId, setActiveId] = useState(messages[0]?.id ?? "");
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
  const active = messages.find(m => m.id === activeId) ?? messages[0];

  if (messages.length === 0) {
    return (
      <motion.div key="messages" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center h-64 text-gray-600">
        No messages yet. Contact form submissions will appear here.
      </motion.div>
    );
  }

  return (
    <motion.div key="messages" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      className="grid lg:grid-cols-5 gap-4" style={{ height: "calc(100vh - 260px)", minHeight: 480 }}>
      <div className="lg:col-span-2 rounded-2xl bg-[#0a0a0a] flex flex-col overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-white font-semibold text-sm" style={{ fontFamily: "Space Grotesk" }}>Inbox</div>
          <div className="text-gray-500 text-xs">{messages.filter(m => m.unread).length} unread</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} role="button" tabIndex={0}
              onClick={() => { setActiveId(msg.id); if (msg.unread) onMarkRead(msg.id); }}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveId(msg.id); } }}
              className={`w-full flex items-start gap-3 p-4 text-left transition-colors group cursor-pointer outline-none ${activeId === msg.id ? "bg-[#0697A7]/8" : "hover:bg-white/2"}`}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)" }}>{msg.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-sm font-medium ${msg.unread ? "text-white" : "text-gray-400"}`}>{msg.name}</span>
                  <span className="text-gray-600 text-xs">{msg.time}</span>
                </div>
                <div className="text-gray-500 text-xs truncate">{msg.msg}</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                {msg.unread && <div className="w-2 h-2 bg-[#0697A7] rounded-full" />}
                <button onClick={e => { e.stopPropagation(); setDeleteTarget(msg); }}
                  className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="lg:col-span-3 rounded-2xl bg-[#0a0a0a] flex flex-col overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-black text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)" }}>{active.avatar}</div>
            <div>
              <div className="text-white text-sm font-semibold">{active.name}</div>
              <div className="text-gray-500 text-xs">{active.company} · {active.email}</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="p-4 rounded-xl bg-white/5 space-y-2">
              {active.service && <div className="text-xs text-gray-400"><span className="text-gray-500">Service:</span> {active.service}</div>}
              {active.budget && <div className="text-xs text-gray-400"><span className="text-gray-500">Budget:</span> {active.budget}</div>}
              <div className="text-gray-200 text-sm leading-relaxed">{active.msg}</div>
            </div>
          </div>
          <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <a href={`mailto:${active.email}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-black font-semibold text-sm"
              style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
              <Mail size={14} /> Reply via Email
            </a>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDelete label={`message from ${deleteTarget.name}`}
          onConfirm={async () => { await onDelete(deleteTarget.id); setDeleteTarget(null); }}
          onCancel={() => setDeleteTarget(null)} />
      )}
    </motion.div>
  );
}

// ─── Comments Section ─────────────────────────────────────────────────────────

function CommentsSection({ comments, onCreate, onUpdate, onDelete, onToggle }: {
  comments: CommunityComment[];
  onCreate: (c: Omit<CommunityComment, "id">) => Promise<void>;
  onUpdate: (id: string, c: Omit<CommunityComment, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string, currentStatus: string) => Promise<void>;
}) {
  const [modal, setModal] = useState<null | "create" | CommunityComment>(null);
  const [loading, setLoading] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "Space Grotesk" }}>Community Resources</h2>
          <p className="text-gray-500 text-sm mt-1">Manage community links, free tools, and resources.</p>
        </div>
        <button onClick={() => setModal("create")} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-black font-semibold"
          style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
          <Plus size={14} /> Add Resource
        </button>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mb-5">
        {[
          { label: "Total Resources", value: comments.length, color: "#0697A7" },
          { label: "Pinned", value: comments.filter(c => c.status === "Pinned").length, color: "#7c3aed" },
          { label: "In Review", value: comments.filter(c => c.status === "Review").length, color: "#f59e0b" },
        ].map(card => (
          <Card key={card.label} className="p-5">
            <div className="text-2xl font-bold" style={{ color: card.color, fontFamily: "Orbitron, monospace" }}>{card.value}</div>
            <div className="text-gray-500 text-xs mt-1">{card.label}</div>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        {comments.map(c => (
          <Card key={c.id} className="p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden text-xl" style={{ background: c.color + "15", border: `1px solid ${c.color}25`, color: c.color }}>
                  {c.icon?.startsWith("data:image") || c.icon?.startsWith("http")
                    ? <img src={c.icon} alt={c.title} className="w-full h-full object-cover" />
                    : (c.icon || <MessageCircle size={18} />)}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>{c.title}</span>
                    <StatusBadge status={c.status} />
                    <span className="text-gray-600 text-xs">{c.time}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed break-words">{c.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                <button onClick={() => onToggle(c.id, c.status)} className="px-3 py-2 rounded-lg border border-[#0697A7]/30 text-[#0697A7] text-xs hover:bg-[#0697A7]/10">Toggle</button>
                <button onClick={() => setModal(c)} className="px-3 py-2 rounded-lg border border-white/10 text-gray-300 text-xs hover:text-[#0697A7] hover:bg-white/5"><Edit2 size={14} /></button>
                <button onClick={() => onDelete(c.id)} className="px-3 py-2 rounded-lg border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10"><Trash2 size={14} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "create" ? "Add Resource" : "Edit Resource"} onClose={() => setModal(null)}>
          <CommentForm loading={loading} initial={modal !== "create" ? modal : undefined}
            onSave={async data => { 
              setLoading(true); 
              try {
                await (modal === "create" ? onCreate(data) : onUpdate((modal as CommunityComment).id, data)); 
                setModal(null); 
              } catch (err: any) {
                console.error("Save failed:", err);
                alert("Failed to save resource. The image file might be too large. Try a smaller image or an image URL.");
              } finally {
                setLoading(false); 
              }
            }}
            onClose={() => setModal(null)} />
        </Modal>
      )}
    </motion.div>
  );
}

// ─── Settings Section ─────────────────────────────────────────────────────────

function SettingsSection() {
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handleForceReset = async () => {
    if (!window.confirm("This will DELETE all services, blog posts, community resources, and testimonials in Firestore and re-seed fresh data. Continue?")) return;
    setResetting(true);
    try {
      // Clear all seed keys
      ["v1","v2","v3","v4","v5","v6","v7"].forEach(v => localStorage.removeItem(`aarastech_firebase_seeded_${v}`));
      // Force reseed
      await seedAllIfNeeded();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 3000);
    } catch (e) {
      console.error("Reset failed:", e);
      alert("Reset failed. Check console for details.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <motion.div key="settings" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <User size={16} className="text-[#0697A7]" />
            <span className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>Profile Information</span>
          </div>
          <div className="flex items-center gap-5 mb-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-black text-xl font-bold"
              style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)" }}>AT</div>
            <div>
              <div className="text-white font-semibold">AarasTech Admin</div>
              <div className="text-gray-500 text-sm">info@aarastech.com</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ label: "Full Name", val: "AarasTech Admin" }, { label: "Email", val: "info@aarastech.com" }, { label: "Phone", val: "+44 7438 603306" }, { label: "Location", val: "Grimsby, England, UK" }].map(f => (
              <div key={f.label}>
                <label className="text-gray-500 text-xs mb-1.5 block">{f.label}</label>
                <input defaultValue={f.val} className={inputCls} />
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-black font-semibold transition-all"
            style={{ background: saved ? "#10b981" : "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
            <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </Card>

        {/* Database Reset Card */}
        <Card className="p-6" >
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw size={16} className="text-red-400" />
            <span className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>Database Reset</span>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            If services, blog posts, community resources, or testimonials are showing wrong / old data, use this to wipe and re-seed fresh data into Firestore with the correct schema.
          </p>
          <button
            onClick={handleForceReset}
            disabled={resetting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
            style={{ background: resetDone ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.12)", border: resetDone ? "1px solid #10b981" : "1px solid rgba(239,68,68,0.4)", color: resetDone ? "#10b981" : "#f87171" }}
          >
            <RefreshCw size={14} className={resetting ? "animate-spin" : ""} />
            {resetting ? "Resetting Firestore..." : resetDone ? "✓ Reset Complete! Refresh page." : "Force Reset Data"}
          </button>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5"><PaletteIcon size={16} className="text-[#ec4899]" /><span className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>Appearance</span></div>
          <div className="flex items-center justify-between">
            <div><div className="text-white text-sm">Dark Mode</div><div className="text-gray-500 text-xs">Use dark interface</div></div>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <ToggleRight size={26} style={{ color: "#0697A7" }} /> : <ToggleLeft size={26} className="text-gray-600" />}
            </button>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4"><Globe size={16} className="text-[#10b981]" /><span className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>Company Info</span></div>
          <div className="space-y-2 text-sm">
            {[{ icon: Globe, val: "aarastech.com" }, { icon: Phone, val: "+44 7438 603306" }, { icon: MapPin, val: "Grimsby, England, UK" }, { icon: Mail, val: "info@aarastech.com" }].map((row, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400"><row.icon size={13} className="text-[#0697A7]" />{row.val}</div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const menuItems = [
  { icon: MessageCircle, label: "Community", id: "comments" },
  { icon: Star, label: "Testimonials", id: "testimonials" },
  { icon: BookOpen, label: "Blog Posts", id: "blog" },
  { icon: MessageSquare, label: "Contact Messages", id: "messages" },
  { icon: Layers, label: "Services", id: "services" },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: Megaphone, label: "Ads", id: "ads" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const subtitles: Record<string, string> = {
  comments: "Manage community links, free tools, and useful resources.",
  testimonials: "Manage client testimonials displayed on your website.",
  blog: "Create and manage your blog content.",
  messages: "Review incoming contact form submissions from your website.",
  services: "Manage the services you offer and toggle availability.",
  projects: "Track all your active and completed client projects.",
  clients: "Manage your CRM and client relationships.",
  ads: "Manage promotional banners, popups, and floating ads.",
  settings: "Configure your dashboard and company settings.",
};

interface AdminDashboardProps { onClose: () => void; }

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("comments");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // ── Firebase state ──
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  // ── Subscribe to Firebase data ──
  useEffect(() => {
    const unsubs = [
      onSnapshot(query(collection(db, "projects"), orderBy("createdAt", "desc")), snap => {
        setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
        setLoading(false);
      }),
      onSnapshot(query(collection(db, "clients"), orderBy("createdAt", "desc")), snap => {
        setClients(snap.docs.map(d => ({ id: d.id, ...d.data() } as Client)));
      }),
      onSnapshot(query(collection(db, "blog_posts"), orderBy("createdAt", "desc")), snap => {
        setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost)));
      }),
      onSnapshot(query(collection(db, "services"), orderBy("createdAt", "desc")), snap => {
        setServices(snap.docs.map(d => ({ id: d.id, ...d.data() } as Service)));
      }),
      onSnapshot(query(collection(db, "contact_messages"), orderBy("createdAt", "desc")), snap => {
        setMessages(snap.docs.map(d => {
          const data = d.data();
          const name = data.name || "Unknown";
          return {
            id: d.id,
            name,
            company: data.company || "—",
            email: data.email || "—",
            msg: data.message || data.msg || "",
            service: data.service,
            budget: data.budget,
            time: data.createdAt?.toDate?.()?.toLocaleDateString() ?? "Just now",
            unread: data.unread ?? true,
            avatar: name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
            thread: [],
          } as Message;
        }));
      }),
      onSnapshot(query(collection(db, "community_comments"), orderBy("createdAt", "desc")), snap => {
        setComments(snap.docs.map(d => ({ id: d.id, ...d.data() } as CommunityComment)));
      }),
      onSnapshot(query(collection(db, "testimonials"), orderBy("createdAt", "desc")), snap => {
        setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial)));
      }),
      onSnapshot(query(collection(db, "ads"), orderBy("createdAt", "desc")), snap => {
        setAds(snap.docs.map(d => ({ id: d.id, ...d.data() } as Ad)));
      }),
    ];

    return () => unsubs.forEach(u => u());
  }, []);

  // ── Firebase CRUD helpers ──
  const addToCollection = async (col: string, data: object) => {
    await addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
  };
  const updateInCollection = async (col: string, id: string, data: object) => {
    await updateDoc(doc(db, col, id), { ...data, updatedAt: serverTimestamp() });
  };
  const deleteFromCollection = async (col: string, id: string) => {
    await deleteDoc(doc(db, col, id));
  };

  const unreadCount = messages.filter(m => m.unread).length;

  const renderSection = () => {
    if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading data from Firebase...</div>;
    switch (activeSection) {
      case "comments": return <CommentsSection comments={comments}
        onCreate={d => addToCollection("community_comments", d)}
        onUpdate={(id, d) => updateInCollection("community_comments", id, d)}
        onDelete={id => deleteFromCollection("community_comments", id)}
        onToggle={(id, s) => updateInCollection("community_comments", id, { status: s === "Pinned" ? "Published" : "Pinned" })} />;
      case "testimonials": return <TestimonialsAdminSection testimonials={testimonials}
        onCreate={d => addToCollection("testimonials", d)}
        onUpdate={(id, d) => updateInCollection("testimonials", id, d)}
        onDelete={id => deleteFromCollection("testimonials", id)} />;
      case "messages": return <MessagesSection messages={messages}
        onDelete={id => deleteFromCollection("contact_messages", id)}
        onMarkRead={id => updateInCollection("contact_messages", id, { unread: false })} />;
      case "services": return <ServicesSection services={services}
        onCreate={d => addToCollection("services", d)}
        onUpdate={(id, d) => updateInCollection("services", id, d)}
        onDelete={id => deleteFromCollection("services", id)} />;
      case "blog": return <BlogSection posts={posts}
        onCreate={d => addToCollection("blog_posts", d)}
        onUpdate={(id, d) => updateInCollection("blog_posts", id, d)}
        onDelete={id => deleteFromCollection("blog_posts", id)} />;
      case "projects": return <ProjectsSection projects={projects}
        onCreate={d => addToCollection("projects", d)}
        onUpdate={(id, d) => updateInCollection("projects", id, d)}
        onDelete={id => deleteFromCollection("projects", id)} />;
      case "clients": return <ClientsSection clients={clients}
        onCreate={d => addToCollection("clients", d)}
        onUpdate={(id, d) => updateInCollection("clients", id, d)}
        onDelete={id => deleteFromCollection("clients", id)} />;
      case "ads": return <AdsSection ads={ads}
        onCreate={d => addToCollection("ads", d)}
        onUpdate={(id, d) => updateInCollection("ads", id, d)}
        onDelete={id => deleteFromCollection("ads", id)} />;
      case "settings": return <SettingsSection />;
      default: return <DashboardSection projects={projects} clients={clients} messages={messages} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ duration: 0.3 }}
            className="w-64 flex-shrink-0 flex flex-col h-full"
            style={{ background: "#080808", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <ImageWithFallback src={logo} alt="AarasTech Logo" className="h-8 w-auto object-contain max-w-[150px]" />
            </div>
            <nav className="flex-1 p-3 overflow-y-auto">
              {menuItems.map(item => (
                <motion.button key={item.id} whileHover={{ x: 4 }} onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm transition-all duration-200 ${activeSection === item.id ? "text-[#0697A7]" : "text-gray-500 hover:text-gray-300"}`}
                  style={activeSection === item.id ? { background: "rgba(6,151,167,0.1)", border: "1px solid rgba(6,151,167,0.2)" } : { border: "1px solid transparent" }}>
                  <item.icon size={17} />
                  {item.label}
                  {item.id === "messages" && unreadCount > 0 && (
                    <span className="ml-auto w-5 h-5 bg-[#0697A7] rounded-full text-black text-xs flex items-center justify-center font-bold">{unreadCount}</span>
                  )}
                </motion.button>
              ))}
            </nav>
            <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)" }}>AT</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">AarasTech Admin</div>
                  <div className="text-gray-500 text-xs truncate">info@aarastech.com</div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 flex-shrink-0"
          style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-white transition-colors">
              <LayoutDashboard size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2 w-60"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Search size={14} className="text-gray-500" />
              <input placeholder="Search..." className="bg-transparent text-white text-sm placeholder-gray-600 outline-none flex-1" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <Bell size={16} />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0697A7] rounded-full" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <X size={15} /> Exit
            </motion.button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-white mb-1" style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 700 }}>
                {menuItems.find(m => m.id === activeSection)?.label}
              </h1>
              <p className="text-gray-500 text-sm">{subtitles[activeSection]}</p>
            </div>
            <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
