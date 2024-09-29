"use client";
import cn from "lib/helpers/cn";

// STYLES
import "keen-slider/keen-slider.min.css";
import { type ReactNode } from "react";
import CarouselContextProvider, {
	CarouselConfigProps,
} from "lib/components/Carousel/Context/Provider";

interface CarouselProps extends CarouselConfigProps {
	children?: ReactNode;
	className?: string;
	"aria-label": string;
}
const CarouselRoot = ({
	children,
	duration,
	delay,
	easing,
	className,
	"aria-label": ariaLabel,
	playing,
	onPlayingChange,
}: CarouselProps) => (
	<section
		aria-label={ariaLabel}
		aria-roledescription="carousel"
		className={cn("relative flex flex-col items-center", className)}
	>
		<CarouselContextProvider
			duration={duration}
			delay={delay}
			easing={easing}
			playing={playing}
			onPlayingChange={onPlayingChange}
		>
			{children}
		</CarouselContextProvider>
	</section>
);

export default CarouselRoot;
