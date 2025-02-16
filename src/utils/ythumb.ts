export function getThumbUrl(url: string): string | null {
  const videoIdMatch: RegExpMatchArray | null = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*v\/|.*watch\?v=))([\w-]+)/
  );
  const videoId: string | null = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
