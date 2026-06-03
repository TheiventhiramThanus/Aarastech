import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit2, Trash2, Eye, MousePointerClick, Megaphone, Activity, Upload, X } from "lucide-react";
import { Ad } from "./AdminDashboard";

interface AdsSectionProps {
  ads: Ad[];
  onCreate: (data: any) => Promise<void> | void;
  onUpdate: (id: string, data: any) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_FALLBACK_IMAGE_LENGTH = 550 * 1024;

const AD_POSITION_CONFIGS: Record<string, { label: string; ratio: string; aspect: number; width: number }> = {
  "Popup modal": { label: "Popup", ratio: "16:9", aspect: 16 / 9, width: 1200 },
  "Floating bottom-right ad": { label: "Floating", ratio: "4:3", aspect: 4 / 3, width: 800 },
  "Home page hero below": { label: "Home Banner", ratio: "21:6", aspect: 21 / 6, width: 1400 },
  "Services section": { label: "Services Banner", ratio: "16:5", aspect: 16 / 5, width: 1280 },
  "Blog sidebar": { label: "Blog Banner", ratio: "4:3", aspect: 4 / 3, width: 800 },
  "Footer top": { label: "Footer Banner", ratio: "21:6", aspect: 21 / 6, width: 1400 },
  "Footer middle": { label: "Footer Banner", ratio: "21:6", aspect: 21 / 6, width: 1400 },
};

const AD_POSITIONS = Object.keys(AD_POSITION_CONFIGS);

const PAGE_OPTIONS = [
  { value: "home", label: "Home" },
  { value: "services", label: "Services" },
  { value: "blog", label: "Blog" },
  { value: "contact", label: "Contact" },
  { value: "community", label: "Community" },
];

function getPageLabel(value: string) {
  return PAGE_OPTIONS.find(page => page.value === value)?.label || value;
}

function compressImageToDataUrl(file: File, aspect: number, outputWidth: number) {
  return new Promise<string>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const imageAspect = image.width / image.height;
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = image.width;
      let sourceHeight = image.height;

      if (imageAspect > aspect) {
        sourceWidth = image.height * aspect;
        sourceX = (image.width - sourceWidth) / 2;
      } else {
        sourceHeight = image.width / aspect;
        sourceY = (image.height - sourceHeight) / 2;
      }

      let scale = Math.min(1, outputWidth / sourceWidth);
      let quality = 0.82;
      let dataUrl = "";

      for (let attempt = 0; attempt < 7; attempt += 1) {
        const width = Math.max(1, Math.round(sourceWidth * scale));
        const height = Math.max(1, Math.round(width / aspect));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Could not prepare image preview."));
          return;
        }

        context.fillStyle = "#0f0f0f";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
        dataUrl = canvas.toDataURL("image/jpeg", quality);

        if (dataUrl.length <= MAX_FALLBACK_IMAGE_LENGTH) break;
        scale *= 0.82;
        quality = Math.max(0.58, quality - 0.08);
      }

      resolve(dataUrl);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read the selected image."));
    };

    image.src = objectUrl;
  });
}

