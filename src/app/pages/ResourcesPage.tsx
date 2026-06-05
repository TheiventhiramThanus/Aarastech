import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { SEO } from "../components/SEO";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { resourcePages } from "../data/resourcePages";
import { BRAND_NAME, SITE_URL, breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

const resourcesSchema = buildSchema([
  pageSchema({
    path: "/resources",
    name: "AarasTech Resources - Free Courses, Student Tools, Internships and AI Guides",
    description: "Browse AarasTech resource guides for free certificate courses, AI tools, student benefits, internship websites, portfolio building, and learning roadmaps.",
    type: "CollectionPage",
  }),
  {
    "@type": "ItemList",
    "@id": `${SITE_URL}/resources#resource-list`,
    "name": `${BRAND_NAME} resource guides`,
    "itemListElement": resourcePages.map((resource, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${SITE_URL}/resources/${resource.slug}`,
      "name": resource.title,
    })),
  },
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
  ]),
]);

export function ResourcesPage() {
  return (
    <div className="bg-black pt-20">
      <SEO
        title="Free Courses, Student Tools & Internship Resources | AarasTech"
        description="Explore AarasTech resource guides for free certificate courses, AI tools, student benefits, internship websites in Sri Lanka, portfolio building, and learning roadmaps."
        canonicalUrl="https://aarastech.com/resources"
        keywords="free certificate courses 2026, free AI courses, internship websites Sri Lanka, student tools, portfolio website guide, GitHub Student Developer Pack"
        schema={resourcesSchema}
      />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[#0697A7]/8 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[520px] w-[520px] rounded-full bg-[#7c3aed]/8 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0697A7]/30 bg-[#0697A7]/10 px-4 py-2 text-sm text-[#0697A7]">
              <BookOpen size={14} /> Resource Library
            </div>
            <h1 className="mb-5 text-white" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              Free Courses, Student Tools & Career Resources
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400">
              Search-focused, practical guides for students and beginners looking for certificates, AI tools, internships, portfolio ideas, and trusted official learning links.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <Search size={15} className="text-[#0697A7]" />
          {["Certificates", "AI Courses", "Student Benefits", "Careers", "Portfolio", "Design Tools"].map((category) => (
            <span key={category} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
              {category}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resourcePages.map((resource, index) => (
            <Link key={resource.slug} to={`/resources/${resource.slug}`} className="block h-full">
              <motion.article
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.06 }}
                whileHover={{ y: -4 }}
                className="group h-full overflow-hidden rounded-2xl bg-[#080808]"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="relative h-36 overflow-hidden">
                  <ImageWithFallback src={resource.image} alt={resource.title} className="h-full w-full object-cover opacity-45 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/30 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-xs font-bold text-black" style={{ background: resource.color }}>
                    {resource.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Clock size={11} /> {resource.readTime}</span>
                    <span>{resource.audience}</span>
                  </div>
                  <h2 className="mb-3 text-base font-semibold leading-snug text-white transition-colors group-hover:text-[#0697A7]" style={{ fontFamily: "Space Grotesk" }}>
                    {resource.title}
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{resource.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: resource.color }}>
                    Read guide <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
