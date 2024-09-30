"use client";
import CarouselIndicator from "lib/components/Carousel/Indicator";
import { ReactNode, useMemo } from "react";
import useIndicatorsRovingTabIndex from "lib/components/Carousel/useIndicatorsRovingTabIndex";
import useCarouselContext from "lib/components/Carousel/Context/useCarouselContext";

// COMPONENTS

interface CarouselIndicatorsProps {
	className?: string;
	children: ReactNode;
	"aria-label"?: string;
	renderIndicatorAriaLabel?: (notZeroBasedIndex: number) => string;
}
const CarouselIndicators = ({
	className,
	children,
	"aria-label": ariaLabel = "Carousel controls",
	renderIndicatorAriaLabel = (notZeroBasedIndex: number) =>
		`Voir le slide n°${notZeroBasedIndex}`,
}: CarouselIndicatorsProps) => {
	const { slideCount, instanceRef, currentSlide, onPause, loaded } =
		useCarouselContext();
	const dotKeys = useMemo(
		() => Array.from(Array(slideCount).keys()),
		[slideCount],
	);

	const getIndicatorRovingTabIndexProps = useIndicatorsRovingTabIndex({
		count: slideCount,
		currentIndex: currentSlide,
		onPause,
		moveToIdx: instanceRef.current?.moveToIdx,
	});

	if (!loaded || !instanceRef.current) return null;

	return (
		<div
			className={className}
			role="tablist"
			aria-orientation="horizontal"
			aria-label={ariaLabel}
		>
			{dotKeys.map((key) => (
				<CarouselIndicator
					id={`tab-${key}`}
					key={key}
					aria-controls={`panel-${key}`}
					aria-label={renderIndicatorAriaLabel(key + 1)}
					role="tab"
					aria-selected={currentSlide === key}
					active={currentSlide === key}
					{...getIndicatorRovingTabIndexProps(key)}
				>
					{children}
				</CarouselIndicator>
			))}
		</div>
	);
};

export default CarouselIndicators;
