import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { SEO } from "../components/SEO";
import { ArrowRight, Target, Eye, Globe2, Zap, Heart, Shield, Rocket, Users, Award } from "lucide-react";
import { AEOAnswerSection } from "../components/AEOAnswerSection";
import { brandKeywords, breadcrumbSchema, buildSchema, faqSchema, pageSchema } from "../lib/seo";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += increment;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const values = [
  { icon: Rocket, title: "Innovation First", desc: "We embrace emerging technologies and push creative boundaries on every project.", color: "#0697A7" },
  { icon: Shield, title: "Quality Without Compromise", desc: "Every line of code, every pixel of design is held to the highest professional standard.", color: "#7c3aed" },
  { icon: Heart, title: "Client-Centric", desc: "Your success is our success. We listen deeply and build exactly what your business needs.", color: "#ec4899" },
  { icon: Users, title: "Collaborative Spirit", desc: "We work as true partners, not vendors — transparent, communicative, and invested in your goals.", color: "#10b981" },
  { icon: Globe2, title: "Global Perspective", desc: "With roots in both UK and Sri Lanka, we bring diverse cultural insights to every project.", color: "#f59e0b" },
  { icon: Award, title: "Excellence Delivered", desc: "We don't ship average work. Every deliverable is something we're proud to put our name on.", color: "#06b6d4" },
];

const timeline = [
  { year: "Jan 2025", title: "AarasTech Founded", desc: "Established in Grimsby, England with a bold mission to deliver world-class digital experiences." },
  { year: "Mar 2025", title: "Sri Lanka Operations", desc: "Opened South Asian operations, enabling round-the-clock development across two continents." },
  { year: "Apr 2025", title: "First 10 Clients", desc: "Rapidly onboarded 10+ clients across UK and Sri Lanka, delivering premium websites and apps." },
  { year: "May 2025", title: "AI Division Launch", desc: "Launched our dedicated AI & Automation division, building intelligent systems for modern businesses." },
  { year: "2026", title: "Global Expansion", desc: "Scaling to serve enterprises worldwide with a growing team and expanded service offerings." },
];
const aboutAeoAnswers = [
  {
    question: "What is AarasTech known for?",
    answer: "AarasTech is known for building AI solutions, custom websites, mobile apps, UI/UX design systems, SEO/AEO-ready pages, SaaS platforms, and automation for businesses that need modern digital growth.",
  },
  {
    question: "Is AarasTech a Sri Lanka or UK company?",
    answer: "AarasTech serves both Sri Lanka and the UK, with a practical delivery model that supports clients in Jaffna, Grimsby, and remote international markets.",
  },
  {
    question: "Who founded AarasTech?",
    answer: "AarasTech is represented by Aaras Kumar, Founder & Lead Engineer, and a team focused on AI-first software engineering, product design, and digital service delivery.",
  },
  {
    question: "What makes AarasTech different?",
    answer: "AarasTech combines premium visual design, clean engineering, AI automation, SEO/AEO strategy, transparent delivery, and post-launch support in one digital technology team.",
  },
];

