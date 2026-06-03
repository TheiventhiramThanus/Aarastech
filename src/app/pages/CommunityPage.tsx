import { useState, useEffect } from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { ArrowRight, BadgeCheck, ShieldCheck, MessageCircle, ExternalLink, Download } from "lucide-react";
import { SEO } from "../components/SEO";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { breadcrumbSchema, buildSchema, pageSchema } from "../lib/seo";

interface CommunityResource {
  id: string; title: string; desc: string; icon: string; color: string; status: string; time: string;
  image?: string; link?: string;
  pdfUrl?: string; pdfName?: string;
}

export function CommunityPage() {
  const [communityItems, setCommunityItems] = useState<CommunityResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const q = query(collection(db, "community_comments"), where("status", "in", ["Published", "Pinned"]));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityResource));
        // Sort explicitly: Pinned first, then by title
        data.sort((a, b) => {
          if (a.status === "Pinned" && b.status !== "Pinned") return -1;
          if (b.status === "Pinned" && a.status !== "Pinned") return 1;
          return a.title.localeCompare(b.title);
        });
        setCommunityItems(data);
      } catch (e) {
        console.error("Error fetching community resources:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const communitySchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Join AarasTech Community | Free Tools & Resources",
    "description": "Access trusted community sources for free developer tools, certification opportunities, tech jobs, career guidance, and official tech resources.",
    "publisher": {
      "@type": "Organization",
      "name": "AarasTech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aarastech.com/assets/ChatGPT_Image_May_27__2026__10_20_02_PM-Dt0gqxxu.png"
      }
    },
    "url": "https://aarastech.com/community"
  });

  return (
    <div className="bg-black pt-20 overflow-hidden">
      <SEO
        title="Join AarasTech Community | Free Tools & Resources"
        description="Access trusted community sources for free developer tools, certification opportunities, tech jobs, career guidance, and official tech resources."
        canonicalUrl="https://aarastech.com/community"
        keywords="AarasTech community, free developer tools, certification opportunities, tech jobs, internships, career guidance, tech resources"
        schema={communitySchema}
      />
      <section className="relative min-h-[82vh] flex items-center py-24">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-[520px] h-[520px] rounded-full bg-[#0697A7]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[620px] h-[620px] rounded-full bg-[#7c3aed]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(6,151,167,.65) 1px, transparent 0)", backgroundSize: "38px 38px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0697A7]/10 border border-[#0697A7]/30 text-[#0697A7] text-sm mb-6">
              <MessageCircle size={14} /> AarasTech Community
            </div>
            <h1 className="text-white mb-6" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2.6rem,6vw,5.8rem)", lineHeight: 0.95, fontWeight: 800 }}>
              Join AarasTech <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Community</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
              A useful community to share trusted sources for free tools, certificate opportunities, jobs, internships, career guidance, tech resources, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://chat.whatsapp.com/IGAQixAulaUEmM2yf1QO2j" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#0697A7] to-[#7c3aed] text-white font-bold shadow-[0_0_35px_rgba(6,151,167,.25)] hover:scale-[1.02] transition-transform">
                Join here <ArrowRight size={18} />
              </a>
              <div className="inline-flex items-center gap-2 px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 backdrop-blur-xl">
                <BadgeCheck size={18} className="text-[#0697A7]" /> Official links only
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 shadow-2xl">
              <div className="rounded-[1.5rem] border border-[#0697A7]/20 bg-[#050505]/80 p-6">
                <div className="text-5xl mb-4">🚀</div>
                <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "Space Grotesk" }}>What we share</h2>
                <div className="space-y-3 text-gray-300">
                  {["Official links", "Trusted sources", "Useful updates", "No spam", "No fake links", "Only valuable updates"].map(item => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3">
                      <ShieldCheck size={16} className="text-[#0697A7]" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-gray-500">Loading resources...</div>
          ) : communityItems.map((item, i) => {
            const Icon = (Icons[item.icon as keyof typeof Icons] || Icons.MessageCircle) as React.ElementType;
            const CardContent = (
              <>
                {item.image && (
                  <div className="w-full aspect-square mb-5 rounded-xl overflow-hidden bg-gray-900 border border-white/5">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                {!item.image && (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.color}18`, color: item.color }}>
                    {item.icon?.startsWith("http") || item.icon?.startsWith("data:image") ? (
                      <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" />
                    ) : (
                      <Icon size={22} />
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>{item.title}</h3>
                  {item.status === "Pinned" && <span className="px-2 py-0.5 rounded text-[10px] bg-[#7c3aed]/20 text-[#7c3aed] uppercase font-bold tracking-wider">Pinned</span>}
                  {item.link && <ExternalLink size={14} className="text-gray-500 ml-auto" />}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">{item.desc}</p>
                {item.pdfUrl && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <a
                      href={item.pdfUrl}
                      download={item.pdfName || "document.pdf"}
                      onClick={(e) => e.stopPropagation()}
                      className="pdf-download-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/[0.06] border border-white/10 hover:bg-[#0697A7] hover:border-[#0697A7] hover:text-black transition-all w-fit cursor-pointer"
                    >
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                )}
              </>
            );

            const cardClasses = "flex flex-col group rounded-2xl p-6 bg-[#080808] border border-white/10 hover:border-[#0697A7]/30 transition-colors h-full";
            const hasLink = !!item.link;

            const handleCardClick = (e: React.MouseEvent) => {
              if ((e.target as HTMLElement).closest(".pdf-download-btn")) {
                return;
              }
              if (hasLink) {
                window.open(item.link, "_blank", "noopener,noreferrer");
              }
            };

            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div 
                  onClick={hasLink ? handleCardClick : undefined}
                  className={`${cardClasses} ${hasLink ? "cursor-pointer" : ""}`}
                >
                  {CardContent}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
