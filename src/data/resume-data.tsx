import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/svgs";
import { YearsCoding } from "@/components/years-coding";

export const RESUME_DATA = {
	name: "Jared Wyce",
	initials: "JW",
	location: "New Jersey, United States, EDT",
	locationLink: "https://www.google.com/maps/place/New+Jersey",
	about: (
		<span className="font-mono">
			Full Stack Engineer with <YearsCoding />+ years building quality products,
			developer platforms, and AI tooling.
		</span>
	),
	summary: (
		<>
			Full Stack Engineer who obsesses over UX and loves building the tools
			behind great products. Lately that means applied AI tooling and developer
			platforms like the multiplayer background-agent system and skills registry
			used daily across Fetch's engineering org. I care about developer
			experience, type safety, and helping teams ship faster with confidence.
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
			badges: ["Remote", "TypeScript", "React", "Svelte", "Node.js", "AWS"],
			title:
				"Frontend Engineer → Frontend Engineer II → Senior Software Engineer",
			start: "2023",
			end: "Present",
			description: (
				<div className="font-mono">
					Leading applied-AI and developer-platform initiatives with cross-org
					scope
					<ul className="list-outside list-disc pl-4">
						<li>
							Drove the architecture and vision for a{" "}
							<strong>multiplayer background-agent platform</strong>, from
							concept to pilot: custom agents, scheduled and triggered
							automations, and collaborative sessions across coding and
							non-coding workflows
						</li>
						<li>
							Built a <strong>harness-agnostic agent skills registry</strong>:
							100 builders publishing 200 skills
						</li>
						<li>
							Created an internal{" "}
							<strong>shadcn-style component registry</strong> used by 25
							teams, succeeding where component libraries, microfrontends, and
							web components hadn't
						</li>
						<li>
							Shipped <strong>create-fetch-app</strong>, a bootstrap CLI that
							cut new app setup from days to minutes and now powers 80
							dashboards across 20 teams
						</li>
						<li>
							Led the <strong>Frontend Guild</strong>, shaping best practices
							and the hiring and interview process
						</li>
						<li>
							Solo-built <strong>data-dense internal dashboards</strong> in
							Svelte: receipt-matching insights and a gamified audit flow
							that sped up quality reviews
						</li>
					</ul>
				</div>
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
		"Python",
		"React/Next.js/Tanstack",
		"Svelte",
		"Node.js",
		"C#",
		"Go",
		"Elixir",
		"SQL",
		"Vite",
		"Web Performance",
		"Tailwind CSS",
		"GraphQL",
		"AWS",
		"Cloudflare",
		"Modal",
		"API Design",
		"System Architecture",
		"Agentic Workflows",
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