const aboutSchema = buildSchema([
  pageSchema({
    path: "/about",
    name: "About AarasTech - Software Company in UK and Sri Lanka",
    description: "Learn about AarasTech, a UK and Sri Lanka digital technology company building AI solutions, websites, mobile apps, UI/UX design, SEO, AEO, SaaS, and automation.",
    type: "AboutPage",
  }),
  faqSchema(aboutAeoAnswers),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
]);
export function AboutPage() {
  return (
    <div className="bg-black pt-20">
      <SEO 
        title="About AarasTech | Software Company in Sri Lanka & UK"
        description="Learn about AarasTech, a Sri Lanka and UK digital technology company building AI solutions, web development, mobile apps, UI/UX design, SEO, AEO, SaaS, and automation."
        canonicalUrl="https://aarastech.com/about"
        keywords={[...brandKeywords, "AarasTech about", "AarasTech founder", "software company Jaffna", "software company Grimsby"].join(", ")}
        author="AarasTech"
        schema={aboutSchema}
      />
      {/* Page Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0697A7]/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7c3aed]/6 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(6,151,167,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(6,151,167,0.3) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
              <Globe2 size={13} /> About AarasTech
            </div>
            <h1 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              We Build Digital Futures{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Without Limits
              </span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
              A next-generation digital agency born in England, operating across the UK and Sri Lanka — crafting technology experiences that transform businesses and inspire people.
            </p>
          </motion.div>
        </div>
      </section>

      <AEOAnswerSection
        id="about-aarastech-summary"
        eyebrow="About AarasTech"
        title="What AI Search Should Know About"
        highlight="AarasTech"
        summary="A concise company summary for visitors, search engines, and answer engines looking for AarasTech, AarasTech Sri Lanka, or AarasTech UK."
        answers={aboutAeoAnswers}
      />

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-[#0697A7] text-sm font-semibold mb-3 tracking-wider uppercase">Our Story</div>
            <h2 className="text-white mb-5" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 700 }}>
              Born from a Passion to Build Better Digital Experiences
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              AarasTech was founded in 2025 with a singular belief: that every business — regardless of size — deserves world-class digital technology. We saw too many companies settling for mediocre websites and generic solutions that failed to capture their true potential.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              With a team spanning Grimsby, England and Sri Lanka, we bring together diverse talent, global perspectives, and an obsession with quality to deliver digital products that genuinely move the needle for our clients.
            </p>
            <Link to="/contact">
              <motion.span whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-black font-bold cursor-pointer text-sm"
                style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
                Work With Us <ArrowRight size={15} />
              </motion.span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {/* UK/LK Connection Visual */}
            <div className="p-8 rounded-2xl" style={{ background: "rgba(6,151,167,0.05)", border: "1px solid rgba(6,151,167,0.15)" }}>
              <div className="text-gray-400 text-xs mb-5 text-center uppercase tracking-widest">Service Regions</div>
              <div className="flex items-center justify-around mb-6">
                <div className="text-center">
                  <div className="text-5xl mb-2">🇬🇧</div>
                  <div className="text-white font-semibold">United Kingdom</div>
                  <div className="text-gray-500 text-sm">Grimsby, England</div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                      className="w-2 h-2 bg-[#0697A7] rounded-full" />
                  ))}
                  <div className="text-[#0697A7] text-xs mt-1 font-medium">Live Bridge</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-2">🇱🇰</div>
                  <div className="text-white font-semibold">Sri Lanka</div>
                  <div className="text-gray-500 text-sm">South Asia</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "24/7", label: "Support" },
                  { val: "2", label: "Offices" },
                  { val: "Global", label: "Reach" },
                ].map((s, i) => (
                  <div key={i} className="py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-[#0697A7] font-bold" style={{ fontFamily: "Orbitron, monospace" }}>{s.val}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { target: 10, suffix: "+", label: "Projects Delivered" },
              { target: 15, suffix: "+", label: "Happy Clients" },
              { target: 13, suffix: "+", label: "Core Services" },
              { target: 100, suffix: "%", label: "Client Satisfaction" },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl" style={{ background: "rgba(6,151,167,0.05)", border: "1px solid rgba(6,151,167,0.15)" }}>
                <div className="text-[#0697A7] mb-1" style={{ fontFamily: "Orbitron, monospace", fontSize: "2.2rem", fontWeight: 700 }}>
                  <AnimatedCounter target={c.target} suffix={c.suffix} />
                </div>
                <div className="text-gray-400 text-sm">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
            Our{" "}
            <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Mission & Vision
            </span>
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our Mission", color: "#0697A7", border: "rgba(6,151,167,0.25)", bg: "rgba(6,151,167,0.05)", desc: "To empower businesses of all sizes with cutting-edge digital solutions — AI-powered systems, stunning websites, mobile apps, and intelligent automation — that drive measurable growth, reduce operational friction, and create lasting competitive advantage in the digital era." },
            { icon: Eye, title: "Our Vision", color: "#7c3aed", border: "rgba(124,58,237,0.25)", bg: "rgba(124,58,237,0.05)", desc: "To become the world's most innovative digital agency — recognized for creating transformative technology experiences that shape the future of business. We envision a world where every company, regardless of size or location, has access to world-class digital technology that unlocks their full potential." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15 }} whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: item.color + "20" }}>
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "Space Grotesk" }}>{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7c3aed]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
              Values That Drive{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Everything We Do
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.03, y: -4 }}
                className="p-6 rounded-2xl bg-[#080808] cursor-default group"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: v.color + "18" }}>
                  <v.icon size={20} style={{ color: v.color }} />
                </div>
                <h3 className="text-white text-sm font-semibold mb-2 group-hover:text-[#0697A7] transition-colors" style={{ fontFamily: "Space Grotesk" }}>{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
            Our{" "}
            <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Journey
            </span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-20"
            style={{ background: "linear-gradient(180deg,#0697A7,#7c3aed)" }} />
          {timeline.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-center mb-12 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
              <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                <div className="text-[#0697A7] text-sm font-semibold mb-1" style={{ fontFamily: "Orbitron, monospace" }}>{m.year}</div>
                <div className="text-white font-semibold mb-1">{m.title}</div>
                <div className="text-gray-400 text-sm leading-relaxed">{m.desc}</div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0697A7] rounded-full border-2 border-black"
                style={{ boxShadow: "0 0 12px rgba(6,151,167,0.8)" }} />
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(6,151,167,0.06),rgba(124,58,237,0.06))" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 700 }}>
              Ready to Be Our Next{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Success Story?
              </span>
            </h2>
            <p className="text-gray-400 mb-8">Let's build something incredible together.</p>
            <Link to="/contact">
              <motion.span whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,151,167,0.5)" }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-black font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
                Start Your Project <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
