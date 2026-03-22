import { Clock } from "lucide-react";

export interface VideoData {
  title: string;
  author_name: string;
  thumbnail_url: string;
  duration?: string;
}

export default function VideoPreview({ video }: { video: VideoData }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-card/60 border border-white/10 rounded-2xl overflow-hidden glass-panel p-2 animate-in fade-in zoom-in duration-500 shadow-2xl">
      <div className="relative w-full md:w-72 aspect-video rounded-xl overflow-hidden shrink-0 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
        />
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1 backdrop-blur-sm z-20">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center py-4 pr-4">
        <h3 className="text-xl md:text-2xl font-bold line-clamp-2 leading-tight mb-3 text-white group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-muted-foreground flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            {video.author_name.charAt(0)}
          </span>
          {video.author_name}
        </p>
      </div>
    </div>
  );
}
