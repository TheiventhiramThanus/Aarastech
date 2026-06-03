import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { ArrowRight, Layers, Clock, Users, Award, Search } from "lucide-react";
import { SEO } from "../components/SEO";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AdBanner } from "../components/AdManager";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { brandKeywords, breadcrumbSchema, buildSchema, faqSchema, pageSchema, serviceListSchema } from "../lib/seo";

interface Service {
  id: string; title: string; desc: string; features: string; color: string; image?: string; active: boolean; icon: string;
}

const process = [
  { step: "01", title: "Discovery & Strategy", desc: "We dive deep into your business goals, target audience, and competitive landscape to craft a winning digital strategy.", color: "#0697A7" },
  { step: "02", title: "Design & Prototype", desc: "Our designers create stunning wireframes and interactive prototypes, ensuring every detail is perfect before development begins.", color: "#7c3aed" },
  { step: "03", title: "Development & Testing", desc: "Our engineers build your product with clean, scalable code — rigorously tested across devices and browsers for flawless performance.", color: "#ec4899" },
  { step: "04", title: "Launch & Support", desc: "We deploy your product, monitor performance, and provide ongoing support to ensure continued growth and stability.", color: "#10b981" },
];

const techStack = [
  ["React", "Next.js", "TypeScript", "Node.js"],
  ["Python", "FastAPI", "PostgreSQL", "MongoDB"],
  ["AWS", "GCP", "Docker", "Kubernetes"],
  ["React Native", "Figma", "OpenAI", "Stripe"],
];

const serviceKeywords = "AarasTech services, SEO services, AEO services, answer engine optimization, web development UK, software development Sri Lanka, AI application development, mobile app development, UI UX design, ecommerce development, SaaS development";

const serviceFaqs = [
  {
    question: "What services does AarasTech offer?",
    answer: "AarasTech offers custom website development, mobile apps, AI-powered applications, UI/UX design, e-commerce, SaaS platforms, cloud solutions, automation, branding, SEO, AEO, and digital marketing.",
  },
  {
    question: "Can AarasTech improve Google rankings and AI answer visibility?",
    answer: "Yes. We combine technical SEO, content strategy, schema markup, local SEO, and AEO formatting so your business is easier to find in search engines and AI answer tools.",
  },
  {
    question: "What is AEO and why does it matter?",
    answer: "AEO stands for Answer Engine Optimization. It structures your content so AI assistants, voice search, and search snippets can understand your services and answer customer questions clearly.",
  },
  {
    question: "Do you build SEO-friendly websites from the start?",
    answer: "Yes. Every website is planned with fast loading, responsive layouts, semantic headings, metadata, structured data, accessible content, and conversion-focused page structure.",
  },
  {
    question: "Do you work with UK and Sri Lanka businesses?",
    answer: "Yes. AarasTech works with businesses in the UK, Sri Lanka, and international markets, with support for local service pages, multilingual content planning, and timezone-friendly delivery.",
  },
];

const seoAeoHighlights = [
  {
    title: "Technical SEO",
    desc: "Clean site structure, metadata, page speed, responsive UI, canonical URLs, and crawl-friendly content.",
  },
  {
    title: "AEO Content",
    desc: "Clear answers, FAQ content, intent-led headings, and concise service explanations for AI answer engines.",
  },
  {
    title: "Structured Data",
    desc: "Service, organization, FAQ, and page schema that helps search engines understand your business.",
  },
];

const structuredServiceOffers = [
  { name: "Custom Website Development", description: "Fast, responsive, SEO-friendly websites built with modern frameworks." },
  { name: "SEO & AEO Optimization", description: "Search engine optimization and answer engine optimization for stronger discovery." },
  { name: "AI-Powered Applications", description: "AI systems, chatbots, automation, and intelligent web applications." },
  { name: "Mobile App Development", description: "Native and cross-platform apps for iOS and Android." },
  { name: "UI/UX Design", description: "Research-led product design, wireframes, prototypes, and design systems." },
  { name: "E-Commerce Solutions", description: "Online stores with payments, inventory, analytics, and conversion optimization." },
  { name: "SaaS Platform Development", description: "Scalable SaaS products with subscriptions, dashboards, and cloud deployment." },
];

function normalizeService(service: Service): Service {
  if (service.title !== "SEO & Digital Marketing") return service;

  return {
    ...service,
    title: "SEO & AEO Optimization",
    desc: "Technical SEO, answer engine optimization, schema markup, and content strategy for better discovery.",
    features: "Technical SEO, AEO content, Schema markup, Analytics",
  };
}

