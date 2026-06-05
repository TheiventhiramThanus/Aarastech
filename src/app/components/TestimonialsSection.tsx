import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Testimonial {
  id?: string; name: string; role: string; location: string;
  avatar: string; rating: number; text: string; color: string;
}

export function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial)));
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, testimonials.length]);

  const prev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((p) => (p + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  if (!loading && testimonials.length === 0) return null;
  if (!current) return null;

  return (
    <section className="relative bg-[#030303] py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${current.color}15, transparent)` }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
            <Star size={14} /> Client Testimonials
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            What Our{" "}
            <span style={{ background: "linear-gradient(135deg, #0697A7, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Clients
            </span>{" "}
            Say
          </h2>
        </motion.div>

        {/* Main Testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            className="relative p-10 rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm mb-8"
            style={{ boxShadow: `0 0 60px ${current.color}10` }}
          >
            <Quote size={48} className="absolute top-8 right-8 opacity-10" style={{ color: current.color }} />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Star size={18} fill={current.color} style={{ color: current.color }} />
                </motion.div>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
              "{current.text}"
            </p>

            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg"
                style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}80)` }}
              >
                {current.avatar}
              </div>
              <div>
                <div className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>{current.name}</div>
                <div className="text-gray-400 text-sm">{current.role}</div>
                <div className="text-xs mt-0.5" style={{ color: current.color }}>{current.location}</div>
              </div>
            </div>

            {/* Neon border bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl"
              style={{ background: `linear-gradient(90deg, ${current.color}, #7c3aed, transparent)` }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-[#0697A7]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#0697A7]/40 hover:text-[#0697A7] transition-all"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-11 h-11 rounded-full border border-[#0697A7]/40 flex items-center justify-center text-[#0697A7] hover:bg-[#0697A7]/10 transition-all"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Mini Cards Row */}
        <div className="hidden md:grid grid-cols-5 gap-3 mt-10">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                i === currentIndex
                  ? "border-[#0697A7]/50 bg-[#0697A7]/10"
                  : "border-white/5 bg-white/2 hover:border-white/10"
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold mx-auto mb-2"
                style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
              >
                {t.avatar}
              </div>
              <div className="text-gray-400 text-xs truncate">{t.name.split(" ")[0]}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
