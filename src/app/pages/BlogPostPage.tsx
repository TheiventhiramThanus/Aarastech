import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO } from "../components/SEO";
import { AdBanner } from "../components/AdManager";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { articleSchema as createArticleSchema, breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; contentText?: string; content?: any; author: string; authorRole?: string; date: string; category: string;
  readTime: string; status: string; tag: string; color: string; image: string; featured?: boolean;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      try {
        const q = query(collection(db, "blog_posts"), where("status", "==", "Published"));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        setAllPosts(data);
        const currentPost = data.find(p => p.slug === slug);
        setPost(currentPost || null);
      } catch (e) {
        console.error("Error fetching post:", e);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchPostAndRelated();
    }
  }, [slug]);

  if (loading) {
    return <div className="bg-black min-h-screen pt-20 flex items-center justify-center text-gray-500">Loading post...</div>;
  }

  if (!post) return <Navigate to="/blog" replace />;

  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const fallback = allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const suggestions = related.length >= 2 ? related : fallback;

  const postSchema = buildSchema([
    pageSchema({
      path: `/blog/${post.slug}`,
      name: `${post.title} | AarasTech Blog`,
      description: post.excerpt,
      type: "Article",
    }),
    createArticleSchema({
      path: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.date,
      author: post.author,
      keywords: `${post.category}, ${post.tag}, AarasTech, AI, web development, SEO, AEO`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]);

  return (
    <div className="bg-black pt-20">
      <SEO
        title={`${post.title} | AarasTech Blog`}
        description={post.excerpt}
        canonicalUrl={`https://aarastech.com/blog/${post.slug}`}
        ogImage={post.image}
        ogType="article"
        keywords={`${post.category}, ${post.tag}, AarasTech, blog`}
        author={post.author}
        schema={postSchema}
      />
      {/* Hero */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{ background: post.color }}
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,151,167,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(6,151,167,0.3) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0697A7] text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to all articles
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-black"
                style={{ background: post.color }}
              >
                {post.tag}
              </span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock size={11} /> {post.readTime}
              </span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Calendar size={11} /> {post.date}
              </span>
            </div>
            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "Space Grotesk",
                fontSize: "clamp(2rem,4.5vw,3.5rem)",
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              {post.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-black font-bold"
                style={{ background: `linear-gradient(135deg,${post.color},#7c3aed)` }}
              >
                <User size={18} />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{post.author}</div>
                <div className="text-gray-500 text-xs">{post.authorRole}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ border: `1px solid ${post.color}30` }}
        >
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-[280px] md:h-[460px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* Quick Answer */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-[#080808] p-6"
          style={{ border: `1px solid ${post.color}30` }}
        >
          <h2 className="text-white text-base font-semibold mb-2" style={{ fontFamily: "Space Grotesk" }}>
            Quick answer: {post.title}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
        </motion.article>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {(() => {
            const content = post.contentText || post.content;
            if (Array.isArray(content)) {
              return content.map((block, i) => (
                <div key={i}>
                  {block.heading && (
                    <h2
                      className="text-white mt-4 mb-4"
                      style={{
                        fontFamily: "Space Grotesk",
                        fontSize: "clamp(1.3rem,2.2vw,1.7rem)",
                        fontWeight: 700,
                      }}
                    >
                      {block.heading}
                    </h2>
                  )}
                  <p className="text-gray-300 leading-[1.85] text-base">{block.body}</p>
                </div>
              ));
            } else if (typeof content === "string") {
              return content.split('\n').map((paragraph, i) => paragraph.trim() ? (
                <p key={i} className="text-gray-300 leading-[1.85] text-base mb-4">{paragraph}</p>
              ) : <br key={i} />);
            }
            return null;
          })()}

          {/* Divider */}
          <div
            className="my-12 h-px w-full"
            style={{ background: `linear-gradient(90deg,transparent,${post.color}40,transparent)` }}
          />

          {/* Author card */}
          <div
            className="p-6 rounded-2xl flex items-start gap-4"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: `linear-gradient(135deg,${post.color}08,rgba(8,8,8,1))`,
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg,${post.color},#7c3aed)` }}
            >
              <User size={20} />
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Written by {post.author}</div>
              <div className="text-gray-500 text-xs mb-2">{post.authorRole} at AarasTech</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sharing hard-won lessons from the front line of building modern digital products. Reach out
                via the contact page — we love a good conversation.
              </p>
            </div>
          </div>
        </motion.article>
        
        {/* Blog sidebar (inline) ad */}
        <div className="mt-12">
          <AdBanner position="Blog sidebar" />
        </div>
      </section>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h3
          className="text-white mb-8"
          style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 700 }}
        >
          Keep reading
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {suggestions.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-[#080808] h-full group"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="rounded-xl overflow-hidden mb-4 h-32">
                  <ImageWithFallback
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: p.color + "15", color: p.color }}
                  >
                    {p.tag}
                  </span>
                  <span className="text-gray-600 text-xs flex items-center gap-1">
                    <Clock size={10} /> {p.readTime}
                  </span>
                </div>
                <h4
                  className="text-white text-sm font-semibold mb-2 group-hover:text-[#0697A7] transition-colors"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {p.title}
                </h4>
                <div className="flex items-center gap-1 text-xs font-medium" style={{ color: p.color }}>
                  Read <ChevronRight size={12} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 700 }}
            >
              Got a project in mind?{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#0697A7,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Let's build it.
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              From idea to launch — we partner with founders who want to ship something special.
            </p>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,151,167,0.5)" }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-black font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}
              >
                Start a Conversation <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
