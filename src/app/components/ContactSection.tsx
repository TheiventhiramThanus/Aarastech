import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", service: "", message: "" });
  };

  const contacts = [
    { icon: Phone, label: "Phone", value: "+44 7438 603306", color: "#0697A7" },
    { icon: Mail, label: "Email", value: "info@aarastech.com", color: "#7c3aed" },
    { icon: MapPin, label: "Location", value: "Grimsby, England, UK", color: "#10b981" },
  ];

  return (
    <section id="contact" className="relative bg-black py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0697A7]/5 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-3xl z-0" />
        
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1615803697515-3cb782c2a65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwdGVjaCUyMGNvbGxhYm9yYXRpb24lMjBvZmZpY2UlMjBkYXJrfGVufDF8fHx8MTc3OTg5ODUwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Office Collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-5 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(6,151,167,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,151,167,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
            <MessageSquare size={14} /> Get In Touch
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Let's Build Something{" "}
            <span style={{ background: "linear-gradient(135deg, #0697A7, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Amazing
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Ready to transform your digital presence? Tell us about your project and let's create something extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contacts.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${c.color}20` }}
                className="flex items-center gap-5 p-5 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: c.color + "20", boxShadow: `0 0 15px ${c.color}30` }}
                >
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">{c.label}</div>
                  <div className="text-white text-sm font-medium">{c.value}</div>
                </div>
              </motion.div>
            ))}

            {/* World Map Simplified */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-1 rounded-2xl border border-white/10 bg-white/3 overflow-hidden relative min-h-[200px]"
            >
              <div className="absolute inset-0 opacity-40 mix-blend-screen">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGxvZ2ljJTIwZGF0YWJhc2UlMjBkYXJrfGVufDF8fHx8MTc3OTg5ODUwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Global Network"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              </div>

              <div className="relative p-6 h-full flex flex-col justify-between z-10">
                <div className="text-gray-300 text-xs mb-3 font-semibold">Our Main Hubs</div>
                <div className="flex justify-around items-center">
                  <div className="text-center bg-black/40 p-3 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="text-3xl mb-1">🇬🇧</div>
                    <div className="text-white text-xs font-medium">UK</div>
                    <div className="text-gray-400 text-[10px]">Grimsby</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    {[1,2,3].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-[#0697A7] rounded-full"
                      />
                    ))}
                  </div>
                  <div className="text-center bg-black/40 p-3 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="text-3xl mb-1">🇱🇰</div>
                    <div className="text-white text-xs font-medium">Sri Lanka</div>
                    <div className="text-gray-400 text-[10px]">South Asia</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="relative p-8 rounded-2xl border border-[#0697A7]/20 bg-white/3 backdrop-blur-sm overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(ellipse at top left, rgba(6,151,167,0.05), transparent 60%)" }} />

              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Your Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#0697A7]/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#0697A7]/50 transition-all"
                  />
                </div>
              </div>

              <div className="relative mb-5">
                <label className="text-gray-400 text-sm mb-1.5 block">Service Needed</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0697A7]/50 transition-all appearance-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <option value="" className="bg-black">Select a service...</option>
                  <option value="website" className="bg-black">Custom Website Development</option>
                  <option value="ai" className="bg-black">AI-Powered Application</option>
                  <option value="mobile" className="bg-black">Mobile App Development</option>
                  <option value="ui" className="bg-black">UI/UX Design</option>
                  <option value="ecommerce" className="bg-black">E-Commerce Solution</option>
                  <option value="branding" className="bg-black">Branding & Design</option>
                  <option value="seo" className="bg-black">SEO & AEO Optimization</option>
                  <option value="saas" className="bg-black">SaaS Platform</option>
                  <option value="automation" className="bg-black">Automation Systems</option>
                  <option value="other" className="bg-black">Other</option>
                </select>
              </div>

              <div className="relative mb-6">
                <label className="text-gray-400 text-sm mb-1.5 block">Project Details</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#0697A7]/50 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,151,167,0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-black font-bold text-base transition-all"
                style={{ background: "linear-gradient(135deg, #0697A7, #0ea5e9)" }}
              >
                {sent ? (
                  <>
                    <CheckCircle size={18} /> Message Sent!
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
