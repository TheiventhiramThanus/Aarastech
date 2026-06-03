import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const posts = [
  {
    category: "AI & Technology",
    title: "How AI is Revolutionizing Web Development in 2025",
    excerpt: "Explore how artificial intelligence is transforming the way we build, test, and optimize web applications for modern businesses.",
    date: "May 2025",
    readTime: "5 min",
    color: "#0697A7",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ciUyMGhlYWRzZXQlMjBkYXJrfGVufDF8fHx8MTc3OTg5NjcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    category: "UI/UX Design",
    title: "The Future of Glassmorphism and Holographic Interfaces",
    excerpt: "Deep dive into the next evolution of UI design trends — from glassmorphism to neomorphism and holographic design systems.",
    date: "April 2025",
    readTime: "7 min",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1694365899936-850bc6c2b0f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMHVpJTIwZ2xhc3Ntb3JwaGlzbXxlbnwxfHx8fDE3Nzk4OTY4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    category: "Mobile Development",
    title: "React Native vs Flutter: Which to Choose in 2025",
    excerpt: "A comprehensive comparison of the two leading cross-platform mobile frameworks to help you make the right choice.",
    date: "March 2025",
    readTime: "8 min",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1734597949889-f8e2ec87c8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBibHVlJTIwcHVycGxlfGVufDF8fHx8MTc3OTg5NjgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    category: "SaaS & Cloud",
    title: "Building Scalable SaaS Products on AWS — A Blueprint",
    excerpt: "Step-by-step guide to architecting, deploying, and scaling SaaS applications using modern AWS infrastructure.",
    date: "February 2025",
    readTime: "10 min",
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHNlcnZlciUyMGRhcmt8ZW58MXx8fHwxNzc5ODk2ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    category: "Digital Marketing",
    title: "SEO Strategies That Actually Work for Tech Startups",
    excerpt: "Actionable SEO tactics specifically designed for tech companies looking to dominate search rankings and drive organic growth.",
    date: "January 2025",
    readTime: "6 min",
    color: "#ec4899",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzJTIwZGFya3xlbnwxfHx8fDE3Nzk4OTY4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    category: "Security",
    title: "Zero Trust Architecture: The New Standard for Security",
    excerpt: "Why traditional perimeter security is failing and how to implement a Zero Trust model in your organization.",
    date: "December 2024",
    readTime: "9 min",
    color: "#06b6d4",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbG9ja3xlbnwxfHx8fDE3Nzk4OTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="relative bg-black py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#7c3aed]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#0697A7]/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a855f7] text-sm mb-6">
            <BookOpen size={14} /> Insights & Blog
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Latest{" "}
            <span style={{ background: "linear-gradient(135deg, #0697A7, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Insights
            </span>{" "}
            & Ideas
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Stay updated with the latest in tech, design, AI, and digital innovation from our team of experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group rounded-2xl border border-white/10 overflow-hidden cursor-pointer bg-[#080808] transition-all duration-300 hover:border-white/20"
            >
              {/* Thumbnail */}
              <div
                className={`h-40 relative overflow-hidden`}
                style={{ borderBottom: `1px solid ${post.color}20` }}
              >
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div
                  className="absolute top-4 left-4 px-2 py-0.5 rounded-full text-xs font-medium text-black z-10"
                  style={{ background: post.color }}
                >
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-white font-semibold text-base mb-3 leading-snug group-hover:text-[#0697A7] transition-colors line-clamp-2"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                    <span className="flex items-center gap-1"><Tag size={11} /> {post.date}</span>
                  </div>
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-1 text-[#0697A7] font-medium"
                  >
                    Read <ArrowRight size={12} />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium transition-all"
          >
            View All Articles <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
