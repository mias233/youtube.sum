import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([a-zA-Z0-9_-]{11}).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function getVideoMetadata(url: string) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch metadata", error);
    return null;
  }
}

export async function getTranscript(videoId: string) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map(t => t.text).join(' ');
  } catch (error) {
    console.error("Failed to fetch transcript. It might be disabled or unavailable.", error);
    return null;
  }
}
