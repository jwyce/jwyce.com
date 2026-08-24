import { type NextRequest, NextResponse } from "next/server";
import { getKv } from "@/lib/kv";
import { getBasicAuthHeader, getCallbackUrl } from "@/lib/spotify";

export async function GET(request: NextRequest) {
	const error = request.nextUrl.searchParams.get("error");
	if (error) {
		return new NextResponse(`Spotify authorization failed: ${error}`, {
			status: 400,
		});
	}

	const code = request.nextUrl.searchParams.get("code");
	if (!code) {
		return new NextResponse("Missing authorization code.", { status: 400 });
	}

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: getBasicAuthHeader(),
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: getCallbackUrl(request.url),
		}),
	});

	const data = await response.json();
	if (!response.ok) {
		return new NextResponse(`Token exchange failed: ${JSON.stringify(data)}`, {
			status: 400,
		});
	}

	// Only the site owner may store credentials
	const me = await fetch("https://api.spotify.com/v1/me", {
		headers: { Authorization: `Bearer ${data.access_token}` },
	});
	const profile = await me.json();
	const allowedId = process.env.SPOTIFY_USER_ID;
	if (!allowedId || profile.id !== allowedId) {
		return new NextResponse(
			"This app only accepts authorization from the site owner.",
			{ status: 403 },
		);
	}

	const kv = getKv();
	if (!kv) {
		return new NextResponse(
			"KV is not configured — set KV_REST_API_URL and KV_REST_API_TOKEN.",
			{ status: 500 },
		);
	}
	await kv.set("spotify:refresh_token", data.refresh_token);

	return new NextResponse(
		"Spotify connected — refresh token stored. You can close this tab.",
		{ status: 200 },
	);
}
