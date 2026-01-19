import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://jwyce.com"),
	title: {
		default: "Jared Wyce",
		template: "%s | Jared Wyce",
	},
	description:
		"Software engineer, Flesh and Blood player, and music enthusiast.",
	openGraph: {
		title: "Jared Wyce",
		description:
			"Software engineer, Flesh and Blood player, and music enthusiast.",
		url: "https://jwyce.com",
		siteName: "Jared Wyce",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "https://avatars.githubusercontent.com/u/16946573?v=4",
				width: 460,
				height: 460,
				alt: "Jared Wyce",
			},
		],
	},
	twitter: {
		card: "summary",
		title: "Jared Wyce",
		description:
			"Software engineer, Flesh and Blood player, and music enthusiast.",
		creator: "@JaredWyce",
		images: ["https://avatars.githubusercontent.com/u/16946573?v=4"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
			>
				<main className="max-w-2xl mx-auto px-6 py-16 print:p-11 print:max-w-none">
					{children}
				</main>
			</body>
		</html>
	);
}
