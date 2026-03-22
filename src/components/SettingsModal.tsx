import { useState, useEffect } from "react";
import { X, Key, Info } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem("gemini_api_key") || "");
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
    } else {
      localStorage.removeItem("gemini_api_key");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div className="w-full max-w-md bg-[#1a1b26] border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-panel animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Key className="w-5 h-5 text-primary" /> Settings
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Gemini API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white placeholder:text-muted-foreground/50"
            />
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p>Your API key is stored locally in your browser and is only sent directly to the generation endpoint. It is never stored on our servers.</p>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-black/20">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors text-white">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
