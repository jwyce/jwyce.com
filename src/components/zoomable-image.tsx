"use client";

import type { ReactElement } from "react";
import { useLayoutEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ZoomableImageProps {
	src: string;
	alt: string;
	caption?: string;
	className?: string;
}

export function ZoomableImage({
	src,
	alt,
	caption,
	className,
}: ZoomableImageProps) {
	const CustomZoomContent = ({
		buttonUnzoom,
		modalState,
		img,
	}: {
		buttonUnzoom: ReactElement;
		modalState: string;
		img: ReactElement | null;
	}) => {
		const [isLoaded, setIsLoaded] = useState(false);

		useLayoutEffect(() => {
			if (modalState === "LOADED") {
				setIsLoaded(true);
			} else if (modalState === "UNLOADING") {
				setIsLoaded(false);
			}
		}, [modalState]);

		return (
			<>
				{buttonUnzoom}
				{img}
				{caption && (
					<div
						className={`fixed bottom-0 left-0 right-0 bg-background py-4 text-center text-sm text-foreground transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
					>
						{caption}
					</div>
				)}
			</>
		);
	};

	return (
		<Zoom ZoomContent={caption ? CustomZoomContent : undefined}>
			<img src={src} alt={alt} className={className} />
		</Zoom>
	);
}
