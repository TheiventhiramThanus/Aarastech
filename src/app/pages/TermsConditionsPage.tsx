import { Link } from "react-router";
import { motion } from "motion/react";
import { AlertTriangle, CheckCircle, CreditCard, FileText, Scale, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { brandKeywords, breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

const lastUpdated = "June 5, 2026";

const termsSections = [
  {
    title: "Use of Our Website",
    icon: CheckCircle,
    content: [
      "You may browse the AarasTech website for lawful, personal, and business purposes.",
      "You must not misuse the website, attempt unauthorized access, interfere with security, or use the website in a way that damages AarasTech or other users.",
    ],
  },
  {
    title: "Services and Proposals",
    icon: FileText,
    content: [
      "Website content describes our services in general terms. Specific project scope, deliverables, timelines, pricing, and responsibilities are confirmed in a written proposal, quote, invoice, or service agreement.",
      "Submitting a contact form does not create a client relationship until both parties agree to the project terms.",
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    content: [
      "Payment schedules, deposits, milestones, and refund terms are agreed separately for each project.",
      "Late payments may delay delivery, handover, hosting, maintenance, or support services.",
    ],
  },
  {
    title: "Intellectual Property",
    icon: ShieldCheck,
    content: [
      "AarasTech owns the website content, brand assets, design elements, code samples, and materials published on this website unless stated otherwise.",
      "Client project ownership, licensing, third-party assets, and reusable components are handled according to the agreed project contract.",
    ],
  },
  {
    title: "Limitations",
    icon: AlertTriangle,
    content: [
      "We aim to keep website information accurate, but we do not guarantee that every page is always complete, current, or error-free.",
      "AarasTech is not liable for indirect, incidental, or consequential losses arising from website use, service inquiries, external links, third-party tools, or temporary website unavailability.",
    ],
  },
  {
    title: "Changes to Terms",
    icon: Scale,
    content: [
      "We may update these terms when our services, website, legal requirements, or business practices change.",
      "The updated version will be published on this page with a revised last-updated date.",
    ],
  },
];

const termsSchema = buildSchema([
  pageSchema({
    path: "/terms-and-conditions",
    name: "Terms and Conditions - AarasTech",
    description: "Read the AarasTech terms and conditions for website use, services, payments, intellectual property, limitations, and updates.",
    type: "WebPage",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms and Conditions", path: "/terms-and-conditions" },
  ]),
]);

export function TermsConditionsPage() {
  return (
    <div className="bg-black pt-20">
      <SEO
        title="Terms & Conditions | AarasTech"
        description="AarasTech terms and conditions covering website use, service proposals, payments, intellectual property, limitations, and updates."
        canonicalUrl="https://aarastech.com/terms-and-conditions"
        keywords={[...brandKeywords, "AarasTech terms", "AarasTech terms and conditions", "AarasTech service terms"].join(", ")}
        schema={termsSchema}
      />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-[#0697A7]/6 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/6 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0697A7]/30 bg-[#0697A7]/10 px-4 py-2 text-sm text-[#0697A7]">
              <Scale size={14} /> Legal
            </div>
            <h1 className="mb-4 text-white" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              Terms & Conditions
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              These terms explain the rules for using the AarasTech website and the general conditions that apply before a separate project agreement is signed.
            </p>
            <p className="mt-5 text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-5">
          {termsSections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl bg-[#080808] p-6 sm:p-8"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0697A7]/15 text-[#0697A7]">
                  <section.icon size={20} />
                </div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0697A7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-[#030303] p-6 sm:p-8" style={{ border: "1px solid rgba(6,151,167,0.18)" }}>
          <h2 className="mb-3 text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Questions About These Terms?</h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-400">
            Contact us before starting a project if you need clarification about website use, proposals, payment terms, or project agreements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0697A7] to-[#0ea5e9] px-5 py-3 text-sm font-bold text-black"
          >
            Contact AarasTech
          </Link>
        </div>
      </section>
    </div>
  );
}
