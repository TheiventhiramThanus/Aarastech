import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, Sparkles, X, MessageCircle, Zap } from "lucide-react";

const quickPrompts = [
  "What services do you offer?",
  "How much does a website cost?",
  "Can you build an AI chatbot?",
];

const replies = [
  {
    keys: ["service", "offer", "do you"],
    text: "AarasTech builds websites, mobile apps, AI automation, SaaS platforms, e-commerce, branding, SEO, AEO, dashboards, and cloud integrations.",
  },
  {
    keys: ["cost", "price", "how much", "budget"],
    text: "Pricing depends on scope. A simple business website is usually faster and more affordable; SaaS, mobile apps, and AI systems need a custom quote. Share your idea on the Contact page for a free estimate.",
  },
  {
    keys: ["chatbot", "ai", "automation", "agent"],
    text: "Yes — we can build AI chatbots, workflow automations, lead qualification bots, support assistants, and custom AI tools connected to your business data.",
  },
  {
    keys: ["contact", "call", "phone", "email"],
    text: "You can contact AarasTech through the Contact page or call +44 7438 603306. We usually respond within 24 hours.",
  },
];

type ChatMessage = {
  role: "bot" | "user";
  text: string;
};

function getReply(input: string) {
  const lower = input.toLowerCase();
  const found = replies.find(item => item.keys.some(key => lower.includes(key)));
  return found?.text ?? "Great question. Tell us your project type, timeline, and budget range — AarasTech can suggest the best technology approach and next steps.";
}

export function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! I'm AarasTech AI assistant. Ask me about websites, apps, AI automation, pricing, or project ideas." },
  ]);

  const suggested = useMemo(() => quickPrompts.filter(prompt => !messages.some(m => m.text === prompt)).slice(0, 3), [messages]);

  const sendMessage = (text = input) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { role: "user", text: clean }, { role: "bot", text: getReply(clean) }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[55]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl border border-[#0697A7]/25 bg-[#070707]/90 shadow-[0_24px_90px_rgba(6,151,167,0.18)] backdrop-blur-2xl"
          >
            <div className="relative overflow-hidden border-b border-white/10 p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,151,167,0.24),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.24),transparent_35%)]" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0697A7]/15 text-[#0697A7] border border-[#0697A7]/30">
                    <Bot size={22} />
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>AarasTech AI</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1"><Sparkles size={11} /> Online assistant</div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-gray-500 hover:bg-white/5 hover:text-white transition-colors" aria-label="Close AI chat">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[84%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "bg-gradient-to-r from-[#0697A7] to-[#7c3aed] text-white" : "bg-white/[0.06] text-gray-300 border border-white/10"}`}>
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {suggested.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggested.map(prompt => (
                    <button key={prompt} onClick={() => sendMessage(prompt)} className="rounded-full border border-[#0697A7]/25 bg-[#0697A7]/10 px-3 py-1.5 text-xs text-[#0697A7] hover:bg-[#0697A7]/15 transition-colors">
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-[#0697A7]/40">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about your project..."
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-gray-600"
                />
                <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0697A7] text-black hover:bg-[#0ea5e9] transition-colors" aria-label="Send message">
                  <Send size={15} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0697A7] to-[#7c3aed] text-white shadow-[0_0_45px_rgba(6,151,167,0.45)]"
        aria-label="Open AI chat bot"
      >
        <span className="absolute inset-0 rounded-2xl animate-ping bg-[#0697A7]/20" />
        {open ? <X size={25} /> : <MessageCircle size={25} />}
        <span className="absolute -left-28 hidden rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-xl group-hover:block">
          Ask AI <Zap size={10} className="inline text-[#0697A7]" />
        </span>
      </motion.button>
    </div>
  );
}
