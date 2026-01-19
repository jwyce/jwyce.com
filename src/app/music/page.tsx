import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Music",
	description: "My top artists and tracks on Spotify.",
};

interface Track {
	name: string;
	artist: string;
	album: string;
	image: string;
	url: string;
}

interface Artist {
	name: string;
	genres: string[];
	image: string;
	url: string;
}

function getBaseUrl() {
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}

async function getTopTracks(): Promise<Track[]> {
	try {
		const res = await fetch(`${getBaseUrl()}/api/spotify/top-tracks`, {
			next: { revalidate: 86400 },
		});
		if (!res.ok) return [];
		const data = await res.json();
		return data.tracks ?? [];
	} catch {
		return [];
	}
}

async function getTopArtists(): Promise<Artist[]> {
	try {
		const res = await fetch(`${getBaseUrl()}/api/spotify/top-artists`, {
			next: { revalidate: 86400 },
		});
		if (!res.ok) return [];
		const data = await res.json();
		return data.artists ?? [];
	} catch {
		return [];
	}
}

export default async function MusicPage() {
	const [tracks, artists] = await Promise.all([
		getTopTracks(),
		getTopArtists(),
	]);

	return (
		<div className="space-y-10">
			<div>
				<h1 className="text-2xl font-bold">Music</h1>
				<p className="text-muted-foreground">
					<Link href="/" className="no-underline hover:no-underline">
						My top artists and tracks from Spotify.
					</Link>
				</p>
			</div>

			<section>
				<h2 className="text-lg font-semibold mb-4">Top Artists</h2>
				{artists.length === 0 ? (
					<p className="text-muted-foreground text-sm">
						Connect Spotify to see your top artists.
					</p>
				) : (
					<div className="space-y-3">
						{artists.map((artist, i) => (
							<a
								key={artist.name}
								href={artist.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 no-underline group"
							>
								<span className="text-muted-foreground w-5 text-sm">
									{i + 1}
								</span>
								<div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
									{artist.image && (
										<Image
											src={artist.image}
											alt={artist.name}
											fill
											className="object-cover"
										/>
									)}
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium truncate group-hover:underline">
										{artist.name}
									</p>
									{artist.genres.length > 0 && (
										<p className="text-xs text-muted-foreground truncate">
											{artist.genres.join(", ")}
										</p>
									)}
								</div>
							</a>
						))}
					</div>
				)}
			</section>

			<section>
				<h2 className="text-lg font-semibold mb-4">Top Tracks</h2>
				{tracks.length === 0 ? (
					<p className="text-muted-foreground text-sm">
						Connect Spotify to see your top tracks.
					</p>
				) : (
					<div className="space-y-3">
						{tracks.map((track, i) => (
							<a
								key={`${track.name}-${track.artist}`}
								href={track.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 no-underline group"
							>
								<span className="text-muted-foreground w-5 text-sm">
									{i + 1}
								</span>
								<div className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
									{track.image && (
										<Image
											src={track.image}
											alt={track.album}
											fill
											className="object-cover"
										/>
									)}
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium truncate group-hover:underline">
										{track.name}
									</p>
									<p className="text-xs text-muted-foreground truncate">
										{track.artist}
									</p>
								</div>
							</a>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
