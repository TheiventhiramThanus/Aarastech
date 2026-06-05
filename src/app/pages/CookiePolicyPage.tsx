import { Link } from "react-router";
import { motion } from "motion/react";
import { Cookie, Settings, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { brandKeywords, breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

const cookieSchema = buildSchema([
  pageSchema({
    path: "/cookie-policy",
    name: "Cookie Policy - AarasTech",
    description: "Read how AarasTech may use cookies, analytics, advertising technologies, and browser choices.",
    type: "WebPage",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Cookie Policy", path: "/cookie-policy" },
  ]),
]);

const cookieRows = [
  { type: "Essential cookies", purpose: "Help the website load, route pages, remember basic preferences, and protect forms from misuse." },
  { type: "Analytics cookies", purpose: "Help us understand traffic, popular pages, device types, and how visitors use the website." },
  { type: "Advertising cookies", purpose: "May be used by Google or other ad partners to serve, measure, and personalize ads where enabled and permitted." },
];

export function CookiePolicyPage() {
  return (
    <div className="bg-black pt-20">
      <SEO
        title="Cookie Policy | AarasTech"
        description="AarasTech cookie policy covering essential cookies, analytics cookies, advertising cookies, and user browser choices."
        canonicalUrl="https://aarastech.com/cookie-policy"
        keywords={[...brandKeywords, "AarasTech cookie policy", "AarasTech advertising cookies"].join(", ")}
        schema={cookieSchema}
      />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-[#0697A7]/6 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/6 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0697A7]/30 bg-[#0697A7]/10 px-4 py-2 text-sm text-[#0697A7]">
              <Cookie size={14} /> Legal
            </div>
            <h1 className="mb-4 text-white" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              Cookie Policy
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              This page explains how cookies and similar technologies may be used on the AarasTech website.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {cookieRows.map((row, index) => (
            <motion.article
              key={row.type}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl bg-[#080808] p-6"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0697A7]/15 text-[#0697A7]">
                {index === 0 ? <ShieldCheck size={20} /> : index === 1 ? <Settings size={20} /> : <Cookie size={20} />}
              </div>
              <h2 className="mb-3 text-lg font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>{row.type}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{row.purpose}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-[#080808] p-6 sm:p-8" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 className="mb-3 text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Managing Cookies</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            You can control or delete cookies through your browser settings. You can also opt out of personalized Google advertising through Google Ads Settings. For more detail about data collection, advertising disclosures, and user choices, read our Privacy Policy.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/privacy-policy" className="rounded-xl bg-gradient-to-r from-[#0697A7] to-[#0ea5e9] px-5 py-3 text-sm font-bold text-black">
              Privacy Policy
            </Link>
            <Link to="/contact" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition-colors hover:text-[#0697A7]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
