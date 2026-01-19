import { YearsCoding } from "@/components/years-coding";
import type { Route } from "next";
import Link from "next/link";

const featuredWritings: { title: string; href: Route }[] = [
	{ title: "Things I Believe", href: "/beliefs" },
	{ title: "My Stack", href: "/stack" },
];

interface RecentTrack {
	name: string;
	artist: string;
	url: string;
}

async function getRecentlyPlayed(): Promise<RecentTrack | null> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/spotify/recently-played`,
			{ next: { revalidate: 60 } },
		);
		if (!res.ok) return null;
		const data = await res.json();
		return data.track ?? null;
	} catch {
		return null;
	}
}

export default async function Home() {
	const recentTrack = await getRecentlyPlayed();

	return (
		<div className="space-y-8">
			<section>
				<h1 className="text-2xl font-bold mb-4">Jared Wyce</h1>
				<p className="leading-relaxed">
					I&apos;m a <Link href="/bio">software engineer</Link>. I work at{" "}
					<a
						href="https://fetch.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Fetch
					</a>{" "}
					building developer tooling and dashboards. I&apos;ve been coding
					professionally for <YearsCoding /> years.
				</p>
				<p className="leading-relaxed mt-4">
					When I&apos;m not coding, I&apos;m probably listening to{" "}
					<Link href="/music">music</Link>, playing{" "}
					<a
						href="https://fabtcg.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						fab
					</a>
					, or tweaking my{" "}
					<a
						href="https://github.com/jwyce/.dotfiles"
						target="_blank"
						rel="noopener noreferrer"
					>
						neovim config
					</a>
					.{" "}
					{recentTrack ? (
						<>
							I last listened to{" "}
							<a
								href={recentTrack.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{recentTrack.name}
							</a>{" "}
							by {recentTrack.artist}.
						</>
					) : null}
				</p>
			</section>

			<section>
				<p>Some of my favorite writing includes:</p>
				<ul className="mt-2 pl-6 space-y-1 list-[square] marker:text-muted-foreground">
					{featuredWritings.map((writing) => (
						<li key={writing.href}>
							<Link href={writing.href}>{writing.title}</Link>
						</li>
					))}
				</ul>
			</section>

			<section>
				<p>
					You can <Link href="/writings">read my writing</Link>, view my{" "}
					<Link href="/resume">resume</Link>, check out my{" "}
					<a
						href="https://github.com/jwyce"
						target="_blank"
						rel="noopener noreferrer"
					>
						code
					</a>
					, or follow me{" "}
					<a
						href="https://x.com/JaredWyce"
						target="_blank"
						rel="noopener noreferrer"
					>
						online
					</a>
					. <a href="mailto:wycejared@gmail.com">Reach out</a> if you want to
					chat.
				</p>
			</section>
		</div>
	);
}
