import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/kv";
import { getRecentlyPlayed, type SpotifyTrack } from "@/lib/spotify";

export const revalidate = 60;

const CACHE_KEY = "spotify:cache:recently-played";

export async function GET() {
	try {
		const response = await getRecentlyPlayed();
		if (!response.ok) {
			throw new Error(`Spotify returned ${response.status}`);
		}

		const data = await response.json();
		const item = data.items[0];

		const track: SpotifyTrack | null = item?.track ?? null;
		const payload = {
			track: track
				? {
						name: track.name,
						artist: track.artists.map((a) => a.name).join(", "),
						album: track.album.name,
						image: track.album.images[0]?.url,
						url: track.external_urls.spotify,
					}
				: null,
		};

		await setCache(CACHE_KEY, payload);
		return NextResponse.json(payload);
	} catch (error) {
		console.error("recently-played fetch failed, serving cached data:", error);
		const cached = await getCache(CACHE_KEY);
		if (cached) return NextResponse.json(cached);
		return NextResponse.json(
			{ error: "Failed to fetch recently played" },
			{ status: 502 },
		);
	}
}
