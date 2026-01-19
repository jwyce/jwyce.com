import { getTopArtists, type SpotifyArtist } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
	const response = await getTopArtists();

	if (!response.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch top artists" },
			{ status: response.status },
		);
	}

	const data = await response.json();
	const artists = data.items.map((artist: SpotifyArtist) => ({
		name: artist.name,
		genres: artist.genres.slice(0, 2),
		image: artist.images[0]?.url,
		url: artist.external_urls.spotify,
	}));

	return NextResponse.json({ artists });
}
