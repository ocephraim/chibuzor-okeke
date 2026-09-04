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
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const EMPTY_RESPONSE = { isPlaying: false };

function formatTrack(item, { isPlaying, progress = 0, mode }) {
  return {
    isPlaying,
    mode,
    title: item.name,
    artist: item.artists?.map((a) => a.name).join(", "),
    album: item.album?.name,
    albumImageUrl: item.album?.images?.[0]?.url,
    songUrl: item.external_urls?.spotify,
    progress,
    duration: item.duration_ms,
  };
}

async function getAccessToken() {
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

async function getRecentlyPlayed(accessToken) {
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) return null;

  const data = await res.json();
  const track = data.items?.[0]?.track;

  if (!track) return null;

  return formatTrack(track, { isPlaying: false, mode: "recent" });
}

async function respondWithRecent(res, accessToken) {
  const recent = await getRecentlyPlayed(accessToken);
  return res.status(200).json(recent ?? EMPTY_RESPONSE);
}

// Vercel handler signature: (req, res)
export default async function handler(req, res) {
  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      return res.status(500).json(EMPTY_RESPONSE);
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204) {
      return respondWithRecent(res, access_token);
    }

    if (!response.ok) {
      return respondWithRecent(res, access_token);
    }

    const data = await response.json();

    if (!data?.item || data.currently_playing_type !== "track") {
      return respondWithRecent(res, access_token);
    }

    if (data.is_playing) {
      return res.status(200).json(
        formatTrack(data.item, {
          isPlaying: true,
          progress: data.progress_ms,
          mode: "playing",
        }),
      );
    }

    return res.status(200).json(
      formatTrack(data.item, {
        isPlaying: false,
        progress: data.progress_ms,
        mode: "recent",
      }),
    );
  } catch (err) {
    console.error("Spotify API error:", err);
    return res.status(500).json(EMPTY_RESPONSE);
  }
}