const servicesSchema = buildSchema([
  pageSchema({
    path: "/services",
    name: "AarasTech Services - SEO, AEO, Web Development and AI Solutions",
    description: "AarasTech provides SEO, AEO, web development, mobile app development, AI application development, UI/UX design, e-commerce, SaaS, cloud, and automation services.",
    type: "CollectionPage",
  }),
  serviceListSchema(structuredServiceOffers),
  faqSchema(serviceFaqs),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]),
]);

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, "services"), where("active", "==", true));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => normalizeService({ id: doc.id, ...doc.data() } as Service));
        // Sort explicitly by title for consistency since we cannot easily do composite where+orderBy without indices
        data.sort((a, b) => a.title.localeCompare(b.title));
        setServices(data);
      } catch (e) {
        console.error("Error fetching services:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-black pt-20">
      <SEO 
        title="SEO, AEO, Web Development & AI Services | AarasTech"
        description="Explore AarasTech services for SEO, AEO, custom websites, AI applications, mobile apps, UI/UX design, e-commerce, SaaS, cloud, and automation across the UK and Sri Lanka."
        canonicalUrl="https://aarastech.com/services"
        keywords={`${serviceKeywords}, ${brandKeywords.join(", ")}`}
        schema={servicesSchema}
      />
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7c3aed]/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0697A7]/6 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(6,151,167,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(6,151,167,0.3) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a855f7] text-sm mb-6">
              <Layers size={13} /> Our Services
            </div>
            <h1 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              Everything You Need to{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Dominate Digitally
              </span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
              13 premium digital services under one roof - from AI applications to SEO and AEO growth systems. All delivered with unmatched quality and speed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <AdBanner position="Services section" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {loading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 text-gray-500">Loading services...</div>
          ) : services.map((s, i) => {
            const Icon = (Icons[s.icon as keyof typeof Icons] || Icons.Globe) as React.ElementType;
            const features = s.features ? s.features.split(",") : [];
            return (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl bg-[#080808] group cursor-default transition-all duration-300 overflow-hidden flex flex-col"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="relative h-40 overflow-hidden flex-shrink-0">
                  {s.image && <ImageWithFallback src={s.image} alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${s.color}25 0%, rgba(8,8,8,0.85) 100%)` }} />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md"
                    style={{ background: s.color + "30", border: `1px solid ${s.color}50` }}>
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white text-sm font-semibold mb-2 group-hover:text-[#0697A7] transition-colors" style={{ fontFamily: "Space Grotesk" }}>{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {features.map(f => (
                      <span key={f} className="px-2 py-0.5 rounded-full text-xs" style={{ background: s.color + "12", color: s.color }}>{f.trim()}</span>
                    ))}
                  </div>
                  <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: `linear-gradient(90deg,${s.color},transparent)` }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0697A7]/3 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
              How We{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Work
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">A proven four-step process that takes your idea from concept to reality.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="relative p-6 rounded-2xl bg-[#080808]"
                style={{ border: `1px solid ${step.color}20` }}>
                <div className="text-5xl font-black mb-4 opacity-20" style={{ fontFamily: "Orbitron, monospace", color: step.color }}>{step.step}</div>
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "Space Grotesk" }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={16} className="text-gray-700" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
            Built With the{" "}
            <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Best Stack
            </span>
          </h2>
          <p className="text-gray-400">We use modern, battle-tested technologies to build fast, scalable, and secure products.</p>
        </motion.div>
        <div className="space-y-3">
          {techStack.map((row, ri) => (
            <motion.div key={ri} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: ri * 0.1 }}
              className="flex flex-wrap gap-3 justify-center">
              {row.map((tech, ti) => (
                <motion.div key={tech} whileHover={{ scale: 1.08, borderColor: "#0697A7" }}
                  className="px-5 py-2.5 rounded-xl text-gray-300 text-sm font-medium cursor-default transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEO & AEO */}
      <section aria-labelledby="services-aeo-heading" className="py-24 bg-[#030303] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-5">
              <Search size={13} /> SEO & AEO
            </div>
            <h2 id="services-aeo-heading" className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
              Search-Ready Services for{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Google and AI Answers
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We build every service page with clear answers, structured data, and technical foundations that help people and AI systems understand what you offer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {seoAeoHighlights.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-[#080808]"
                style={{ border: "1px solid rgba(6,151,167,0.18)" }}>
                <div className="text-[#0697A7] text-xs font-semibold mb-3 uppercase tracking-wide">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "Space Grotesk" }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceFaqs.map((faq, i) => (
              <motion.article key={faq.question} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-[#080808]"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-white text-sm font-semibold mb-2" style={{ fontFamily: "Space Grotesk" }}>{faq.question}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#030303]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
              Why Clients Choose{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AarasTech
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Clock, title: "Fast Delivery", desc: "We move quickly without sacrificing quality. Most projects delivered ahead of schedule.", color: "#0697A7" },
              { icon: Award, title: "Premium Quality", desc: "Awwwards-level design and production-grade code — we never settle for 'good enough'.", color: "#7c3aed" },
              { icon: Users, title: "Dedicated Support", desc: "A dedicated team is with you from day one, through launch and beyond.", color: "#10b981" },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.04 }}
                className="p-6 rounded-2xl bg-[#080808] text-center" style={{ border: `1px solid ${c.color}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: c.color + "18" }}>
                  <c.icon size={22} style={{ color: c.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "Space Grotesk" }}>{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(6,151,167,0.06),rgba(124,58,237,0.06))" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 700 }}>
              Let's Build Your{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Next Big Thing
              </span>
            </h2>
            <p className="text-gray-400 mb-8">Get a free consultation and project estimate within 24 hours.</p>
            <Link to="/contact">
              <motion.span whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,151,167,0.5)" }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-black font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
                Get Free Consultation <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
