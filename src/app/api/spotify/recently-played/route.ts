import { getRecentlyPlayed, type SpotifyTrack } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
	const response = await getRecentlyPlayed();

	if (!response.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch recently played" },
			{ status: response.status },
		);
	}

	const data = await response.json();
	const item = data.items[0];

	if (!item) {
		return NextResponse.json({ track: null });
	}

	const track: SpotifyTrack = item.track;

	return NextResponse.json({
		track: {
			name: track.name,
			artist: track.artists.map((a) => a.name).join(", "),
			album: track.album.name,
			image: track.album.images[0]?.url,
			url: track.external_urls.spotify,
		},
	});
}
