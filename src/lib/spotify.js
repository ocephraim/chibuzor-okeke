// Calls your own serverless function — never talks to Spotify directly.
export async function getNowPlaying() {
  try {
    const res = await fetch("/api/now-playing");
    if (!res.ok) return { isPlaying: false };
    return res.json();
  } catch {
    return { isPlaying: false };
  }
}
