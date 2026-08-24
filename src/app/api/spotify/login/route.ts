import { type NextRequest, NextResponse } from "next/server";
import { getCallbackUrl } from "@/lib/spotify";

const SCOPES = "user-top-read user-read-recently-played";

export function GET(request: NextRequest) {
	const params = new URLSearchParams({
		client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
		response_type: "code",
		redirect_uri: getCallbackUrl(request.url),
		scope: SCOPES,
	});

	return NextResponse.redirect(
		`https://accounts.spotify.com/authorize?${params.toString()}`,
	);
}
