import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/kv";
import { getTopArtists, type SpotifyArtist } from "@/lib/spotify";

export const revalidate = 86400;

const CACHE_KEY = "spotify:cache:top-artists";

export async function GET() {
	try {
		const response = await getTopArtists();
		if (!response.ok) {
			throw new Error(`Spotify returned ${response.status}`);
		}

		const data = await response.json();
		const payload = {
			artists: data.items.map((artist: SpotifyArtist) => ({
				name: artist.name,
				genres: artist.genres.slice(0, 2),
				image: artist.images[0]?.url,
				url: artist.external_urls.spotify,
			})),
		};

		await setCache(CACHE_KEY, payload);
		return NextResponse.json(payload);
	} catch (error) {
		console.error("top-artists fetch failed, serving cached data:", error);
		const cached = await getCache(CACHE_KEY);
		if (cached) return NextResponse.json(cached);
		return NextResponse.json(
			{ error: "Failed to fetch top artists" },
			{ status: 502 },
		);
	}
}
