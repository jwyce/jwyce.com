import { getTopTracks, type SpotifyTrack } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
	const response = await getTopTracks();

	if (!response.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch top tracks" },
			{ status: response.status },
		);
	}

	const data = await response.json();
	const tracks = data.items.map((track: SpotifyTrack) => ({
		name: track.name,
		artist: track.artists.map((a) => a.name).join(", "),
		album: track.album.name,
		image: track.album.images[0]?.url,
		url: track.external_urls.spotify,
	}));

	return NextResponse.json({ tracks });
}
