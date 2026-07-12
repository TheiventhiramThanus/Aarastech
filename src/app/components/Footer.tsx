import { motion } from "motion/react";
import { Link } from "react-router";
import { Linkedin, Instagram, Facebook, Mail } from "lucide-react";
import logo from "../../imports/ChatGPT_Image_May_27__2026__10_20_02_PM.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AdBanner } from "./AdManager";

const links = {
  Services: [
    { label: "Web Development", href: "/services" },
    { label: "Mobile Apps", href: "/services" },
    { label: "AI Solutions", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
    { label: "SEO & AEO", href: "/services" },
    { label: "SaaS Platforms", href: "/services" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Community", href: "/community" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const socials = [
  { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", href: "https://www.linkedin.com/company/aaras-tech/" },
  { icon: Instagram, label: "Instagram", color: "#E1306C", href: "https://www.instagram.com/aaras_tech/" },
  { icon: Facebook, label: "Facebook", color: "#1877F2", href: "https://web.facebook.com/aarasuk" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-white/5 overflow-hidden">
      {/* Glow divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #0697A7, #7c3aed, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8">
        {/* Ad Banner (Footer Top) */}
        <AdBanner position="Footer top" />

        {/* Ad Banner (Footer Middle) */}
        <AdBanner position="Footer middle" />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
              <ImageWithFallback src={logo} alt="AarasTech Logo" className="h-8 sm:h-10 w-auto object-contain max-w-[200px]" />
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm text-center sm:text-left">
              Next-generation digital agency specializing in AI-powered applications, premium web development,
              and transformative digital experiences for businesses worldwide.
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, boxShadow: `0 0 15px ${s.color}50` }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="text-center sm:text-left">
              <h4
                className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
                style={{ fontFamily: "Space Grotesk" }}
              >
                {section}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-gray-500 hover:text-[#0697A7] text-xs sm:text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col items-center gap-2 text-center text-xs text-gray-600 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-4 lg:gap-y-2">
          <div className="leading-relaxed">
            &copy; {new Date().getFullYear()} AarasTech
          </div>
          <div className="hidden lg:block">&middot;</div>
          <a href="mailto:info@aarastech.com" className="flex items-center justify-center gap-2 hover:text-[#0697A7] transition-colors">
            <Mail size={14} className="flex-shrink-0" />
            <span>info@aarastech.com</span>
          </a>
          <div className="hidden lg:block">&middot;</div>
          <a href="tel:+447438603330" className="flex items-center justify-center gap-2 hover:text-[#0697A7] transition-colors">
            <span>+44 7438 60330 (UK)</span>
          </a>
          <div className="hidden lg:block">&middot;</div>
          <a href="tel:+94752920381" className="flex items-center justify-center gap-2 hover:text-[#0697A7] transition-colors">
            <span>+94 7529 20381 (SL)</span>
          </a>
          <div className="hidden lg:block">&middot;</div>
          <div className="flex items-center justify-center gap-2">
            Serving <span className="text-[#0697A7] font-medium">UK</span> &amp; <span className="text-[#7c3aed] font-medium">Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
