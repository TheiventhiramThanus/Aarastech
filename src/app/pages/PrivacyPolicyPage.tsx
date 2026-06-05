import { Link } from "react-router";
import { motion } from "motion/react";
import { Cookie, Database, Lock, Mail, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { brandKeywords, breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

const lastUpdated = "June 5, 2026";

const privacySections = [
  {
    title: "Information We Collect",
    icon: Database,
    content: [
      "Contact details you submit, including your name, email address, phone number, company name, service interest, and project message.",
      "Technical and usage information such as browser type, pages visited, referring pages, approximate location, device type, and interaction data.",
      "Communications you send through forms, email, WhatsApp, phone, or social media channels.",
    ],
  },
  {
    title: "How We Use Information",
    icon: ShieldCheck,
    content: [
      "To respond to project inquiries, prepare proposals, deliver services, and provide customer support.",
      "To improve website performance, user experience, security, content quality, and marketing effectiveness.",
      "To meet legal, accounting, security, fraud-prevention, and business administration requirements.",
    ],
  },
  {
    title: "Cookies, Analytics, and Advertising",
    icon: Cookie,
    content: [
      "We may use cookies, local storage, analytics tools, and similar technologies to understand website usage and improve our services.",
      "If Google AdSense or other advertising networks are enabled, third-party vendors, including Google, may use cookies to serve ads based on previous visits to this website or other websites.",
      "Google's advertising cookies enable Google and its partners to serve ads based on visits to this website and other websites. Users can opt out of personalized advertising through Google Ads Settings.",
      "Other third-party vendors or ad networks may also use cookies for personalized advertising where permitted by law.",
    ],
  },
  {
    title: "Data Sharing",
    icon: Lock,
    content: [
      "We do not sell personal information. We may share limited information with service providers that help us host the website, manage forms, provide analytics, communicate with clients, or deliver agreed services.",
      "We may disclose information where required by law, to protect our rights, to prevent misuse, or as part of a business transfer such as a merger or acquisition.",
    ],
  },
  {
    title: "Your Choices",
    icon: Mail,
    content: [
      "You can request access, correction, deletion, or restriction of your personal information by contacting us.",
      "You can disable cookies in your browser settings, though some website features may not work as expected.",
      "You can opt out of personalized Google advertising through Ads Settings or learn more about advertising choices at aboutads.info.",
    ],
  },
];

const privacySchema = buildSchema([
  pageSchema({
    path: "/privacy-policy",
    name: "Privacy Policy - AarasTech",
    description: "Read the AarasTech privacy policy, including contact data, cookies, analytics, advertising disclosures, and user choices.",
    type: "WebPage",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ]),
]);

export function PrivacyPolicyPage() {
  return (
    <div className="bg-black pt-20">
      <SEO
        title="Privacy Policy | AarasTech"
        description="AarasTech privacy policy covering contact information, cookies, analytics, advertising disclosures, data sharing, and user choices."
        canonicalUrl="https://aarastech.com/privacy-policy"
        keywords={[...brandKeywords, "AarasTech privacy policy", "AarasTech cookies", "AarasTech data policy"].join(", ")}
        schema={privacySchema}
      />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-[#0697A7]/6 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/6 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0697A7]/30 bg-[#0697A7]/10 px-4 py-2 text-sm text-[#0697A7]">
              <ShieldCheck size={14} /> Legal
            </div>
            <h1 className="mb-4 text-white" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              This policy explains how AarasTech collects, uses, protects, and discloses information when you use our website or contact us about our services.
            </p>
            <p className="mt-5 text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-5">
          {privacySections.map((section, index) => (
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
          <h2 className="mb-3 text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Contact Us</h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-400">
            For privacy questions or requests, contact AarasTech at info@aarastech.com or use our contact page.
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
