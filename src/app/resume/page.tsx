import { RESUME_DATA } from "@/data/resume-data";
import { Globe, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Resume",
};

export default function ResumePage() {
	return (
		<div className="space-y-6 print:space-y-2 [&_a]:no-underline [&_a:hover]:underline">
			<header className="flex items-center justify-between">
				<div className="flex-1 space-y-1.5">
					<h1 className="text-2xl font-bold print:text-xl">
						{RESUME_DATA.name}
					</h1>
					<p className="max-w-md text-pretty font-mono text-sm text-foreground/80 print:text-[11px] print:max-w-none">
						{RESUME_DATA.about}
					</p>
					<p className="max-w-md items-center text-pretty font-mono text-xs text-foreground">
						<a
							href={RESUME_DATA.locationLink}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex gap-x-1.5 align-baseline leading-none"
						>
							<MapPin className="size-3" />
							{RESUME_DATA.location}
						</a>
					</p>
					<div className="flex gap-x-1 pt-1 font-mono text-sm text-foreground/80 print:hidden">
						{RESUME_DATA.personalWebsiteUrl && (
							<a
								href={RESUME_DATA.personalWebsiteUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground no-underline"
							>
								<Globe className="size-4" />
							</a>
						)}
						<a
							href={`mailto:${RESUME_DATA.contact.email}`}
							className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground no-underline"
						>
							<Mail className="size-4" />
						</a>
						{RESUME_DATA.contact.social.map((social) => (
							<a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground no-underline"
							>
								<social.icon className="size-4" />
							</a>
						))}
					</div>
					<div className="hidden gap-x-2 font-mono text-sm text-foreground/80 print:flex print:text-[12px]">
						<a
							className="underline"
							href={`mailto:${RESUME_DATA.contact.email}`}
						>
							{RESUME_DATA.contact.email}
						</a>
						<span>/</span>
						<a className="underline" href={RESUME_DATA.personalWebsiteUrl}>
							{RESUME_DATA.personalWebsiteUrl?.replace("https://", "")}
						</a>
					</div>
				</div>
				<Image
					src={RESUME_DATA.avatarUrl}
					alt={RESUME_DATA.name}
					width={112}
					height={112}
					className="size-28 rounded-xl print:hidden"
				/>
			</header>

			<section className="flex min-h-0 flex-col gap-y-2 print:gap-y-1">
				<h2 className="text-xl font-bold print:text-lg">Work Experience</h2>
				<div className="space-y-4 print:space-y-2">
					{RESUME_DATA.work.map((work) => (
						<div
							key={work.company}
							className="rounded-lg py-1 print:py-0 print:break-inside-avoid"
						>
							<div className="flex flex-col space-y-1 print:space-y-0.5">
								<div className="flex items-center justify-between gap-x-2 text-base">
									<h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none print:text-sm">
										<a
											href={work.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											{work.company}
										</a>
										<span className="hidden sm:inline-flex gap-x-1">
											{work.badges.map((badge) => (
												<span
													key={badge}
													className="inline-flex items-center rounded-md border border-transparent bg-secondary/80 px-2 py-0.5 text-xs font-semibold font-mono text-secondary-foreground transition-colors hover:bg-secondary/60 print:px-1 print:py-0.5 print:text-[9px] print:leading-tight"
												>
													{badge}
												</span>
											))}
										</span>
									</h3>
									<div className="text-sm tabular-nums text-muted-foreground print:text-xs">
										{work.start} - {work.end}
									</div>
								</div>
								<h4 className="font-mono text-sm font-semibold leading-none print:text-[11px]">
									{work.title}
								</h4>
							</div>
							<div className="mt-2 text-xs text-foreground/80 print:mt-1 print:text-[10px] text-pretty">
								{work.description}
							</div>
							<div className="mt-2 flex flex-wrap gap-1 sm:hidden">
								{work.badges.map((badge) => (
									<span
										key={badge}
										className="inline-flex items-center rounded-md border border-transparent bg-secondary/80 px-2 py-0.5 text-xs font-semibold font-mono text-secondary-foreground transition-colors hover:bg-secondary/60"
									>
										{badge}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="flex min-h-0 flex-col gap-y-2 print:gap-y-0.5">
				<h2 className="text-xl font-bold print:text-lg">Education</h2>
				<div className="space-y-4">
					{RESUME_DATA.education.map((edu) => (
						<div key={edu.school} className="rounded-lg">
							<div className="flex flex-col space-y-1.5">
								<div className="flex items-center justify-between gap-x-2 text-base">
									<h3 className="font-semibold leading-none">{edu.school}</h3>
									<div className="text-sm tabular-nums text-muted-foreground">
										{edu.start} - {edu.end}
									</div>
								</div>
							</div>
							<div className="mt-2 text-xs text-foreground/80 font-mono print:mt-1 print:text-[10px] text-pretty">
								{edu.degree}
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="flex min-h-0 flex-col gap-y-2 print:gap-y-0.5">
				<h2 className="text-xl font-bold print:text-lg">Skills</h2>
				<div className="flex flex-wrap gap-1">
					{RESUME_DATA.skills.map((skill) => (
						<span
							key={skill}
							className="inline-flex items-center rounded-md border border-transparent bg-primary/80 px-2 py-0.5 text-xs font-bold font-mono text-primary-foreground transition-colors hover:bg-primary/60 print:px-1 print:py-0.5 print:text-[10px]"
						>
							{skill}
						</span>
					))}
				</div>
			</section>

			<section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1 print:pt-1">
				<h2 className="text-xl font-bold print:text-lg">Side Projects</h2>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2 print:gap-2 max-w-2xl print:max-w-xl">
					{RESUME_DATA.projects.map((project) => (
						<div
							key={project.title}
							className="flex h-full flex-col overflow-hidden rounded-lg border p-4 hover:bg-muted/50 transition-colors print:p-3"
						>
							<div className="flex flex-col space-y-1.5">
								<div className="space-y-1">
									<h3 className="text-base font-semibold leading-none tracking-tight print:text-sm">
										<a
											href={project.link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1"
										>
											{project.title}
											<span className="size-1 rounded-full bg-green-500 print:hidden" />
										</a>
									</h3>
									<p className="text-pretty font-mono text-xs text-foreground/80 print:text-[9px] print:leading-tight">
										{project.description}
									</p>
								</div>
							</div>
							<div className="mt-auto pt-2 print:pt-1">
								<div className="flex flex-wrap gap-1">
									{project.techStack.map((tech) => (
										<span
											key={tech}
											className="inline-flex items-center rounded-md border border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 px-1.5 py-0.5 text-[10px] font-semibold font-mono transition-colors hover:bg-secondary/90 print:px-1 print:py-0 print:text-[8px] print:leading-tight"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
