"use client";
import CarouselIndicators from "lib/components/Carousel/Indicators";
import CarouselPlayPause from "lib/components/Carousel/PlayPause";
import cn from "lib/helpers/cn";
import keenSliderCarousel, {
	CustomKeenSliderHooks,
} from "lib/components/Carousel/keenSliderPlugin";
// STYLES
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import {
	Children,
	FocusEvent,
	type KeyboardEvent,
	type MouseEvent,
	type ReactNode,
	useCallback,
	useMemo,
	useState,
} from "react";

interface CarouselProps {
	children: ReactNode;
	duration?: number;
	delay?: number;
	easing?: (x: number) => number;
	className?: string;
}

function easeInOutQuint(x: number): number {
	return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

const Carousel = ({
	children,
	duration = 1000,
	delay = 2000,
	easing = easeInOutQuint,
	className,
}: CarouselProps) => {
	const [loaded, setLoaded] = useState(false);
	const [playing, setPlaying] = useState(true);
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const slides = Children.count(children);
	const dotKeys = useMemo(() => Array.from(Array(slides).keys()), [slides]);

	const [opacities, setOpacities] = useState<number[]>([]);

	const [sliderRef, instanceRef] = useKeenSlider<
		HTMLDivElement,
		unknown,
		unknown,
		CustomKeenSliderHooks
	>(
		{
			slides,
			loop: true,
			defaultAnimation: {
				duration,
				easing,
			},
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			dragStarted(slider) {
				setPlaying(false);
				slider.emit("stopped");
			},
			detailsChanged(s) {
				const nextOpacities = s.track.details.slides.map(
					(slide) => slide.portion,
				);
				setOpacities(nextOpacities);
			},
			created() {
				setLoaded(true);
			},
		},
		[keenSliderCarousel(delay)],
	);

	const onPause = useCallback(
		(e?: MouseEvent | KeyboardEvent | FocusEvent) => {
			e?.stopPropagation();
			setPlaying(false);
			instanceRef.current?.emit("stopped");
		},
		[instanceRef],
	);

	const onResume = useCallback(
		(e?: MouseEvent) => {
			e?.stopPropagation();
			setPlaying(true);
			instanceRef.current?.emit("resumed");
		},
		[instanceRef],
	);

	return (
		<section
			aria-label="Photos de couverture"
			aria-roledescription="carousel"
			className={cn("relative flex flex-col items-center", className)}
		>
			{loaded && instanceRef.current && (
				<CarouselIndicators
					className={cn(
						"absolute bottom-4 left-0 z-10 flex pl-5",
						"md:bottom-0",
						"lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:pl-0",
					)}
					keys={dotKeys}
					currentSlide={currentSlide}
					instanceRef={instanceRef}
					onPause={onPause}
				/>
			)}
			<div
				className={cn("relative overflow-hidden", "keen-slider")}
				ref={sliderRef}
			>
				<CarouselPlayPause
					playing={playing}
					onPlayingChange={playing ? onPause : onResume}
				/>
				{Children.map(children, (child, index) => (
					<div
						className={cn("min-w-full flex-initial", "keen-slider__slide", {
							invisible: opacities[index] === 0,
						})}
						aria-hidden={opacities[index] === 0}
						role="tabpanel"
						aria-labelledby={`tab-${index}`}
						key={index}
						style={{ opacity: opacities[index] }}
					>
						{child}
					</div>
				))}
			</div>
		</section>
	);
};

export default Carousel;
