import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const latestPosts = [...blogPosts]
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .slice(0, 6);

export function BlogSection() {
  return (
    <section className="bg-[#030303] py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#0697A7]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#7c3aed]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0697A7]/30 bg-[#0697A7]/10 px-4 py-2 text-sm text-[#0697A7]">
              <BookOpen size={13} /> Latest Guides
            </div>
            <h2
              className="mb-3 text-white"
              style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}
            >
              Learn AI, Web, SEO and Student Growth
            </h2>
            <p className="max-w-2xl leading-relaxed text-gray-400">
              Practical AarasTech articles built around real search topics: free courses, student tools, AI workflows, portfolio building, SEO, and business technology.
            </p>
          </div>
          <Link to="/blog">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="ui-action inline-flex items-center gap-2 rounded-xl border border-[#0697A7]/40 px-6 py-3 text-sm font-semibold text-[#0697A7] transition hover:bg-[#0697A7]/10"
            >
              View Blog <ArrowRight size={15} />
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block h-full">
              <motion.article
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.07 }}
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[#080808]"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/30 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-xs font-bold text-black" style={{ background: post.color }}>
                    {post.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mb-3 text-base font-semibold leading-snug text-white transition-colors group-hover:text-[#0697A7]" style={{ fontFamily: "Space Grotesk" }}>
                    {post.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold" style={{ color: post.color }}>
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
