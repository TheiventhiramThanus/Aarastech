import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { SEO } from "../components/SEO";
import { ArrowRight, BookOpen, Clock, Tag, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AEOAnswerSection } from "../components/AEOAnswerSection";
import { brandKeywords, breadcrumbSchema, buildSchema, faqSchema, pageSchema } from "../lib/seo";
import { blogPosts as fallbackBlogPosts } from "../data/blogPosts";

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content?: unknown; contentText?: string; author: string; authorRole?: string; date: string; category: string;
  readTime: string; status?: string; tag: string; color: string; image: string; featured?: boolean;
}

const staticPublishedPosts: BlogPost[] = fallbackBlogPosts.map((post) => ({
  ...post,
  id: String(post.id),
  status: "Published",
}));

function publishedPostsWithFallback(firebasePosts: BlogPost[]) {
  const bySlug = new Map<string, BlogPost>();
  staticPublishedPosts.forEach((post) => bySlug.set(post.slug, post));
  firebasePosts
    .filter((post) => !post.status || post.status === "Published")
    .forEach((post) => bySlug.set(post.slug, post));

  return Array.from(bySlug.values()).sort((a, b) => {
    const aTime = Date.parse(a.date);
    const bTime = Date.parse(b.date);
    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });
}

const blogAeoAnswers = [
  {
    question: "What topics does the AarasTech Blog cover?",
    answer: "The AarasTech Blog covers AI solutions, web development, UI/UX design, SEO, AEO, SaaS platforms, digital marketing, automation, and practical software company growth.",
  },
  {
    question: "Why is the AarasTech Blog useful for businesses?",
    answer: "It explains digital technology in practical language so businesses can understand what to build, how to rank online, how to use AI, and how to improve digital customer experiences.",
  },
  {
    question: "Does AarasTech publish AI and SEO insights?",
    answer: "Yes. AarasTech publishes insights about AI-powered web development, technical SEO, answer engine optimization, content strategy, and modern product engineering.",
  },
  {
    question: "Can the blog help AI systems understand AarasTech expertise?",
    answer: "Yes. The blog connects AarasTech with its core expertise areas: AI applications, web development, design, SEO, AEO, SaaS, e-commerce, cloud, and automation.",
  },
];

const blogSchema = buildSchema([
  pageSchema({
    path: "/blog",
    name: "AarasTech Blog - AI, Web Development, SEO, AEO and Design Insights",
    description: "Read AarasTech articles about AI, web development, UI/UX design, SEO, AEO, digital marketing, SaaS platforms, and business technology strategy.",
    type: "Blog",
  }),
  faqSchema(blogAeoAnswers),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]),
]);

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "blog_posts"), where("status", "==", "Published"));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        setPosts(publishedPostsWithFallback(data));
      } catch (e) {
        console.error("Error fetching blog posts:", e);
        setPosts(staticPublishedPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featured = posts.find(p => p.featured) ?? posts[0];
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
  const filtered = activeCategory === "All"
    ? posts.filter(p => p.id !== featured?.id)
    : posts.filter(p => p.category === activeCategory && p.id !== featured?.id);

  return (
    <div className="bg-black pt-20">
      <SEO 
        title="AarasTech Blog | AI, Web Development, SEO, AEO & Design"
        description="Read AarasTech articles on AI solutions, web development, UI/UX design, SEO, AEO, digital marketing, SaaS platforms, and software business strategy."
        canonicalUrl="https://aarastech.com/blog"
        keywords={[...brandKeywords, "AarasTech blog", "AI blog Sri Lanka", "web development blog", "SEO AEO insights"].join(", ")}
        schema={blogSchema}
      />
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0697A7]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(6,151,167,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(6,151,167,0.3) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
              <BookOpen size={13} /> Insights & Articles
            </div>
            <h1 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              The{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AarasTech Blog
              </span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
              Deep dives on AI, web development, design, and building digital businesses — straight from our team.
            </p>
          </motion.div>
        </div>
      </section>

      <AEOAnswerSection
        id="blog-ai-summary"
        eyebrow="AarasTech Insights"
        title="Answers From the"
        highlight="AarasTech Blog"
        summary="Short summaries that help readers and AI search systems understand what the AarasTech Blog teaches."
        answers={blogAeoAnswers}
      />

      {/* Featured Post */}
      <section className="pb-16 max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading featured post...</div>
        ) : featured ? (
          <Link to={`/blog/${featured.slug}`}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl overflow-hidden cursor-pointer grid md:grid-cols-2 gap-0"
              style={{ border: `1px solid ${featured.color}30`, background: `linear-gradient(135deg, ${featured.color}08, rgba(8,8,8,1))` }}>
              <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                <ImageWithFallback src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 md:to-black/30" />
              </div>
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-black" style={{ background: featured.color }}>
                    {featured.tag}
                  </span>
                  <span className="text-gray-500 text-xs flex items-center gap-1"><Clock size={11} /> {featured.readTime}</span>
                  <span className="text-gray-600 text-xs">{featured.date}</span>
                </div>
                <h2 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 700, lineHeight: 1.2 }}>
                  {featured.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: featured.color }}>
                  Read Article <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="text-center py-20 text-gray-500">No blog posts found.</div>
        )}
      </section>

      {/* Filter */}
      <section className="pb-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-2">
          <Tag size={15} className="text-gray-500 self-center mr-1" />
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: activeCategory === cat ? "linear-gradient(135deg,#0697A7,#7c3aed)" : "rgba(255,255,255,0.05)",
                color: activeCategory === cat ? "#000" : "#9ca3af",
                border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? null : filtered.map((post, i) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-[#080808] group cursor-pointer h-full overflow-hidden flex flex-col"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="h-40 overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={post.image} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: post.color + "15", color: post.color }}>
                      {post.tag}
                    </span>
                    <span className="text-gray-600 text-xs flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-white text-sm font-semibold mb-2 leading-snug group-hover:text-[#0697A7] transition-colors"
                    style={{ fontFamily: "Space Grotesk" }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-gray-600 text-xs">{post.date}</span>
                    <div className="flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: post.color }}>
                      Read <ChevronRight size={12} />
                    </div>
                  </div>
                  <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: `linear-gradient(90deg,${post.color},transparent)` }} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(6,151,167,0.04),rgba(124,58,237,0.04))" }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a855f7] text-sm mb-6">
              <BookOpen size={13} /> Stay Updated
            </div>
            <h2 className="text-white mb-3" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700 }}>
              Get Insights Delivered
            </h2>
            <p className="text-gray-400 mb-8">Weekly articles on AI, development, and building digital businesses. No spam — ever.</p>
            {subscribed ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-[#10b981] font-semibold">
                <span className="w-6 h-6 rounded-full bg-[#10b981]/20 flex items-center justify-center text-xs">✓</span>
                You're subscribed! Welcome aboard.
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex gap-2">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  className="flex-1 px-4 py-3 rounded-xl bg-[#080808] text-white text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.target.style.borderColor = "#0697A7")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <motion.button type="submit"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(6,151,167,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl text-black font-bold text-sm cursor-pointer"
                  style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
                  Subscribe
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-white mb-4" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 700 }}>
              Ready to Build{" "}
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Something Great?
              </span>
            </h2>
            <p className="text-gray-400 mb-8">Let's turn your idea into a world-class digital product.</p>
            <Link to="/contact">
              <motion.span whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,151,167,0.5)" }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-black font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
                Get Free Consultation <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
