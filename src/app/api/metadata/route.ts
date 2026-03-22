import { NextResponse } from "next/server";
import { extractVideoId, getVideoMetadata } from "@/lib/youtube";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const metadata = await getVideoMetadata(url);
    if (!metadata) {
      return NextResponse.json({ error: "Could not fetch video metadata" }, { status: 404 });
    }
    
    return NextResponse.json({
      videoId,
      title: metadata.title,
      author_name: metadata.author_name,
      thumbnail_url: metadata.thumbnail_url,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
