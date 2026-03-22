"use client";

import { useState } from "react";
import { Sparkles, AlertCircle, Loader2 } from "lucide-react";
import VideoInput from "@/components/VideoInput";
import VideoPreview, { VideoData } from "@/components/VideoPreview";
import SummaryResults, { SummaryData } from "@/components/SummaryResults";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const { user } = useAuth();

  const handleSummarize = async (url: string) => {
    if (!user) {
      setError("Please sign in to summarize your favorite videos.");
      window.dispatchEvent(new CustomEvent("open-auth"));
      return;
    }

    setIsProcessing(true);
    setError(null);
    setVideoData(null);
    setSummaryData(null);
    
    try {
      setLoadingStep("Fetching video metadata...");
      const metaRes = await fetch("/api/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const metaData = await metaRes.json();
      
      if (!metaRes.ok) throw new Error(metaData.error || "Failed to fetch video metadata");
      
      setVideoData(metaData);
      
      setLoadingStep("Extracting transcript & generating summary...");
      const apiKey = localStorage.getItem("gemini_api_key");
      
      const sumRes = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {})
        },
        body: JSON.stringify({ 
          videoId: metaData.videoId, 
          title: metaData.title,
          author: metaData.author_name
        }),
      });
      const sumData = await sumRes.json();
      
      if (!sumRes.ok) throw new Error(sumData.error || "Failed to generate summary");
      
      setTranscript(sumData.transcript);
      setSummaryData(sumData.summary);
      
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-20 w-full max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-8 text-sm text-primary/90 relative overflow-hidden group shadow-[0_0_20px_rgba(147,51,234,0.15)]">
        <div className="absolute inset-0 bg-primary/20 blur-[10px] group-hover:bg-primary/30 transition-colors"></div>
        <Sparkles className="w-4 h-4 relative z-10" />
        <span className="relative z-10 font-bold tracking-wide">Powered by Advanced AI</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight mb-8 text-center text-white leading-tight">
        Summarize any <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">YouTube</span> video
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl text-center leading-relaxed">
        Get instant ultra-short summaries, detailed insights, key takeaways, and comprehensive transcripts directly from YouTube URLs.
      </p>

      <div className="w-full relative z-20 transition-all duration-700">
        <VideoInput onSubmit={handleSummarize} isLoading={isProcessing} />
      </div>

      {isProcessing && loadingStep && (
        <div className="mt-8 text-primary animate-pulse font-medium bg-primary/10 px-6 py-3 rounded-full border border-primary/20 flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingStep}
        </div>
      )}

      {error && (
        <div className="mt-8 w-full max-w-3xl flex items-start gap-4 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
          <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 text-red-500" />
          <div>
             <h3 className="font-semibold text-lg mb-1 text-red-500">Error</h3>
             <p>{error}</p>
          </div>
        </div>
      )}

      {(videoData || summaryData) && (
        <div className="mt-16 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 flex flex-col gap-8">
          {videoData && <VideoPreview video={videoData} />}
          {summaryData ? (
             <SummaryResults summary={summaryData} transcript={transcript} />
          ) : isProcessing ? (
             <div className="w-full h-80 bg-card/20 rounded-2xl border border-white/5 flex flex-col items-center justify-center glass-panel animate-pulse shadow-2xl">
                <Sparkles className="w-10 h-10 text-primary mb-4 animate-bounce" />
                <p className="text-muted-foreground font-medium text-lg">Reading transcript and analyzing content using AI...</p>
             </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
