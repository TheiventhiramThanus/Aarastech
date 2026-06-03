import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { collection, onSnapshot, query, where, updateDoc, doc, increment } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Ad } from "./AdminDashboard";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";

function getPageId(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/community")) return "community";
  return "other";
}

function targetsCurrentPage(ad: Ad, pageId: string) {
  return !ad.target_pages?.length || ad.target_pages.includes(pageId);
}

function popupSeenToday(adId: string) {
  try {
    const today = new Date().toISOString().split("T")[0];
    return localStorage.getItem(`aarastech_popup_ad_seen_${adId}`) === today;
  } catch {
    return false;
  }
}

function markPopupSeenToday(adId: string) {
  try {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`aarastech_popup_ad_seen_${adId}`, today);
  } catch {
    // Ignore storage access issues.
  }
}

function getBannerImageClass(position: string) {
  switch (position) {
    case "Home page hero below":
    case "Footer top":
    case "Footer middle":
      return "w-full aspect-[21/6] min-h-24 relative";
    case "Services section":
      return "w-full aspect-[16/5] min-h-24 relative";
    case "Blog sidebar":
      return "w-full aspect-[4/3] max-h-64 relative";
    default:
      return "w-full aspect-video min-h-28 relative";
  }
}

// Hook to get active, non-expired ads
export function useActiveAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const pageId = getPageId(pathname);
    const q = query(collection(db, "ads"), where("status", "==", "Active"));
    
    const unsubscribe = onSnapshot(q, (snap) => {
      const fetchedAds = snap.docs.map(d => ({ id: d.id, ...d.data() } as Ad));
      // Filter out expired ads on the client to avoid complex Firestore composite indexes
      const validAds = fetchedAds.filter(a => (!a.end_date || a.end_date >= today) && targetsCurrentPage(a, pageId));
      setAds(validAds);
    });
    return () => unsubscribe();
  }, [pathname]);

  return ads;
}

export const trackAdClick = async (adId: string, link: string) => {
  try {
    await updateDoc(doc(db, "ads", adId), { clicks: increment(1) });
  } catch (e) {
    console.error("Failed to track click", e);
  }
  window.open(link, "_blank");
};

export const trackAdView = async (adId: string) => {
  try {
    // Note: In high traffic, standard increment can hit limits. 
    // This is fine for moderate traffic.
    await updateDoc(doc(db, "ads", adId), { views: increment(1) });
  } catch (e) {
    console.error("Failed to track view", e);
  }
};

// ─── Inline Ad Banner Component ──────────────────────────────────────────────

