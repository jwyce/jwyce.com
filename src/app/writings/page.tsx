import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Writings",
	description: "Thoughts on software, technology, and life.",
};

const writings: { title: string; href: Route }[] = [
	{ title: "Things I Believe", href: "/beliefs" },
	{ title: "My Stack", href: "/stack" },
];

export default function WritingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Writings</h1>
				<p className="text-muted-foreground">
					<Link href="/" className="no-underline hover:no-underline">
						By Jared Wyce
					</Link>
				</p>
			</div>
			<p>Here&apos;s a list of my writing:</p>

			{writings.length === 0 ? (
				<p className="text-muted-foreground">
					No writings yet. Check back soon!
				</p>
			) : (
				<ul className="mt-2 pl-6 space-y-1 list-[square] marker:text-muted-foreground">
					{writings.map((writing) => (
						<li key={writing.href}>
							<Link href={writing.href}>{writing.title}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
