import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export interface AEOAnswer {
  question: string;
  answer: string;
}

interface AEOAnswerSectionProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  summary: string;
  answers: AEOAnswer[];
  id?: string;
}

export function AEOAnswerSection({ eyebrow = "Quick Answers", title, highlight, summary, answers, id }: AEOAnswerSectionProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className="bg-[#030303] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0697A7]/30 bg-[#0697A7]/10 px-4 py-2 text-sm text-[#0697A7]">
            <MessageCircle size={13} /> {eyebrow}
          </div>
          <h2 id={id ? `${id}-heading` : undefined} className="mb-3 text-white" style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700 }}>
            {title}{" "}
            {highlight && (
              <span style={{ background: "linear-gradient(135deg,#0697A7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {highlight}
              </span>
            )}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">{summary}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {answers.map((item, index) => (
            <motion.article
              key={item.question}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl bg-[#080808] p-6"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h3 className="mb-2 text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk" }}>{item.question}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{item.answer}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