export function AdBanner({ position }: { position: string }) {
  const ads = useActiveAds();
  const adsForPos = ads.filter(a => a.position === position);
  const [ad, setAd] = useState<Ad | null>(null);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    if (adsForPos.length === 0) {
      setAd(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * adsForPos.length);
    setAd(adsForPos[randomIndex]);
  }, [ads, position]);

  useEffect(() => {
    if (ad && !viewed) {
      trackAdView(ad.id);
      setViewed(true);
    }
  }, [ad, viewed]);

  if (!ad) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => trackAdClick(ad.id, ad.link)}
      className="relative group cursor-pointer w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#080808] my-4 sm:my-6 transition-all hover:shadow-[0_0_30px_rgba(6,151,167,0.15)] active:scale-[0.99]"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {ad.image ? (
        <div className={getBannerImageClass(position)}>
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 drop-shadow-lg line-clamp-1">
              {ad.title}
            </h3>
            {ad.description && (
              <p className="text-gray-300 text-xs sm:text-sm line-clamp-1 drop-shadow-md">
                {ad.description}
              </p>
            )}
          </div>
          <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] uppercase text-white/60 px-1.5 sm:px-2 py-0.5 rounded">
            Ad
          </span>
        </div>
      ) : (
        <div
          className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
          style={{ background: "linear-gradient(135deg,rgba(6,151,167,0.08),rgba(124,58,237,0.08))" }}
        >
          <div className="flex-1 min-w-0">
            <span className="text-[9px] sm:text-[10px] uppercase text-[#0697A7] font-bold tracking-wider mb-1 block">
              Sponsored
            </span>
            <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 sm:mb-1 line-clamp-1">
              {ad.title}
            </h3>
            {ad.description && (
              <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
                {ad.description}
              </p>
            )}
          </div>
          <button className="flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-black text-xs sm:text-sm font-bold bg-[#0697A7] hover:bg-[#0ea5e9] active:bg-[#058a99] transition-colors">
            Learn More <ExternalLink size={13} />
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Global Ads Manager (Popup & Floating) ──────────────────────────────────

export function GlobalAdsManager() {
  const ads = useActiveAds();
  const [showPopup, setShowPopup] = useState(false);
  const [closedPopup, setClosedPopup] = useState(false);
  const [closedFloating, setClosedFloating] = useState(false);
  const [viewedPopup, setViewedPopup] = useState(false);
  const [viewedFloating, setViewedFloating] = useState(false);

  const popupAd = ads.find(a => a.position === "Popup modal");
  const floatingAd = ads.find(a => a.position === "Floating bottom-right ad");

  // Popup logic with 5 second delay
  useEffect(() => {
    if (popupAd && !closedPopup && !showPopup && !popupSeenToday(popupAd.id)) {
      const t = setTimeout(() => {
        markPopupSeenToday(popupAd.id);
        setShowPopup(true);
        if (!viewedPopup) {
          trackAdView(popupAd.id);
          setViewedPopup(true);
        }
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [popupAd, closedPopup, showPopup, viewedPopup]);

  // Floating view logic
  useEffect(() => {
    if (floatingAd && !closedFloating && !viewedFloating) {
      trackAdView(floatingAd.id);
      setViewedFloating(true);
    }
  }, [floatingAd, closedFloating, viewedFloating]);

  return (
    <>
      {/* ─── Popup Ad ─── */}
      <AnimatePresence>
        {showPopup && popupAd && !closedPopup && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-[#0f0f0f] w-full max-w-sm sm:max-w-lg rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,151,167,0.3)]"
              style={{ border: "1px solid rgba(6,151,167,0.3)", maxHeight: "90vh" }}
            >
              {/* Close button — large touch target on mobile */}
              <button
                onClick={() => { setShowPopup(false); setClosedPopup(true); }}
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 active:bg-black/90 transition-all backdrop-blur-md"
              >
                <X size={18} className="sm:w-4 sm:h-4" />
              </button>

              <div
                className="cursor-pointer group overflow-y-auto"
                style={{ maxHeight: "85vh" }}
                onClick={() => { trackAdClick(popupAd.id, popupAd.link); setShowPopup(false); setClosedPopup(true); }}
              >
                {popupAd.image ? (
                  <div className="w-full aspect-video relative overflow-hidden">
                    <img
                      src={popupAd.image}
                      alt={popupAd.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-[#0697A7]/20 to-[#7c3aed]/20" />
                )}

                <div className="p-5 sm:p-6 text-center -mt-8 sm:-mt-10 relative z-10">
                  <h3
                    className="text-white font-bold text-xl sm:text-2xl mb-1.5 sm:mb-2 line-clamp-2"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    {popupAd.title}
                  </h3>
                  {popupAd.description && (
                    <p className="text-gray-400 text-sm mb-4 sm:mb-6 line-clamp-3">
                      {popupAd.description}
                    </p>
                  )}
                  <button className="w-full py-3 sm:py-3.5 rounded-xl text-black font-bold text-sm sm:text-base bg-gradient-to-r from-[#0697A7] to-[#0ea5e9] hover:shadow-[0_0_20px_rgba(6,151,167,0.4)] active:scale-[0.98] transition-all">
                    Explore Offer
                  </button>
                  <div className="text-[9px] sm:text-[10px] text-gray-600 uppercase mt-3 sm:mt-4">
                    Advertisement
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Floating Ad ─── */}
      <AnimatePresence>
        {floatingAd && !closedFloating && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[90] w-[calc(100vw-24px)] max-w-[280px] sm:w-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(10,10,10,0.97)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Close — bigger touch target on mobile */}
            <button
              onClick={(e) => { e.stopPropagation(); setClosedFloating(true); }}
              className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-black/70 text-gray-300 hover:text-white active:bg-black/90 transition-colors"
            >
              <X size={13} className="sm:w-3 sm:h-3" />
            </button>

            <div onClick={() => trackAdClick(floatingAd.id, floatingAd.link)}>
              {floatingAd.image && (
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={floatingAd.image}
                    alt={floatingAd.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              )}
              <div className="p-3 sm:p-4">
                <span className="text-[8px] sm:text-[9px] uppercase text-[#0697A7] font-bold tracking-widest mb-0.5 sm:mb-1 block">
                  Sponsored
                </span>
                <h4 className="text-white font-bold text-xs sm:text-sm leading-tight mb-0.5 sm:mb-1 line-clamp-2">
                  {floatingAd.title}
                </h4>
                {floatingAd.description && (
                  <p className="text-gray-400 text-[10px] sm:text-xs line-clamp-2">
                    {floatingAd.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
