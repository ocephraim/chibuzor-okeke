// api/now-playing.js
// This runs on Vercel's Node.js runtime — CLIENT_SECRET is safe here.

import { env } from "node:process";
import { Buffer } from "node:buffer";

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  // Buffer is available in Node.js — perfectly safe in serverless
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return res.json();
}

// Vercel handler signature: (req, res)
export default async function handler(req, res) {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // 204 = nothing currently playing
    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const data = await response.json();

    if (!data || data.currently_playing_type !== "track") {
      return res.status(200).json({ isPlaying: false });
    }

    return res.status(200).json({
      isPlaying: data.is_playing,
      title: data.item?.name,
      artist: data.item?.artists?.map((a) => a.name).join(", "),
      album: data.item?.album?.name,
      albumImageUrl: data.item?.album?.images?.[0]?.url,
      songUrl: data.item?.external_urls?.spotify,
      progress: data.progress_ms,
      duration: data.item?.duration_ms,
    });
  } catch (err) {
    console.error("Spotify API error:", err);
    return res.status(500).json({ isPlaying: false });
  }
}
