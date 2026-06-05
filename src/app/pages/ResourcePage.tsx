import { Link, Navigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, Clock, ExternalLink, User } from "lucide-react";
import { SEO } from "../components/SEO";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getResourcePage, resourcePages } from "../data/resourcePages";
import { articleSchema, breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

export function ResourcePage() {
  const { slug } = useParams<{ slug: string }>();
  const resource = slug ? getResourcePage(slug) : undefined;

  if (!resource) return <Navigate to="/resources" replace />;

  const related = resourcePages
    .filter((item) => item.slug !== resource.slug && item.category === resource.category)
    .slice(0, 3);
  const fallback = resourcePages.filter((item) => item.slug !== resource.slug).slice(0, 3);
  const suggestions = related.length ? related : fallback;

  const schema = buildSchema([
    pageSchema({
      path: `/resources/${resource.slug}`,
      name: `${resource.title} | AarasTech Resources`,
      description: resource.excerpt,
      type: "Article",
    }),
    articleSchema({
      path: `/resources/${resource.slug}`,
      title: resource.title,
      description: resource.excerpt,
      image: resource.image,
      datePublished: resource.date,
      author: "AarasTech",
      keywords: resource.keywords.join(", "),
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources" },
      { name: resource.title, path: `/resources/${resource.slug}` },
    ]),
  ]);

  return (
    <div className="bg-black pt-20">
      <SEO
        title={`${resource.title} | AarasTech Resources`}
        description={resource.excerpt}
        canonicalUrl={`https://aarastech.com/resources/${resource.slug}`}
        ogImage={resource.image}
        ogType="article"
        keywords={resource.keywords.join(", ")}
        author="AarasTech"
        schema={schema}
      />

      <section className="relative overflow-hidden pt-16 pb-12">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-[560px] w-[560px] rounded-full opacity-20 blur-3xl" style={{ background: resource.color }} />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(6,151,167,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(6,151,167,0.3) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Link to="/resources" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#0697A7]">
            <ArrowLeft size={14} /> Back to resources
          </Link>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-bold text-black" style={{ background: resource.color }}>
                {resource.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={11} /> {resource.readTime}</span>
              <span className="flex items-center gap-1 text-xs text-gray-500"><User size={11} /> {resource.audience}</span>
            </div>
            <h1 className="mb-5 text-white" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4.5vw,3.8rem)", fontWeight: 800, lineHeight: 1.12 }}>
              {resource.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-gray-400">{resource.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-14">
        <div className="overflow-hidden rounded-3xl" style={{ border: `1px solid ${resource.color}30` }}>
          <ImageWithFallback src={resource.image} alt={resource.title} className="h-[260px] w-full object-cover opacity-70 md:h-[420px]" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <article className="space-y-8">
          <div className="rounded-2xl bg-[#080808] p-6" style={{ border: `1px solid ${resource.color}30` }}>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: resource.color }}>
              <BookOpen size={15} /> Quick Answer
            </div>
            <p className="text-sm leading-relaxed text-gray-300">{resource.quickAnswer}</p>
          </div>

          {resource.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-4 text-2xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>
                {section.heading}
              </h2>
              <p className="leading-[1.85] text-gray-300">{section.body}</p>
              {section.bullets && (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: resource.color }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="rounded-2xl bg-[#080808] p-6" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-4 text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Official Links</h2>
            <div className="space-y-3">
              {resource.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#0697A7]/40"
                >
                  <span>
                    <span className="block text-sm font-semibold text-white">{link.label}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-500">{link.note}</span>
                  </span>
                  <ExternalLink size={15} className="mt-0.5 flex-shrink-0 text-gray-500" />
                </a>
              ))}
            </div>
          </section>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-2xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Related resources</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {suggestions.map((item) => (
            <Link key={item.slug} to={`/resources/${item.slug}`} className="rounded-2xl bg-[#080808] p-5 transition-transform hover:-translate-y-1" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="mb-3 text-xs font-semibold" style={{ color: item.color }}>{item.category}</div>
              <h3 className="mb-2 text-sm font-semibold leading-snug text-white" style={{ fontFamily: "Space Grotesk" }}>{item.title}</h3>
              <p className="mb-4 text-xs leading-relaxed text-gray-500">{item.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: item.color }}>
                Read <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
