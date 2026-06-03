import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Globe, Smartphone, Palette, Megaphone, Brain, BarChart3,
  ShoppingCart, Layers, Bot, Zap, Cloud, Star
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const services = [
  { icon: Globe, title: "Custom Website Development", desc: "Blazing-fast, SEO-optimized websites built with modern frameworks and stunning visual design.", color: "#0697A7", gradient: "from-[#0697A7]/20 to-[#0ea5e9]/5", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGV2ZWxvcG1lbnQlMjBjb2RlJTIwc2NyZWVufGVufDF8fHx8MTc3OTg5ODQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Brain, title: "AI-Powered Web Applications", desc: "Intelligent web apps that leverage cutting-edge AI to automate, predict, and personalize experiences.", color: "#7c3aed", gradient: "from-[#7c3aed]/20 to-[#a855f7]/5", image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhaW4lMjBnbG93aW5nfGVufDF8fHx8MTc3OTg5ODQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform mobile apps for iOS & Android that delight users and drive engagement.", color: "#06b6d4", gradient: "from-[#06b6d4]/20 to-[#0ea5e9]/5", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBzbWFydHBob25lfGVufDF8fHx8MTc3OTg3NTIyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Palette, title: "UI/UX Design", desc: "Premium interface design with deep user research, wireframing, prototyping, and polished final UI.", color: "#ec4899", gradient: "from-[#ec4899]/20 to-[#f43f5e]/5", image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWduJTIwd2lyZWZyYW1lfGVufDF8fHx8MTc3OTg2NDAyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: ShoppingCart, title: "E-Commerce Solutions", desc: "Full-featured online stores with seamless payment integrations, inventory management, and analytics.", color: "#f59e0b", gradient: "from-[#f59e0b]/20 to-[#f97316]/5", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Nzk4OTg0Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Star, title: "Branding & Creative Design", desc: "Complete brand identity systems including logos, style guides, marketing materials, and more.", color: "#10b981", gradient: "from-[#10b981]/20 to-[#34d399]/5", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ24lMjBjb2xvcnN8ZW58MXx8fHwxNzc5ODk4NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Megaphone, title: "SEO & AEO Optimization", desc: "Search and answer engine strategies that improve visibility, snippets, AI answers, and qualified traffic.", color: "#0697A7", gradient: "from-[#0697A7]/20 to-[#0ea5e9]/5", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW8lMjBkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3OTg5ODQyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: BarChart3, title: "Social Media Management", desc: "Strategic social media management with content creation, scheduling, and community engagement.", color: "#7c3aed", gradient: "from-[#7c3aed]/20 to-[#a855f7]/5", image: "https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hbmFnZW1lbnQlMjBwaG9uZXxlbnwxfHx8fDE3Nzk4OTg0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Layers, title: "SaaS Platforms", desc: "Scalable, multi-tenant SaaS products built from concept to production with modern cloud infrastructure.", color: "#06b6d4", gradient: "from-[#06b6d4]/20 to-[#0ea5e9]/5", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwcGxhdGZvcm0lMjBkYXNoYm9hcmQlMjBkYXJrfGVufDF8fHx8MTc3OTg5ODQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Globe, title: "Business Portfolio Websites", desc: "Professional portfolio and corporate websites that showcase your brand and convert visitors.", color: "#ec4899", gradient: "from-[#ec4899]/20 to-[#f43f5e]/5", image: "https://images.unsplash.com/photo-1641444473327-ea736547d7bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwc2NyZWVufGVufDF8fHx8MTc3OTg5ODQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Bot, title: "AI Chatbot Integration", desc: "Intelligent conversational AI systems that automate customer support and enhance user experiences.", color: "#f59e0b", gradient: "from-[#f59e0b]/20 to-[#f97316]/5", image: "https://images.unsplash.com/photo-1762328862557-e0a36587cd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGNoYXRib3QlMjByb2JvdCUyMGludGVyZmFjZXxlbnwxfHx8fDE3Nzk4OTg0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Zap, title: "Automation Systems", desc: "Business process automation that eliminates repetitive tasks, reduces costs, and increases efficiency.", color: "#10b981", gradient: "from-[#10b981]/20 to-[#34d399]/5", image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwcm9ib3QlMjBhcm0lMjB0ZWNofGVufDF8fHx8MTc3OTg5ODQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { icon: Cloud, title: "Cloud Solutions", desc: "Enterprise-grade cloud architecture, deployment, scaling, and management on AWS, GCP, and Azure.", color: "#0697A7", gradient: "from-[#0697A7]/20 to-[#0ea5e9]/5", image: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHNlcnZlciUyMG5ldHdvcmslMjBnbG93aW5nfGVufDF8fHx8MTc3OTg5ODQzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

export function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative bg-black py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0697A7]/5 rounded-full blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(6,151,167,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,151,167,0.4) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a855f7] text-sm mb-6">
            <Layers size={14} /> Our Services
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Everything You Need to{" "}
            <span style={{ background: "linear-gradient(135deg, #0697A7, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Dominate
            </span>{" "}
            Digitally
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From concept to launch — we provide end-to-end digital solutions powered by the latest technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 0 30px ${service.color}30`,
                borderColor: service.color + "60",
              }}
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              className={`relative rounded-2xl bg-gradient-to-br ${service.gradient} border cursor-default group overflow-hidden transition-all duration-300 flex flex-col h-full`}
            >
              {/* Image Header */}
              <div className="h-32 relative overflow-hidden flex-shrink-0" style={{ borderBottom: `1px solid ${service.color}20` }}>
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Icon positioned over the image */}
                <div
                  className="absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10 backdrop-blur-md border border-white/10"
                  style={{ background: service.color + "40", boxShadow: `0 0 15px ${service.color}50` }}
                >
                  <service.icon size={18} style={{ color: "#fff" }} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow flex flex-col">
                <h3
                  className="text-white text-sm font-semibold mb-2 group-hover:text-[#0697A7] transition-colors"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.desc}</p>
              </div>

              {/* Neon border bottom */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
