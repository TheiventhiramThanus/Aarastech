import { Link } from "react-router";
import { motion } from "motion/react";
import { SEO } from "../components/SEO";
import { HeroSection } from "../components/HeroSection";
import { MarqueeBanner } from "../components/MarqueeBanner";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { BlogSection } from "../components/BlogSection";
import { ArrowRight, Code2, Brain, Smartphone, Palette, ShoppingCart, Globe, Star, Zap, CheckCircle, Megaphone } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AdBanner } from "../components/AdManager";
import { AEOAnswerSection } from "../components/AEOAnswerSection";
import { brandKeywords, breadcrumbSchema, buildSchema, faqSchema, pageSchema, serviceKeywords, serviceListSchema } from "../lib/seo";

const featuredServices = [
  { icon: Globe, title: "Custom Website Development", desc: "Blazing-fast, visually stunning websites built with React, Next.js, and modern frameworks.", color: "#0697A7", image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGV2ZWxvcG1lbnQlMjBzY3JlZW4lMjBkYXJrfGVufDF8fHx8MTc3OTg5ODQ4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Brain, title: "AI-Powered Applications", desc: "Intelligent systems that automate, predict, and personalize digital experiences using cutting-edge AI.", color: "#7c3aed", image: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBnbG93aW5nJTIwbGluZXN8ZW58MXx8fHwxNzc5ODk4NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform iOS & Android apps that users love, built with React Native.", color: "#06b6d4", image: "https://images.unsplash.com/photo-1707836868495-3307d371aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBzY3JlZW58ZW58MXx8fHwxNzc5ODEyMDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Palette, title: "UI/UX Design", desc: "Award-worthy interface design with meticulous research, wireframing, and pixel-perfect execution.", color: "#ec4899", image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWduJTIwd2lyZWZyYW1lcyUyMGRhcmt8ZW58MXx8fHwxNzc5ODk4NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: ShoppingCart, title: "E-Commerce Solutions", desc: "Scalable online stores with seamless payment flows, inventory, and conversion optimization.", color: "#f59e0b", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBkYXNoYm9hcmQlMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3Nzk4OTczOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Megaphone, title: "SEO & AEO Optimization", desc: "Search and answer engine strategies for stronger Google rankings, AI summaries, and organic discovery.", color: "#0697A7", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { icon: Zap, title: "Automation Systems", desc: "Business process automation that eliminates repetitive work and boosts operational efficiency.", color: "#10b981", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwdGVjaG5vbG9neSUyMGdsb3dpbmd8ZW58MXx8fHwxNzc5ODk4NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const featuredProjects = [
  { title: "FinanceFlow AI", type: "AI Platform", desc: "Real-time financial analytics with ML-powered predictions and a stunning dashboard.", color: "#0697A7", bars: [60, 80, 45, 90, 70, 85, 95] },
  { title: "MedConnect", type: "Mobile App", desc: "Telemedicine mobile app connecting 50,000+ patients with healthcare providers.", color: "#7c3aed", bars: [75, 55, 90, 65, 80, 70, 85] },
  { title: "CloudDesk SaaS", type: "SaaS Platform", desc: "Enterprise project management platform serving 15+ businesses across the UK.", color: "#10b981", bars: [85, 65, 75, 95, 55, 80, 70] },
];

const whyUs = [
  "Premium, award-level design standards",
  "On-time delivery — every project, every time",
  "AI-first development approach",
  "Dedicated support across UK & Sri Lanka time zones",
  "Transparent pricing with no hidden costs",
  "Post-launch support & maintenance included",
];

const homeAeoAnswers = [
  {
    question: "What is AarasTech?",
    answer: "AarasTech is a digital technology company that builds websites, AI solutions, mobile apps, UI/UX design systems, SaaS platforms, e-commerce stores, SEO, AEO, and automation for businesses in Sri Lanka, the UK, and international markets.",
  },
  {
    question: "Why choose AarasTech for digital services?",
    answer: "Businesses choose AarasTech for fast delivery, premium design quality, AI-first engineering, transparent communication, and practical post-launch support across UK and Sri Lanka time zones.",
  },
  {
    question: "Where does AarasTech provide services?",
    answer: "AarasTech serves clients in Sri Lanka, Jaffna, the UK, Grimsby, and global remote markets. The team supports local SEO, international websites, and timezone-friendly delivery.",
  },
  {
    question: "Can AarasTech help my business appear in AI search answers?",
    answer: "Yes. AarasTech builds SEO and AEO-ready content structures, FAQ blocks, schema markup, clean headings, and technical foundations that help AI assistants and search engines understand your business.",
  },
];

export function HomePage() {
  return (
    <div>
      <SEO 
        title="AarasTech | AI Solutions, Web Development, SEO & AEO"
        description="AarasTech is a Sri Lanka and UK digital technology company building AI solutions, custom websites, mobile apps, UI/UX design, SEO, AEO, SaaS, e-commerce, and automation."
        canonicalUrl="https://aarastech.com/"
        keywords={[...brandKeywords, ...serviceKeywords, "AarasTech Jaffna", "AarasTech Grimsby"].join(", ")}
        schema={buildSchema([
          pageSchema({
            path: "/",
            name: "AarasTech - AI Solutions, Web Development, SEO and AEO",
            description: "AarasTech is a digital technology company serving Sri Lanka, the UK, Jaffna, Grimsby, and international businesses with AI solutions, web development, mobile apps, UI/UX, SEO, AEO, SaaS, and automation.",
          }),
          serviceListSchema(),
          faqSchema(homeAeoAnswers),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ])}
      />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6">
        <AdBanner position="Home page hero below" />
      </div>
      <MarqueeBanner />

      <AEOAnswerSection
        id="aarastech-ai-summary"
        eyebrow="AarasTech Summary"
        title="Clear Answers About"
        highlight="AarasTech"
        summary="These short answers help visitors, search engines, and AI assistants understand AarasTech, our services, and our locations."
        answers={homeAeoAnswers}
      />

      <BlogSection />

      {/* Services Preview */}
      <section id="services-preview" className="bg-black py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0697A7]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a855f7] text-sm mb-5">
              <Star size={13} /> What We Do
            </div>
            <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
              Services Built for{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Modern Businesses
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From AI-powered platforms to beautiful websites — we cover everything your digital growth needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {featuredServices.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-2xl bg-[#080808] group cursor-default transition-all duration-300 overflow-hidden border border-white/10 flex flex-col h-full"
              >
                {/* Image Header */}
                <div className="h-32 relative overflow-hidden flex-shrink-0" style={{ borderBottom: `1px solid ${s.color}20` }}>
                  <ImageWithFallback
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />
                  
                  {/* Icon over image */}
                  <div className="absolute bottom-4 left-5 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10 backdrop-blur-md border border-white/10"
                    style={{ background: s.color + "40", boxShadow: `0 0 15px ${s.color}50` }}>
                    <s.icon size={20} style={{ color: "#fff" }} />
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col pt-3">
                  <h3 className="text-white text-sm font-semibold mb-2 group-hover:text-[#0697A7] transition-colors" style={{ fontFamily: "Space Grotesk" }}>{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <motion.span
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="ui-action inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#0697A7]/40 text-[#0697A7] font-semibold hover:bg-[#0697A7]/10 transition-all cursor-pointer"
              >
                View All Services <ArrowRight size={16} />
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="bg-[#030303] py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0697A7]/3 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-5">
              <Code2 size={13} /> Featured Work
            </div>
            <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
              Projects That{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Define Excellence
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              A glimpse into our most impactful digital products — crafted with precision and passion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-2xl overflow-hidden bg-[#080808] cursor-default"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Chart Preview */}
                <div className="h-40 p-4 relative" style={{ background: `linear-gradient(135deg, ${p.color}18, transparent)` }}>
                  <div className="absolute inset-4 bg-black/40 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-end gap-1 h-full">
                      {p.bars.map((h, bi) => (
                        <motion.div key={bi} className="flex-1 rounded-sm"
                          style={{ height: `${h}%`, background: bi === p.bars.length - 1 ? p.color : p.color + "40" }}
                          animate={{ scaleY: [1, 1.12, 1] }}
                          transition={{ duration: 2.5, delay: bi * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 px-2 py-0.5 rounded-full text-xs font-semibold text-black" style={{ background: p.color }}>
                    {p.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "Space Grotesk" }}>{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <motion.span
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="ui-action inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium transition-all cursor-pointer"
              >
                Explore All Services <ArrowRight size={16} />
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-black py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
                <Zap size={13} /> Why AarasTech
              </div>
              <h2 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.1 }}>
                The Agency That Delivers{" "}
                <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Beyond Expectations
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                We don't just build websites — we craft digital empires. Every pixel, every line of code, every interaction is engineered to make your brand unforgettable and your business unstoppable.
              </p>
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,151,167,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  className="ui-action inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-black font-bold cursor-pointer"
                  style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}
                >
                  Start Your Project <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[500px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758773263238-1989d0cc788c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3OTg5NzAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0697A7]/20 to-[#7c3aed]/20 blur-2xl z-0 rounded-full" />
              
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="space-y-3 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  {whyUs.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle size={17} className="text-[#0697A7] flex-shrink-0" />
                      <span className="text-gray-300 text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwYmx1ZSUyMHB1cnBsZXxlbnwxfHx8fDE3Nzk4OTcwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Server Room Background"
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,151,167,0.15), rgba(124,58,237,0.15))" }} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-0" style={{ border: "1px solid rgba(6,151,167,0.1)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700 }}>
              Ready to Build Something{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Extraordinary?
              </span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">Join 15+ businesses that chose AarasTech to transform their digital presence.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,151,167,0.6)" }}
                  className="ui-action inline-flex items-center gap-2 px-8 py-4 rounded-xl text-black font-bold cursor-pointer"
                  style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}
                >
                  Start Your Project <ArrowRight size={16} />
                </motion.span>
              </Link>
              <Link to="/services">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="ui-action inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold cursor-pointer hover:border-white/40 transition-all"
                >
                  Explore Services <ArrowRight size={16} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
