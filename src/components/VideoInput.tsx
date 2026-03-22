"use client";

import { useState } from "react";
import { Youtube, ArrowRight, Loader2 } from "lucide-react";

interface VideoInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function VideoInput({ onSubmit, isLoading }: VideoInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url.trim());
    }
  };

  return (
    <div className="w-full relative group max-w-3xl mx-auto">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-focus-within:opacity-80 transition duration-1000"></div>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl"
      >
        <div className="pl-4 pr-2">
          <Youtube className="w-6 h-6 text-muted-foreground group-focus-within:text-red-500 transition-colors duration-300" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here... (e.g. https://youtube.com/watch?v=...)"
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground/60 focus:ring-0 px-2 h-14 text-lg"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Summarize</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
