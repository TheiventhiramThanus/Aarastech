import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logo from "../../imports/ChatGPT_Image_May_27__2026__10_20_02_PM.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {}

export function Navbar({}: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-[#0697A7]/20 shadow-[0_0_30px_rgba(6,151,167,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <ImageWithFallback src={logo} alt="AarasTech Logo" className="h-10 w-auto object-contain max-w-[200px]" />
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`relative text-sm py-1 transition-colors duration-200 block ${
                  isActive(link.href) ? "text-[#0697A7]" : "text-gray-300 hover:text-[#0697A7]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #0697A7, #7c3aed)" }}
                  />
                )}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">

          <Link to="/contact">
            <motion.span
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,151,167,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="block text-sm text-black bg-gradient-to-r from-[#0697A7] to-[#0ea5e9] px-5 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
            >
              Get Started
            </motion.span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden backdrop-blur-xl bg-black/90 border-t border-[#0697A7]/20 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}
                  className={`py-3 text-sm border-b border-white/5 transition-colors ${
                    isActive(link.href) ? "text-[#0697A7]" : "text-gray-300"
                  }`}>
                  {link.label}
                </Link>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
