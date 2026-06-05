export type JsonLdNode = Record<string, unknown>;

export const SITE_URL = "https://aarastech.com";
export const BRAND_NAME = "AarasTech";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/ChatGPT_Image_May_27__2026__10_20_02_PM-Dt0gqxxu.png`;

export const brandKeywords = [
  "AarasTech",
  "AarasTech Sri Lanka",
  "AarasTech UK",
  "AarasTech AI Solutions",
  "AarasTech Web Development",
  "AarasTech Digital Services",
  "AarasTech Portfolio",
  "AarasTech Software Company",
  "web development Jaffna",
  "software company Sri Lanka",
  "software company UK",
  "AI automation agency",
];

export const serviceKeywords = [
  "custom website development",
  "AI application development",
  "mobile app development",
  "UI UX design",
  "SEO services",
  "AEO services",
  "answer engine optimization",
  "digital marketing",
  "SaaS development",
  "e-commerce development",
  "cloud solutions",
  "business automation",
];

export const serviceOfferings = [
  { name: "Custom Website Development", description: "Fast, responsive, SEO-friendly websites built with modern frameworks." },
  { name: "AI Solutions", description: "AI applications, AI chatbots, workflow automation, and intelligent product features." },
  { name: "Mobile App Development", description: "Native and cross-platform mobile apps for iOS and Android." },
  { name: "UI/UX Design", description: "Research-led interface design, prototypes, design systems, and product experiences." },
  { name: "SEO & AEO Optimization", description: "Search engine optimization and answer engine optimization for stronger discovery." },
  { name: "Digital Marketing", description: "Content strategy, analytics, campaigns, and conversion-focused growth systems." },
  { name: "SaaS Platform Development", description: "Scalable SaaS products with dashboards, subscriptions, cloud hosting, and automation." },
  { name: "E-Commerce Solutions", description: "Online stores with payments, inventory, analytics, and conversion optimization." },
  { name: "Cloud Solutions", description: "Cloud deployment, CI/CD, monitoring, and secure infrastructure." },
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const organizationSchema: JsonLdNode = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  "name": BRAND_NAME,
  "legalName": "AarasTech",
  "alternateName": ["AarasTech Sri Lanka", "AarasTech UK", "AarasTech AI Solutions"],
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": DEFAULT_OG_IMAGE,
  },
  "image": DEFAULT_OG_IMAGE,
  "description": "AarasTech is a digital technology company serving the UK, Sri Lanka, and international businesses with web development, AI solutions, mobile apps, UI/UX design, SEO, AEO, SaaS, e-commerce, cloud, and automation services.",
  "foundingDate": "2025",
  "slogan": "Building intelligent digital experiences",
  "email": "info@aarastech.com",
  "telephone": "+44 7438 603306",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+44 7438 603306",
      "contactType": "customer service",
      "areaServed": ["GB", "LK", "Worldwide"],
      "availableLanguage": ["English", "Tamil"],
    },
    {
      "@type": "ContactPoint",
      "telephone": "+94 7529 20381",
      "contactType": "WhatsApp support",
      "areaServed": ["LK", "GB", "Worldwide"],
      "availableLanguage": ["English", "Tamil"],
    },
  ],
  "sameAs": [
    "https://www.linkedin.com/company/aaras-tech/",
    "https://www.instagram.com/aaras_tech/",
    "https://web.facebook.com/aarasuk",
  ],
  "knowsAbout": [
    "AEO",
    "SEO",
    "web development",
    "AI solutions",
    "mobile app development",
    "UI/UX design",
    "digital marketing",
    "SaaS development",
    "cloud solutions",
    "business automation",
  ],
  "areaServed": [
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "Sri Lanka" },
    { "@type": "City", "name": "Jaffna" },
    { "@type": "City", "name": "Grimsby" },
  ],
};

export const websiteSchema: JsonLdNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "url": SITE_URL,
  "name": BRAND_NAME,
  "alternateName": ["AarasTech Digital Services", "AarasTech Software Company"],
  "description": "AarasTech builds intelligent websites, AI solutions, mobile apps, SaaS platforms, and SEO/AEO-ready digital experiences.",
  "publisher": {
    "@id": `${SITE_URL}/#organization`,
  },
  "inLanguage": "en",
};

export const localBusinessSchema: JsonLdNode = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#local-business`,
  "name": BRAND_NAME,
  "url": SITE_URL,
  "image": DEFAULT_OG_IMAGE,
  "priceRange": "$$",
  "telephone": "+44 7438 603306",
  "parentOrganization": {
    "@id": `${SITE_URL}/#organization`,
  },
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "Grimsby",
      "addressRegion": "England",
      "addressCountry": "GB",
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Jaffna",
      "addressCountry": "LK",
    },
  ],
  "areaServed": ["United Kingdom", "Sri Lanka", "Jaffna", "Grimsby", "International"],
};

export const founderSchema: JsonLdNode = {
  "@type": "Person",
  "@id": `${SITE_URL}/#founder-aaras-kumar`,
  "name": "Aaras Kumar",
  "jobTitle": "Founder & Lead Engineer",
  "worksFor": {
    "@id": `${SITE_URL}/#organization`,
  },
  "knowsAbout": ["AI application development", "web development", "SaaS platforms", "SEO", "AEO", "software architecture"],
};

export function pageSchema(options: {
  path: string;
  name: string;
  description: string;
  type?: string;
}): JsonLdNode {
  return {
    "@type": options.type || "WebPage",
    "@id": `${absoluteUrl(options.path)}#webpage`,
    "url": absoluteUrl(options.path),
    "name": options.name,
    "description": options.description,
    "isPartOf": {
      "@id": `${SITE_URL}/#website`,
    },
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
    "inLanguage": "en",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items[items.length - 1]?.path || "/")}#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>): JsonLdNode {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function serviceListSchema(services = serviceOfferings): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/services#service-list`,
    "name": "AarasTech Digital Services",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
          "@id": `${SITE_URL}/#organization`,
        },
        "areaServed": ["United Kingdom", "Sri Lanka", "Jaffna", "International"],
      },
    })),
  };
}

export function articleSchema(options: {
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string;
}): JsonLdNode {
  const datePublished = toIsoDate(options.datePublished);
  const dateModified = toIsoDate(options.dateModified || options.datePublished);

  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(options.path)}#article`,
    "mainEntityOfPage": {
      "@id": `${absoluteUrl(options.path)}#webpage`,
    },
    "headline": options.title,
    "description": options.description,
    "image": options.image || DEFAULT_OG_IMAGE,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": options.author || BRAND_NAME,
    },
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
    "keywords": options.keywords,
    "inLanguage": "en",
  };
}

function toIsoDate(value?: string) {
  if (!value) return undefined;
  const time = Date.parse(value);
  if (Number.isNaN(time)) return value;
  return new Date(time).toISOString().slice(0, 10);
}

export function buildSchema(nodes: JsonLdNode[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      localBusinessSchema,
      founderSchema,
      ...nodes,
    ],
  });
}
