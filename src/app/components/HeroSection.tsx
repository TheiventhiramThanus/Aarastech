import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight, Play, Code2, Cpu, Globe, Zap, Shield, TrendingUp, Sparkles, Network, Bot } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.floor(canvas.offsetWidth * pixelRatio);
      canvas.height = Math.floor(canvas.offsetHeight * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particles: {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string;
    }[] = [];

    const colors = ["#0697A7", "#7c3aed", "#0ea5e9", "#a855f7"];

    const particleCount = prefersReducedMotion ? 24 : window.innerWidth < 768 ? 44 : 72;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      if (prefersReducedMotion) return;

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6,151,167,${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    if (prefersReducedMotion) {
      draw();
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const stats = [
  { icon: Code2, value: "10+", label: "Projects Delivered" },
  { icon: Globe, value: "2", label: "Service Regions" },
  { icon: Cpu, value: "13+", label: "Tech Services" },
  { icon: Shield, value: "100%", label: "Client Satisfaction" },
];

const floatingTech = [
  { label: "React", x: "10%", y: "20%", delay: 0 },
  { label: "AI Agents", x: "84%", y: "15%", delay: 0.5 },
  { label: "Node.js", x: "5%", y: "70%", delay: 1 },
  { label: "Cloud", x: "90%", y: "65%", delay: 1.5 },
  { label: "TypeScript", x: "20%", y: "85%", delay: 0.8 },
  { label: "Automation", x: "73%", y: "82%", delay: 1.2 },
];

const techPillars = [
  { icon: Bot, title: "AI automation", desc: "Smart workflows, assistants, and data-powered decisions." },
  { icon: Network, title: "Cloud architecture", desc: "Scalable backends, APIs, dashboards, and integrations." },
  { icon: Sparkles, title: "Premium UX", desc: "Glass interfaces with motion, clarity, and conversion focus." },
];

export function HeroSection() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollToContact = () => navigate("/contact");
  const scrollToServices = () => navigate("/services");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed z-0 rounded-full blur-3xl opacity-20 transition-all duration-300"
        style={{
          width: 400,
          height: 400,
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          background: "radial-gradient(circle, #0697A7 0%, transparent 70%)",
        }}
      />

      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      <div className="absolute inset-0 z-0 opacity-30 aurora-field pointer-events-none" />
      <div className="absolute inset-0 z-0 scanline-layer pointer-events-none" />

      {/* Cyber Grid */}
      <div
        className="absolute inset-0 z-0 opacity-10 cyber-grid"
        style={{
          backgroundImage: `linear-gradient(rgba(6,151,167,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,151,167,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-transparent via-black/80 to-black" />

      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMGN5YmVyJTIwbmlnaHR8ZW58MXx8fHwxNzc5ODk3MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cybernetic City"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating tech badges */}
      {floatingTech.map((t, i) => (
        <motion.div
          key={i}
          className="absolute z-10 hidden lg:block"
          style={{ left: t.x, top: t.y }}
          animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: t.delay, ease: "easeInOut" }}
        >
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-[#0697A7]/30 backdrop-blur-md text-[#0697A7] text-xs">
            {t.label}
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-8"
          >
            <div className="w-2 h-2 bg-[#0697A7] rounded-full animate-pulse" />
            Next-Generation Digital Agency · UK & Sri Lanka
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            className="text-white mb-6 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.1 }}
          >
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Building
              </motion.span>
            </span>{" "}
            <span className="relative inline-block overflow-hidden align-bottom">
              <motion.span
                className="relative inline-block"
                variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], filter: ["drop-shadow(0 0 0 rgba(6,151,167,0))", "drop-shadow(0 0 18px rgba(6,151,167,0.42))", "drop-shadow(0 0 0 rgba(6,151,167,0))"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "linear-gradient(100deg, #0697A7, #7c3aed, #0ea5e9, #ffffff, #0697A7)", backgroundSize: "300% 300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  Intelligent
                </motion.span>
              </motion.span>
            </span>
            <br />
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                Digital Experiences
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            We craft premium websites, AI-powered applications, mobile apps, and digital experiences
            that transform businesses and captivate audiences worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,151,167,0.7)" }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              className="ui-action flex items-center gap-2 px-8 py-4 rounded-xl text-black font-bold text-base transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #0697A7, #0ea5e9)" }}
            >
              Start Your Project <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,151,167,0.2)" }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToServices}
              className="ui-action flex items-center gap-2 px-8 py-4 rounded-xl text-white border border-white/20 backdrop-blur-sm bg-white/5 font-semibold text-base transition-all duration-200"
            >
              <Play size={16} className="text-[#0697A7]" /> Explore Services
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14 max-w-4xl mx-auto"
          >
            {techPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="tech-pillar-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-left overflow-hidden relative"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100" />
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0697A7]/15 border border-[#0697A7]/25 flex items-center justify-center flex-shrink-0">
                    <pillar.icon size={18} className="text-[#0697A7]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold mb-1" style={{ fontFamily: "Space Grotesk" }}>{pillar.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{pillar.desc}</div>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#0697A7] to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${45 + i * 22}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.12 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,151,167,0.15)" }}
                className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center group cursor-default"
              >
                <stat.icon size={22} className="text-[#0697A7] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div
                  className="text-white mb-1"
                  style={{ fontFamily: "Orbitron, monospace", fontSize: "1.5rem", fontWeight: 700 }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating dashboard mockup removed per request */}
      </div>

      {/* Hero Accent Image */}
      <div className="absolute bottom-0 right-0 z-0 opacity-10 md:opacity-20 pointer-events-none w-1/2 h-1/2">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1562907550-096d3bf9b25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RlJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzc5ODk3MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Code on screen"
          className="w-full h-full object-cover rounded-tl-[100%]"
          style={{ maskImage: "linear-gradient(to top left, rgba(0,0,0,1), rgba(0,0,0,0))", WebkitMaskImage: "linear-gradient(to top left, rgba(0,0,0,1), rgba(0,0,0,0))" }}
        />
      </div>
    </section>
  );
}
