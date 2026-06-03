import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, ArrowRight, Briefcase } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const categories = ["All", "Web", "Mobile", "AI", "SaaS", "Branding"];

const projects = [
  {
    title: "FinanceFlow AI",
    category: "AI",
    tags: ["React", "Python", "OpenAI"],
    desc: "AI-powered financial analytics platform with real-time insights and predictive modeling.",
    color: "#0697A7",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGFzaGJvYXJkJTIwVUl8ZW58MXx8fHwxNzc5ODk2NzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "NexCommerce",
    category: "Web",
    tags: ["Next.js", "Stripe", "Node"],
    desc: "Full-featured multi-vendor e-commerce platform with advanced analytics dashboard.",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1648134859177-66e35b61e106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwd2Vic2l0ZXxlbnwxfHx8fDE3Nzk4OTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "MedConnect Mobile",
    category: "Mobile",
    tags: ["React Native", "Firebase"],
    desc: "Healthcare mobile app connecting patients with doctors through telemedicine features.",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1603566234499-85676f87022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBkYXJrfGVufDF8fHx8MTc3OTg5NjcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "CloudDesk SaaS",
    category: "SaaS",
    tags: ["Vue.js", "AWS", "PostgreSQL"],
    desc: "Enterprise project management SaaS with AI-powered task automation and team collaboration.",
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwb2ZmaWNlJTIwZGFya3xlbnwxfHx8fDE3Nzk4OTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "LuxBrand Identity",
    category: "Branding",
    tags: ["Figma", "Adobe", "Motion"],
    desc: "Complete luxury brand identity system for a premium fashion house entering the UK market.",
    color: "#ec4899",
    image: "https://images.unsplash.com/photo-1689443111130-6e9c7dfd8f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBkYXJrJTIwY3lhbiUyMHB1cnBsZXxlbnwxfHx8fDE3Nzk4OTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "SmartBot Assistant",
    category: "AI",
    tags: ["GPT-4", "Node.js", "React"],
    desc: "Intelligent chatbot solution with context-aware responses and multi-language support.",
    color: "#06b6d4",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwb24lMjBzY3JlZW58ZW58MXx8fHwxNzc5NzI3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="relative bg-[#030303] py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0697A7]/3 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
            <Briefcase size={14} /> Our Portfolio
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Work That Speaks{" "}
            <span style={{ background: "linear-gradient(135deg, #0697A7, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Volumes
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Explore our portfolio of premium digital products and transformative solutions.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-gradient-to-r from-[#0697A7] to-[#0ea5e9] text-black"
                  : "border border-white/10 text-gray-400 hover:border-[#0697A7]/40 hover:text-[#0697A7]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.03, boxShadow: `0 0 40px ${project.color}20` }}
              className="group rounded-2xl border border-white/10 overflow-hidden cursor-default bg-[#0a0a0a]"
            >
              {/* Mockup Preview */}
              <div className={`relative h-44 flex items-end justify-center overflow-hidden`}>
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                {/* Category badge */}
                <div
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-semibold text-black z-10"
                  style={{ background: project.color }}
                >
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-white font-semibold text-lg mb-2 group-hover:text-[#0697A7] transition-colors"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ gap: "10px" }}
                  className="flex items-center gap-2 text-[#0697A7] text-sm font-medium transition-all"
                >
                  View Case Study <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,151,167,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#0697A7]/40 text-[#0697A7] font-semibold hover:bg-[#0697A7]/10 transition-all"
          >
            View All Projects <ExternalLink size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
