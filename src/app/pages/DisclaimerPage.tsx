import { Link } from "react-router";
import { motion } from "motion/react";
import {
  AlertTriangle,
  ExternalLink,
  FileWarning,
  HandCoins,
  Info,
  MessageSquareQuote,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { brandKeywords, breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

const lastUpdated = "July 12, 2026";

const disclaimerSections = [
  {
    title: "General Information",
    icon: Info,
    content: [
      "The information provided on the AarasTech website is for general informational and educational purposes only. While we strive to keep all content accurate, complete, and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of any information, products, services, or related graphics contained on the website.",
      "Any reliance you place on information from this website is strictly at your own risk. AarasTech shall not be held liable for any loss or damage, including but not limited to indirect or consequential loss or damage, arising from the use of this website.",
    ],
  },
  {
    title: "Not Professional Advice",
    icon: FileWarning,
    content: [
      "Content on this website, including blog articles, resource guides, tutorials, and service descriptions, does not constitute professional advice. This includes but is not limited to legal, financial, tax, medical, career, or technical advice.",
      "Before making decisions based on information found on this website, you should consult a qualified professional who can consider your specific circumstances. AarasTech is a technology and digital services company and does not provide licensed professional advisory services outside its stated expertise.",
    ],
  },
  {
    title: "External Links",
    icon: ExternalLink,
    content: [
      "This website may contain links to external websites and resources that are not owned, operated, or controlled by AarasTech. We provide these links for convenience and informational purposes only.",
      "AarasTech has no control over the content, availability, privacy policies, or practices of external websites and does not endorse or accept responsibility for them. Inclusion of a link does not imply a recommendation or approval of the linked website's views, products, or services.",
      "We encourage you to review the terms and privacy policies of any external website you visit through links on this site.",
    ],
  },
  {
    title: "Advertising & Affiliate Disclosure",
    icon: HandCoins,
    content: [
      "This website may display advertisements served by third-party advertising networks, including Google AdSense. These advertisements may use cookies and similar technologies to serve ads based on your browsing activity on this and other websites.",
      "AarasTech may participate in affiliate programs and may receive commission or referral fees if you click on certain links and make a purchase or sign up for a service. This does not affect the price you pay or the editorial integrity of our content.",
      "All sponsored content and affiliate relationships will be clearly disclosed where applicable. Our editorial recommendations are based on genuine assessment and are not influenced by compensation.",
    ],
  },
  {
    title: "Testimonials & Results",
    icon: MessageSquareQuote,
    content: [
      "Testimonials, case studies, and success stories published on this website reflect the individual experiences of specific clients and users. These results are not guaranteed and may not be typical for every customer.",
      "Your results may vary depending on your business, market, effort, technical requirements, and other factors that are unique to your situation. Past performance does not guarantee future results.",
    ],
  },
  {
    title: "Content Accuracy & Updates",
    icon: AlertTriangle,
    content: [
      "Technology, tools, platforms, pricing, eligibility criteria, and best practices change frequently. While we make reasonable efforts to update our content, some information may become outdated between review cycles.",
      "Blog posts, guides, and resource pages display their publication or last-updated date where possible. We recommend verifying critical details — especially pricing, eligibility, and official program terms — directly with the official source before taking action.",
    ],
  },
  {
    title: "Limitation of Liability",
    icon: ShieldAlert,
    content: [
      "To the fullest extent permitted by applicable law, AarasTech and its directors, employees, partners, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your access to or use of this website.",
      "This limitation applies regardless of the legal theory on which the claim is based, including negligence, breach of contract, strict liability, or other tort, even if AarasTech has been advised of the possibility of such damages.",
    ],
  },
];

const disclaimerSchema = buildSchema([
  pageSchema({
    path: "/disclaimer",
    name: "Disclaimer - AarasTech",
    description:
      "Read the AarasTech disclaimer covering general information, external links, advertising disclosure, testimonials, content accuracy, and limitation of liability.",
    type: "WebPage",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Disclaimer", path: "/disclaimer" },
  ]),
]);

export function DisclaimerPage() {
  return (
    <div className="bg-black pt-20">
      <SEO
        title="Disclaimer | AarasTech"
        description="AarasTech disclaimer covering general information, professional advice, external links, advertising and affiliate disclosure, testimonials, content accuracy, and limitation of liability."
        canonicalUrl="https://aarastech.com/disclaimer"
        keywords={[
          ...brandKeywords,
          "AarasTech disclaimer",
          "AarasTech advertising disclosure",
          "AarasTech affiliate disclosure",
        ].join(", ")}
        schema={disclaimerSchema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-[#0697A7]/6 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/6 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0697A7]/30 bg-[#0697A7]/10 px-4 py-2 text-sm text-[#0697A7]">
              <Scale size={14} /> Legal
            </div>
            <h1
              className="mb-4 text-white"
              style={{
                fontFamily: "Space Grotesk",
                fontSize: "clamp(2.2rem,5vw,4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Disclaimer
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              This page explains the terms under which the information, content,
              and resources on the AarasTech website are provided.
            </p>
            <p className="mt-5 text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-5">
          {disclaimerSections.map((section, index) => (
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
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-gray-400"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0697A7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className="mt-8 rounded-2xl bg-[#030303] p-6 sm:p-8"
          style={{ border: "1px solid rgba(6,151,167,0.18)" }}
        >
          <h2
            className="mb-3 text-xl font-bold text-white"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Questions About This Disclaimer?
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-400">
            If you have any questions about this disclaimer, our advertising
            practices, or the information published on this website, please
            contact us.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0697A7] to-[#0ea5e9] px-5 py-3 text-sm font-bold text-black"
            >
              Contact AarasTech
            </Link>
            <Link
              to="/privacy-policy"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition-colors hover:text-[#0697A7]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
