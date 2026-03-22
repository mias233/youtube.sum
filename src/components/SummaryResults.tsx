import { useState } from "react";
import { FileText, List, Lightbulb, MessageSquareQuote, Copy, Check } from "lucide-react";

export interface SummaryData {
  ultraShort: string;
  concise: string;
  detailed: string;
  keyPoints: string[];
  insights: string[];
}

interface SummaryResultsProps {
  summary: SummaryData;
  transcript: string;
}

export default function SummaryResults({ summary, transcript }: SummaryResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [copied, setCopied] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "summary", label: "Summary", icon: <FileText className="w-4 h-4" /> },
    { id: "points", label: "Key Points", icon: <List className="w-4 h-4" /> },
    { id: "insights", label: "Insights", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "transcript", label: "Transcript", icon: <MessageSquareQuote className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full bg-card/40 border border-white/5 rounded-2xl overflow-hidden glass-panel flex flex-col mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap relative ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 relative min-h-[300px]">
        {/* Copy Button */}
        <button
          onClick={() => {
            if (activeTab === "summary") handleCopy(summary.detailed, "summary");
            if (activeTab === "points") handleCopy(summary.keyPoints.join("\\n"), "points");
            if (activeTab === "insights") handleCopy(summary.insights.join("\\n"), "insights");
            if (activeTab === "transcript") handleCopy(transcript, "transcript");
          }}
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm z-10"
        >
          {copied === activeTab ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied === activeTab ? "Copied!" : "Copy text"}</span>
        </button>

        <div className="prose prose-invert max-w-none prose-p:leading-relaxed text-slate-200">
          {activeTab === "summary" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 relative z-10 text-[0.8rem]">TL;DR</h3>
                <p className="text-lg font-medium relative z-10 leading-snug">{summary.ultraShort}</p>
              </div>
              <div className="pl-2 border-l-2 border-primary/30">
                <h3 className="text-xl font-semibold mb-2 text-white/90">Concise Summary</h3>
                <p className="text-muted-foreground">{summary.concise}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-white/90">Detailed Summary</h3>
                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: summary.detailed }} />
              </div>
            </div>
          )}

          {activeTab === "points" && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
                <List className="w-5 h-5" /> Key Takeaways
              </h3>
              <ul className="space-y-4">
                {summary.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary shrink-0 text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300" dangerouslySetInnerHTML={{ __html: point }} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "insights" && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-semibold mb-6 text-pink-500 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Key Insights & Advice
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {summary.insights.map((insight, idx) => (
                  <div key={idx} className="p-5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                    <Lightbulb className="w-5 h-5 text-pink-500 mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-300 leading-relaxed text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transcript" && (
            <div className="animate-in fade-in duration-300 space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3 text-yellow-500/90 mb-4">
                <MessageSquareQuote className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">This is the raw transcript extracted from the video captions. It may contain minor inaccuracies depending on the source quality.</p>
              </div>
              <div className="h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-black/20 p-4 rounded-xl border border-white/5">
                <p className="whitespace-pre-wrap leading-loose font-mono text-sm opacity-80">{transcript}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
