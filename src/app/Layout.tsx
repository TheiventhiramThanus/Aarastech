import { Outlet, useLocation, useNavigate, Navigate } from "react-router";
import { FormEvent, Suspense, lazy, useEffect, useState } from "react";
import { Lock, Mail, ShieldCheck, X } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AnimatePresence, motion } from "motion/react";
import { GlobalAdsManager } from "./components/AdManager";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";

const AdminDashboard = lazy(() => import("./components/AdminDashboard").then((module) => ({ default: module.AdminDashboard })));

const ADMIN_EMAIL = "aarastech01@gmail.com";
const ADMIN_PASSWORD = "Thanus272216#";
const ADMIN_SESSION_KEY = "aarastech-admin-authenticated";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

function DashboardLogin({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setError("");
      onSuccess();
      return;
    }
    setError("Invalid dashboard username or password.");
  };

  return (
    <motion.div
      key="dashboard-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,151,167,0.18),transparent_34%),radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.16),transparent_32%)]" />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 22, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#0697A7]/25 bg-[#070707]/90 p-7 shadow-[0_0_80px_rgba(6,151,167,0.16)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-white/10 p-2 text-gray-500 transition hover:text-white"
          aria-label="Close dashboard login"
        >
          <X size={16} />
        </button>

        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0697A7]/15 text-[#0697A7] ring-1 ring-[#0697A7]/30">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-white" style={{ fontFamily: "Space Grotesk", fontSize: "1.55rem", fontWeight: 700 }}>Dashboard Login</h2>
            <p className="text-sm text-gray-500">Authorized AarasTech access only.</p>
          </div>
        </div>

        <label className="mb-2 block text-sm text-gray-400">Username</label>
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 focus-within:border-[#0697A7]/50">
          <Mail size={17} className="text-[#0697A7]" />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-gray-700"
            placeholder="admin@example.com"
            autoComplete="username"
          />
        </div>

        <label className="mb-2 block text-sm text-gray-400">Password</label>
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 focus-within:border-[#0697A7]/50">
          <Lock size={17} className="text-[#0697A7]" />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="w-full bg-transparent text-white outline-none placeholder:text-gray-700"
            placeholder="Enter dashboard password"
            autoComplete="current-password"
          />
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-[#0697A7] to-[#0ea5e9] px-5 py-3.5 font-bold text-black transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(6,151,167,0.45)]"
        >
          Open Dashboard
        </button>
      </motion.form>
    </motion.div>
  );
}

export function Layout() {
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  });
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";
  const isDashboard = location.pathname === "/dashboard";
  const showDashboardUI = isLogin || isDashboard;

  const closeDashboard = () => navigate("/");

  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "Inter, sans-serif" }}>
      <ScrollToTop />
      <AnimatePresence>
        {isDashboard && adminAuthenticated && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <AdminDashboard onClose={closeDashboard} />
            </Suspense>
          </motion.div>
        )}
        {isDashboard && !adminAuthenticated && (
          <Navigate to="/login" replace />
        )}
        {isLogin && !adminAuthenticated && (
          <DashboardLogin
            onClose={closeDashboard}
            onSuccess={() => {
              setAdminAuthenticated(true);
              navigate("/dashboard");
            }}
          />
        )}
        {isLogin && adminAuthenticated && (
          <Navigate to="/dashboard" replace />
        )}
      </AnimatePresence>
      {!showDashboardUI && (
        <>
          <Navbar />
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.main>
          <Footer />
          <FloatingWhatsAppButton />
          <GlobalAdsManager />
        </>
      )}
    </div>
  );
}
