import { motion } from "motion/react";

const WHATSAPP_NUMBER = "94752920381";
const DISPLAY_NUMBER = "0752920381";
const WHATSAPP_MESSAGE = "Hello AarasTech, I have a project inquiry";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-7 w-7"
      fill="currentColor"
    >
      <path d="M16.03 3.2A12.74 12.74 0 0 0 5.1 26.48L3.8 31.2l4.84-1.27A12.74 12.74 0 1 0 16.03 3.2Zm0 2.2a10.54 10.54 0 0 1 9.02 15.99 10.54 10.54 0 0 1-13.38 4.1l-.35-.18-2.86.75.77-2.78-.2-.36A10.54 10.54 0 0 1 16.03 5.4Zm-4.27 5.66c-.23 0-.6.08-.92.43-.31.34-1.2 1.17-1.2 2.85 0 1.68 1.23 3.31 1.4 3.53.17.23 2.38 3.8 5.86 5.17 2.9.95 3.48.76 4.11.72.63-.04 2.04-.83 2.33-1.63.28-.8.28-1.49.2-1.63-.09-.14-.32-.23-.67-.4-.35-.17-2.04-1-2.36-1.12-.31-.11-.54-.17-.77.17-.22.34-.88 1.12-1.08 1.35-.2.23-.4.26-.75.09-.35-.17-1.46-.54-2.79-1.72-1.03-.92-1.73-2.06-1.93-2.4-.2-.35-.02-.54.15-.71.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.12-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.55-.28-.67-.57-.58-.77-.59h-.66Z" />
    </svg>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open WhatsApp chat with ${DISPLAY_NUMBER}`}
      initial={{ opacity: 0, scale: 0.85, y: 18 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
        y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 36px rgba(34, 197, 94, 0.55)",
      }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-5 left-5 z-[65] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_48px_rgba(37,211,102,0.35)]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping" />
      <span className="absolute inset-0 rounded-full border border-white/25" />
      <span className="relative">
        <WhatsAppIcon />
      </span>
      <span className="pointer-events-none absolute left-20 hidden whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-xs font-medium text-gray-200 shadow-xl backdrop-blur-xl group-hover:block">
        WhatsApp {DISPLAY_NUMBER}
      </span>
    </motion.a>
  );
}
