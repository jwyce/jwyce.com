import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/svgs";
import { YearsCoding } from "@/components/years-coding";

export const RESUME_DATA = {
	name: "Jared Wyce",
	initials: "JW",
	location: "New Jersey, United States, EDT",
	locationLink: "https://www.google.com/maps/place/New+Jersey",
	about: (
		<span className="font-mono">
			Highly motivated Full Stack Engineer with <YearsCoding />+ years building
			high-quality products.
		</span>
	),
	summary: (
		<>
			Full Stack Engineer who loves building great user experiences and the
			tools that make them possible. Experienced in React and Node.js — from
			distributed loan systems to real-time multiplayer games. I care about
			developer experience, type safety, and helping teams ship with confidence.
		</>
	),
	avatarUrl: "https://avatars.githubusercontent.com/u/16946573?v=4",
	personalWebsiteUrl: "https://jwyce.com",
	contact: {
		email: "wycejared@gmail.com",
		social: [
			{
				name: "GitHub",
				url: "https://github.com/jwyce",
				icon: GitHubIcon,
			},
			{
				name: "LinkedIn",
				url: "https://linkedin.com/in/jaredwyce",
				icon: LinkedInIcon,
			},
			{
				name: "X",
				url: "https://x.com/JaredWyce",
				icon: XIcon,
			},
		],
	},
	education: [
		{
			school: "Rutgers University",
			degree: "BS Computer Science, Mathematics Minor (GPA: 3.5)",
			start: "2016",
			end: "2020",
		},
	],
	work: [
		{
			company: "Fetch",
			link: "https://fetch.com/",
			badges: ["Remote", "Svelte", "Node.js", "AWS"],
			title: "Frontend Engineer → Frontend Guild Lead",
			start: "2023",
			end: "Present",
			description: (
				<span className="font-mono">
					Building internal dashboards and frontend tooling to improve developer
					experience for web teams. Lead Frontend Guild fostering collaboration,
					establishing best practices, and organizing meetups; involved in
					hiring and designing the interview process.
				</span>
			),
		},
		{
			company: "Nelnet",
			link: "https://nelnet.com",
			badges: ["Remote", "Node.js", "React", "Microservices"],
			title: "Software Engineer",
			start: "2022",
			end: "2023",
			description: (
				<div className="font-mono">
					Developed distributed student loan origination/servicing systems
					<ul className="list-outside list-disc pl-4">
						<li>
							Led cross-functional collaboration to establish standardized dev
							practices and modern templates
						</li>
						<li>
							Championed end-to-end <strong>type safety</strong>; improved
							stability of microservices and frontends
						</li>
						<li>
							Prototyped a <strong>transpiler</strong> to migrate from custom
							DSL to TypeScript
						</li>
						<li>
							Mentored junior engineers; led technical discussions and code
							reviews
						</li>
					</ul>
				</div>
			),
		},
		{
			company: "Holtec International",
			link: "https://holtecinternational.com",
			badges: ["Camden, NJ", ".NET", "jQuery", "SQL Server"],
			title: "Software Engineer",
			start: "2019",
			end: "2022",
			description: (
				<div className="font-mono">
					Developed mission-critical internal tooling
					<ul className="list-outside list-disc pl-4">
						<li>
							Built custom <strong>DocuSign alternative</strong> for versioning
							engineering drawings and procedures
						</li>
						<li>
							Led <strong>React Native</strong> offline-first app for nuclear
							cask decommissioning/installation
						</li>
						<li>
							Created <strong>IoT</strong> factory machine utilization dashboard
							proof of concept
						</li>
					</ul>
				</div>
			),
		},
	],
	skills: [
		"TypeScript",
		"JavaScript",
		"React/Next.js/Tanstack",
		"Svelte",
		"Node.js",
		"C#",
		"Go",
		"Elixir",
		"SQL",
		"Vite",
		"Tailwind CSS",
		"GraphQL",
		"AWS",
		"Design Systems",
		"System Architecture",
		"Remote Team Leadership",
		"Agentic Workflows",
		"Neovim",
		"Opencode",
	],
	projects: [
		{
			title: "Gungi.io",
			techStack: [
				"React",
				"TypeScript",
				"Node.js",
				"Tanstack Start",
				"Convex",
				"Polar.sh",
			],
			description:
				"Real-time multiplayer strategy game from Hunter x Hunter. Features matchmaking, AI opponent, leaderboards, and social features.",
			link: {
				label: "gungi.io",
				href: "https://gungi.io",
			},
		},
	],
} as const;
