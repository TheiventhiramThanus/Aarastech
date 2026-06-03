import { motion } from "motion/react";

const items = [
  "Custom Website Development",
  "AI-Powered Applications",
  "Mobile App Development",
  "UI/UX Design",
  "E-Commerce Solutions",
  "Branding & Creative Design",
  "SEO & AEO Optimization",
  "SaaS Platforms",
  "Cloud Solutions",
  "Automation Systems",
  "AI Chatbot Integration",
];

export function MarqueeBanner() {
  return (
    <div className="relative bg-[#0697A7]/5 border-y border-[#0697A7]/15 py-4 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 bg-[#0697A7] rounded-full" />
            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
