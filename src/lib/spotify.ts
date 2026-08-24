import { getKv } from "./kv";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
const RECENTLY_PLAYED_ENDPOINT =
	"https://api.spotify.com/v1/me/player/recently-played";

const REFRESH_TOKEN_KEY = "spotify:refresh_token";

export function getBasicAuthHeader(): string {
	return `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`;
}

export function getCallbackUrl(requestUrl: string): string {
	const url = new URL(requestUrl);
	// Spotify rejects "localhost" redirect URIs — must use the loopback IP
	if (url.hostname === "localhost") url.hostname = "127.0.0.1";
	return `${url.origin}/api/spotify/callback`;
}

async function getRefreshToken(): Promise<string> {
	const kv = getKv();
	if (kv) {
		try {
			const token = await kv.get<string>(REFRESH_TOKEN_KEY);
			if (token) return token;
		} catch (error) {
			console.warn(
				"Failed to read Spotify refresh token from KV, falling back to env:",
				error,
			);
		}
	}
	return process.env.SPOTIFY_REFRESH_TOKEN ?? "";
}

async function persistRefreshToken(token: string): Promise<void> {
	const kv = getKv();
	if (!kv) return;
	try {
		await kv.set(REFRESH_TOKEN_KEY, token);
	} catch (error) {
		console.warn("Failed to persist rotated Spotify refresh token:", error);
	}
}

async function getAccessToken() {
	const refresh_token = await getRefreshToken();

	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: getBasicAuthHeader(),
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(
			`Spotify token refresh failed: ${response.status} ${JSON.stringify(data)}. Refresh tokens expire after 6 months — visit /api/spotify/login to re-authorize.`,
		);
	}

	// Spotify may rotate the refresh token — persist the new one when issued
	if (data.refresh_token && data.refresh_token !== refresh_token) {
		await persistRefreshToken(data.refresh_token);
	}

	return data;
}

export async function getTopTracks() {
	const { access_token } = await getAccessToken();

	return fetch(`${TOP_TRACKS_ENDPOINT}?limit=10&time_range=medium_term`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
}

export async function getTopArtists() {
	const { access_token } = await getAccessToken();

	return fetch(`${TOP_ARTISTS_ENDPOINT}?limit=10&time_range=medium_term`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
}

export async function getRecentlyPlayed() {
	const { access_token } = await getAccessToken();

	return fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=1`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
}

export interface SpotifyTrack {
	name: string;
	artists: { name: string }[];
	album: {
		name: string;
		images: { url: string; height: number; width: number }[];
	};
	external_urls: { spotify: string };
}

export interface SpotifyArtist {
	name: string;
	genres: string[];
	images: { url: string; height: number; width: number }[];
	external_urls: { spotify: string };
}
