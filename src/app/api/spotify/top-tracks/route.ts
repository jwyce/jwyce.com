import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/kv";
import { getTopTracks, type SpotifyTrack } from "@/lib/spotify";

export const revalidate = 86400;

const CACHE_KEY = "spotify:cache:top-tracks";

export async function GET() {
	try {
		const response = await getTopTracks();
		if (!response.ok) {
			throw new Error(`Spotify returned ${response.status}`);
		}

		const data = await response.json();
		const payload = {
			tracks: data.items.map((track: SpotifyTrack) => ({
				name: track.name,
				artist: track.artists.map((a) => a.name).join(", "),
				album: track.album.name,
				image: track.album.images[0]?.url,
				url: track.external_urls.spotify,
			})),
		};

		await setCache(CACHE_KEY, payload);
		return NextResponse.json(payload);
	} catch (error) {
		console.error("top-tracks fetch failed, serving cached data:", error);
		const cached = await getCache(CACHE_KEY);
		if (cached) return NextResponse.json(cached);
		return NextResponse.json(
			{ error: "Failed to fetch top tracks" },
			{ status: 502 },
		);
	}
}
