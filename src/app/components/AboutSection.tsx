import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Target, Eye, Zap, Users, Globe2, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const milestones = [
  { year: "2025", title: "AarasTech Founded", desc: "Established in Grimsby, England with a vision to deliver world-class digital solutions." },
  { year: "2025", title: "Sri Lanka Office", desc: "Expanded our reach to South Asia, bridging the UK and Sri Lanka tech ecosystems." },
  { year: "2025", title: "AI Integration Launch", desc: "Launched our AI-powered web solutions division, serving clients globally." },
  { year: "2026", title: "Global Expansion", desc: "Scaling to serve startups, SMEs, and enterprises across multiple continents." },
];

const counters = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 13, suffix: "+", label: "Core Services" },
  { value: 2, suffix: "", label: "Global Regions" },
];

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-black py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0697A7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
            <Globe2 size={14} /> About AarasTech
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Bridging{" "}
            <span style={{ background: "linear-gradient(135deg, #0697A7, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Innovation
            </span>{" "}
            Across Borders
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Based in Grimsby, England, with operations in Sri Lanka — we deliver premium digital experiences that push the boundaries of what's possible.
          </p>
        </motion.div>

        {/* Feature Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-20 border border-white/10"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwb2ZmaWNlJTIwZGFya3xlbnwxfHx8fDE3Nzk4OTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern Tech Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm">
              <Zap size={14} className="text-[#0697A7]" /> Delivering Excellence Since 2025
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To empower businesses with cutting-edge digital solutions — from AI-powered systems to stunning web experiences — that drive measurable growth and lasting impact.",
              gradient: "from-[#0697A7]/20 to-[#0ea5e9]/10",
              border: "border-[#0697A7]/30",
            },
            {
              icon: Eye,
              title: "Our Vision",
              desc: "To become the world's most innovative digital agency, known for creating transformative technology experiences that shape the future of business and society.",
              gradient: "from-[#7c3aed]/20 to-[#a855f7]/10",
              border: "border-[#7c3aed]/30",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className={`p-8 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} backdrop-blur-sm`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                <item.icon size={24} className="text-[#0697A7]" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "Space Grotesk" }}>{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* UK ↔ Sri Lanka Connection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20 p-8 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">🇬🇧</div>
              <div className="text-white font-semibold">United Kingdom</div>
              <div className="text-gray-400 text-sm">Grimsby, England</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    className="w-2 h-2 bg-[#0697A7] rounded-full"
                  />
                ))}
              </div>
              <div className="text-[#0697A7] text-sm font-semibold">Global Digital Bridge</div>
            </div>
            <div>
              <div className="text-4xl mb-2">🇱🇰</div>
              <div className="text-white font-semibold">Sri Lanka</div>
              <div className="text-gray-400 text-sm">South Asia Operations</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <h3
            className="text-white text-center text-2xl font-bold mb-12"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Our Journey
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0697A7] to-[#7c3aed] opacity-30" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * i }}
                className={`relative flex items-center mb-10 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div className="text-[#0697A7] text-sm font-semibold mb-1" style={{ fontFamily: "Orbitron" }}>{m.year}</div>
                  <div className="text-white font-semibold mb-1">{m.title}</div>
                  <div className="text-gray-400 text-sm">{m.desc}</div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0697A7] rounded-full border-2 border-black shadow-[0_0_12px_rgba(6,151,167,0.8)]" />
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {counters.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl border border-[#0697A7]/20 bg-[#0697A7]/5"
            >
              <div
                className="text-[#0697A7] mb-2"
                style={{ fontFamily: "Orbitron, monospace", fontSize: "2.5rem", fontWeight: 700 }}
              >
                <AnimatedCounter target={c.value} suffix={c.suffix} />
              </div>
              <div className="text-gray-400 text-sm">{c.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
