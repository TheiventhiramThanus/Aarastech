import { useState } from "react";
import { motion } from "motion/react";
import { SEO } from "../components/SEO";
import { Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, Phone, Globe } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { brandKeywords, breadcrumbSchema, buildSchema, faqSchema, pageSchema, serviceKeywords } from "../lib/seo";

const faqs = [
  { q: "How long does a typical project take?", a: "Most websites are delivered in 2–4 weeks. Mobile apps and complex SaaS platforms typically take 6–12 weeks. We always agree a clear timeline upfront." },
  { q: "Do you work with international clients?", a: "Absolutely. We work with clients across the UK, EU, USA, and beyond. Our team spans UK and Sri Lanka time zones, so we always have coverage." },
  { q: "What is included in post-launch support?", a: "Every project includes 30 days of free post-launch support. We also offer ongoing maintenance retainers for bug fixes, updates, and feature additions." },
  { q: "How do you handle project pricing?", a: "We offer both fixed-price and time-and-materials models. You'll always receive a detailed quote with no hidden costs before work begins." },
  { q: "Can you work with our existing codebase?", a: "Yes — whether you need a full rebuild or want us to extend an existing product, our engineers can audit and integrate with your current stack." },
];

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "info@aarastech.com", color: "#0697A7" },
  { icon: Phone, label: "Call Us", value: "+44 7438 603306", color: "#7c3aed" },
  { icon: MapPin, label: "Location", value: "London, UK & Colombo, LK", color: "#10b981" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "#ec4899" },
];

const services = [
  "Custom Website Development",
  "AI-Powered Application",
  "Mobile App Development",
  "UI/UX Design",
  "E-Commerce Solution",
  "SaaS Platform",
  "Branding & Design",
  "SEO & AEO Optimization",
  "Other",
];

const contactAeoAnswers = [
  {
    question: "How can I contact AarasTech?",
    answer: "You can contact AarasTech through the contact form, email info@aarastech.com, phone +44 7438 603306, or WhatsApp +94 7529 20381 for project inquiries.",
  },
  {
    question: "Does AarasTech work with Sri Lanka and UK clients?",
    answer: "Yes. AarasTech works with clients in Sri Lanka, Jaffna, the UK, Grimsby, and international remote markets.",
  },
  {
    question: "What services can I request from AarasTech?",
    answer: "You can request web development, AI solutions, mobile apps, UI/UX design, e-commerce, SaaS platforms, SEO, AEO, digital marketing, branding, cloud, and automation services.",
  },
  {
    question: "How fast does AarasTech reply?",
    answer: "AarasTech typically replies within 24 hours with next steps, project questions, and a consultation path.",
  },
];

const contactSchema = buildSchema([
  pageSchema({
    path: "/contact",
    name: "Contact AarasTech - Hire Web, AI, SEO and AEO Developers",
    description: "Contact AarasTech for AI solutions, web development, mobile apps, UI/UX design, SEO, AEO, SaaS, e-commerce, cloud, and automation projects in Sri Lanka, Jaffna, the UK, and global markets.",
    type: "ContactPage",
  }),
  faqSchema([
    ...faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
    ...contactAeoAnswers,
  ]),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]),
]);

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contact_messages"), {
        ...form,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#080808] text-white text-sm outline-none transition-all placeholder:text-gray-600";
  const inputStyle = { border: "1px solid rgba(255,255,255,0.1)" };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#0697A7";
    e.target.style.boxShadow = "0 0 0 3px rgba(6,151,167,0.1)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.1)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="bg-black pt-20">
      <SEO 
        title="Contact AarasTech | Web, AI, SEO & AEO Developers"
        description="Contact AarasTech for AI solutions, web development, mobile apps, UI/UX design, SEO, AEO, SaaS, e-commerce, cloud, and automation projects in Sri Lanka, Jaffna, the UK, and global markets."
        canonicalUrl="https://aarastech.com/contact"
        keywords={[...brandKeywords, ...serviceKeywords, "contact AarasTech", "hire AarasTech", "AarasTech Jaffna", "AarasTech UK"].join(", ")}
        schema={contactSchema}
      />
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0697A7]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(6,151,167,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(6,151,167,0.3) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
              <MessageSquare size={13} /> Get In Touch
            </div>
            <h1 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              Let's Build Your{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Next Big Thing
              </span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
              Tell us about your project and get a free consultation and estimate within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactInfo.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04 }}
              className="p-5 rounded-2xl bg-[#080808] text-center"
              style={{ border: `1px solid ${c.color}20` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: c.color + "18" }}>
                <c.icon size={18} style={{ color: c.color }} />
              </div>
              <div className="text-gray-500 text-xs mb-1">{c.label}</div>
              <div className="text-white text-xs font-medium">{c.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 p-8 rounded-2xl bg-[#080808]"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/15 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-[#10b981]" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "Space Grotesk" }}>Message Sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs">Thanks for reaching out. We'll review your project and get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-white font-bold mb-1" style={{ fontFamily: "Space Grotesk", fontSize: "1.3rem" }}>Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-6">Fill in the details below and we'll be in touch shortly.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Full Name *</label>
                      <input required className={inputClass} style={inputStyle}
                        placeholder="John Smith" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Email Address *</label>
                      <input required type="email" className={inputClass} style={inputStyle}
                        placeholder="john@company.com" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Phone Number *</label>
                      <input required type="tel" className={inputClass} style={inputStyle}
                        placeholder="+1 555 123 4567" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                  </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Company / Brand</label>
                      <input className={inputClass} style={inputStyle}
                        placeholder="Your company name" value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur} />
                    </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Service Needed</label>
                      <select className={inputClass} style={{ ...inputStyle, background: "#080808", appearance: "none" }}
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur}>
                        <option value="">Select a service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Project Details *</label>
                    <textarea required rows={5} className={inputClass} style={{ ...inputStyle, resize: "none" }}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <motion.button type="submit" disabled={isSubmitting}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,151,167,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl text-black font-bold flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                    style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
                    <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-5">
            {/* Response promise */}
            <div className="p-6 rounded-2xl bg-[#080808]" style={{ border: "1px solid rgba(6,151,167,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#10b981] text-sm font-semibold">Currently Accepting Projects</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">We're open for new engagements. Typical first response within 24 hours.</p>
            </div>

            {/* Offices */}
            <div className="p-6 rounded-2xl bg-[#080808]" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: "Space Grotesk" }}>
                <Globe size={15} className="text-[#7c3aed]" /> Our Regions
              </h3>
              <div className="space-y-4">
                {[
                  { city: "London, UK", detail: "Mon–Fri, 9am–6pm GMT", color: "#0697A7" },
                  { city: "Colombo, Sri Lanka", detail: "Mon–Sat, 9am–7pm IST", color: "#7c3aed" },
                ].map((loc, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: loc.color }} />
                    <div>
                      <div className="text-white text-sm font-medium">{loc.city}</div>
                      <div className="text-gray-500 text-xs">{loc.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#030303]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700 }}>
              Frequently Asked{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Questions
              </span>
            </h2>
            <p className="text-gray-400">Everything you need to know before getting started.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-xl overflow-hidden bg-[#080808]"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer">
                  <span className="text-white text-sm font-medium" style={{ fontFamily: "Space Grotesk" }}>{faq.q}</span>
                  <span className="text-[#0697A7] flex-shrink-0 text-lg transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} className="px-6 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
