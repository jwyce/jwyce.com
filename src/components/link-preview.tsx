interface LinkPreviewProps {
	href: string;
	title: string;
	description: string;
	image?: string;
	favicon?: string;
}

export function LinkPreview({
	href,
	title,
	description,
	image,
	favicon,
}: LinkPreviewProps) {
	const domain = new URL(href).hostname;

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="block no-underline hover:no-underline"
		>
			<div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
				{image && (
					<img
						src={image}
						alt={title}
						className="h-full w-full object-cover transition-transform hover:scale-105"
					/>
				)}
				<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
					<div className="flex items-center gap-2 text-xs text-white/70">
						{favicon && (
							<img src={favicon} alt="" className="h-4 w-4 rounded" />
						)}
						<span>{domain}</span>
					</div>
					<h3 className="mt-1 font-semibold text-white">{title}</h3>
					<p className="mt-1 text-sm text-white/70 line-clamp-1">
						{description}
					</p>
				</div>
			</div>
		</a>
	);
}