export function AdsSection({ ads, onCreate, onUpdate, onDelete }: AdsSectionProps) {
  const [modal, setModal] = useState<"create" | Ad | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Ad | null>(null);

  const totalAds = ads.length;
  const activeAds = ads.filter(a => a.status === "Active").length;
  const totalViews = ads.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalClicks = ads.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  return (
    <motion.div key="ads" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Ads", val: totalAds, icon: Megaphone, color: "#7c3aed" },
          { label: "Active Ads", val: activeAds, icon: Activity, color: "#10b981" },
          { label: "Total Views", val: totalViews.toLocaleString(), icon: Eye, color: "#0697A7" },
          { label: "Total Clicks", val: totalClicks.toLocaleString(), icon: MousePointerClick, color: "#ec4899" },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#0a0a0a]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.color + "15" }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
              <div className="text-gray-400 text-xs font-medium">{s.label}</div>
            </div>
            <div className="text-white text-2xl font-bold" style={{ fontFamily: "Space Grotesk" }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Ads List */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Megaphone size={18} className="text-[#0697A7]" />
            <h2 className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>Managed Ads</h2>
          </div>
          <button onClick={() => setModal("create")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)", boxShadow: "0 0 20px rgba(6,151,167,0.3)" }}>
            <Plus size={16} /> Create Ad
          </button>
        </div>

        <div className="space-y-3">
          {ads.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">No ads found. Create one to get started.</div>
          ) : ads.map((ad, i) => (
            <motion.div key={ad.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#080808] hover:bg-[#0f0f0f] transition-colors group"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                {ad.image ? <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-600"><Megaphone size={20} /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold truncate mb-1">{ad.title}</div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="text-[#06b6d4]">{ad.position}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Eye size={12} /> {ad.views || 0}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MousePointerClick size={12} /> {ad.clicks || 0}</span>
                </div>
                {ad.target_pages?.length && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ad.target_pages.map(page => (
                      <span key={page} className="rounded-full bg-[#0697A7]/10 px-2 py-0.5 text-[10px] font-medium text-[#0697A7]">
                        {getPageLabel(page)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: ad.status === "Active" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: ad.status === "Active" ? "#10b981" : "#ef4444" }}>
                  {ad.status}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setModal(ad)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Edit2 size={14} /></button>
                  <button onClick={() => setDeleteTarget(ad)} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {modal && (
        <AdModal 
          ad={modal === "create" ? null : modal} 
          onClose={() => setModal(null)} 
          onSave={async (data) => {
            if (modal === "create") await onCreate(data);
            else await onUpdate(modal.id, data);
            setModal(null);
          }} 
        />
      )}

      {deleteTarget && (
        <AnimatePresence>
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0f0f0f] p-6 rounded-2xl max-w-sm w-full text-center" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4"><Trash2 className="text-red-400" /></div>
              <h3 className="text-white font-bold mb-2">Delete Ad?</h3>
              <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete "{deleteTarget.title}"? This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors">Cancel</button>
                <button onClick={() => { onDelete(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}

function AdModal({ ad, onClose, onSave }: { ad: Ad | null, onClose: () => void, onSave: (d: any) => Promise<void> | void }) {
  const [form, setForm] = useState({
    title: ad?.title || "",
    description: ad?.description || "",
    image: ad?.image || "",
    link: ad?.link || "",
    position: ad?.position || "Popup modal",
    status: ad?.status || "Active",
    start_date: ad?.start_date || new Date().toISOString().split("T")[0],
    end_date: ad?.end_date || new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0],
    target_pages: ad?.target_pages?.length ? ad.target_pages : PAGE_OPTIONS.map(page => page.value),
  });
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);
  const selectedPositionConfig = AD_POSITION_CONFIGS[form.position] || AD_POSITION_CONFIGS["Popup modal"];

  const toggleTargetPage = (page: string) => {
    setForm(prev => {
      const hasPage = prev.target_pages.includes(page);
      return {
        ...prev,
        target_pages: hasPage ? prev.target_pages.filter(item => item !== page) : [...prev.target_pages, page],
      };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert('Image size exceeds 5 MB. Please choose a smaller file.');
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadError("");
    try {
      const compressedPreview = await compressImageToDataUrl(file, selectedPositionConfig.aspect, selectedPositionConfig.width);
      setPreviewImage(compressedPreview);
      setForm(p => ({ ...p, image: compressedPreview }));
      setUploadError(`${selectedPositionConfig.label} image ready (${selectedPositionConfig.ratio}). Click Create Ad to save.`);
    } catch (error) {
      console.error("Ad image preparation failed", error);
      setUploadError("Image upload failed. Try a smaller JPG or paste an image URL.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.link) return alert("Please fill required fields.");
    if (form.target_pages.length === 0) return alert("Please select at least one page for this ad.");
    const imageToSave = form.image || previewImage;
    if (!imageToSave) return alert("Please upload an image or paste an image URL before saving.");

    setSaving(true);
    try {
      await onSave({ ...form, image: imageToSave, views: ad?.views || 0, clicks: ad?.clicks || 0 });
    } catch (error) {
      console.error("Failed to save ad", error);
      alert("Failed to save ad. Please try again.");
      setSaving(false);
    }
  };

  const inputCls = "w-full min-w-0 rounded-xl px-4 py-3 text-white text-sm outline-none bg-[#111] border border-white/10 focus:border-[#0697A7]/50 transition-all placeholder:text-gray-600";
  const selectCls = "w-full min-w-0 rounded-xl px-4 py-3 text-white text-sm outline-none bg-[#111] border border-white/10 focus:border-[#0697A7]/50 transition-all appearance-none cursor-pointer";
  const imageInputValue = form.image.startsWith("data:image") ? "" : form.image;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#0f0f0f] w-full max-w-2xl rounded-3xl overflow-hidden my-auto" style={{ border: "1px solid rgba(6,151,167,0.2)" }}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-white font-bold text-lg">{ad ? "Edit Ad" : "Create New Ad"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Ad Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputCls} placeholder="Summer Sale 50% Off" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Target Link *</label>
              <input required value={form.link} onChange={e => setForm({...form, link: e.target.value})} className={inputCls} placeholder="https://aarastech.com/contact" />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Description</label>
            <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputCls} placeholder="Short description or tagline" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Position *</label>
              <select value={form.position} onChange={e => {
                const nextPosition = e.target.value;
                const nextConfig = AD_POSITION_CONFIGS[nextPosition] || AD_POSITION_CONFIGS["Popup modal"];
                const hasLocalImage = form.image.startsWith("data:image");
                setPreviewImage("");
                setUploadError(hasLocalImage ? `Position changed. Re-upload image for ${nextConfig.label} (${nextConfig.ratio}).` : "");
                setForm({...form, position: nextPosition, image: hasLocalImage ? "" : form.image});
              }} className={selectCls}
                style={{ colorScheme: "dark" }}>
                {AD_POSITIONS.map(position => (
                  <option key={position} value={position} style={{ background: "#111", color: "#fff" }}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Status *</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={selectCls}
                style={{ colorScheme: "dark" }}>
                <option value="Active" style={{ background: "#111", color: "#fff" }}>Active</option>
                <option value="Inactive" style={{ background: "#111", color: "#fff" }}>Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-2 block">Show On Pages *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PAGE_OPTIONS.map(page => {
                const selected = form.target_pages.includes(page.value);
                return (
                  <button
                    key={page.value}
                    type="button"
                    onClick={() => toggleTargetPage(page.value)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                      selected ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                    style={{
                      background: selected ? "linear-gradient(135deg,#0697A7,#0ea5e9)" : "rgba(255,255,255,0.04)",
                      borderColor: selected ? "transparent" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    {page.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Start Date</label>
              <input type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className={inputCls} />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">End Date</label>
              <input type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className={inputCls} />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-gray-400 text-xs block">Ad Image</label>
              <span className="rounded-full border border-[#0697A7]/25 bg-[#0697A7]/10 px-2.5 py-1 text-[10px] font-semibold text-[#0697A7]">
                {selectedPositionConfig.label} {selectedPositionConfig.ratio}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-4 items-start">
              <div
                className="w-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden"
                style={{ aspectRatio: selectedPositionConfig.aspect }}
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : form.image ? (
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Megaphone className="text-gray-600" size={24} />
                )}
              </div>
              <div className="flex-1">
                <input
                  value={imageInputValue}
                  onChange={e => {
                    setPreviewImage("");
                    setUploadError("");
                    setForm({...form, image: e.target.value});
                  }}
                  className={inputCls + " mb-2"}
                  placeholder={form.image.startsWith("data:image") ? "Uploaded image ready" : "Image URL or upload file..."}
                />
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors">
                  <Upload size={14} /> {uploading ? "Preparing..." : "Upload Image"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
                {uploadError && (
                  <div className="mt-2 text-[11px] leading-relaxed text-amber-300">
                    {uploadError}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button onClick={onClose} disabled={saving || uploading} className="flex-1 py-3 rounded-xl text-white font-medium bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving || uploading} className="flex-1 py-3 rounded-xl text-black font-bold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100" style={{ background: "linear-gradient(135deg,#0697A7,#0ea5e9)" }}>
              {saving ? "Saving..." : ad ? "Save Changes" : "Create Ad"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
