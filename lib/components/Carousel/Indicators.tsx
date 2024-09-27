"use client";
import CarouselIndicator from "lib/components/Carousel/Indicator";
import { CustomKeenSliderHooks } from "lib/components/Carousel/keenSliderPlugin";
import { KeenSliderInstance } from "keen-slider/react";
import {
	Children,
	cloneElement,
	ComponentProps,
	FocusEvent,
	isValidElement,
	KeyboardEvent,
	MouseEvent,
	MutableRefObject,
	ReactNode,
} from "react";
import useIndicatorsRovingTabIndex from "lib/components/Carousel/useIndicatorsRovingTabIndex";

// HELPERS
const childIsNotValid = (child: unknown) => {
	console.error("CarouselIndicators children should be CarouselIndicator");
	console.error(child);
	return null;
};

// COMPONENTS

interface CarouselIndicatorsProps {
	className?: string;
	children: ReactNode;
	currentSlide: number;
	instanceRef: MutableRefObject<KeenSliderInstance<
		unknown,
		unknown,
		CustomKeenSliderHooks
	> | null>;
	onPause?: (e: MouseEvent | KeyboardEvent | FocusEvent) => void;
	"aria-label"?: string;
	renderIndicatorAriaLabel?: (notZeroBasedIndex: number) => string;
}
const CarouselIndicators = ({
	className,
	children,
	currentSlide,
	instanceRef,
	onPause,
	"aria-label": ariaLabel = "Carousel controls",
	renderIndicatorAriaLabel = (notZeroBasedIndex: number) =>
		`Voir le slide n°${notZeroBasedIndex}`,
}: CarouselIndicatorsProps) => {
	const getIndicatorRovingTabIndexProps = useIndicatorsRovingTabIndex({
		count: childrenCount,
		currentIndex: currentSlide,
		onPause,
		moveToIdx: instanceRef.current?.moveToIdx,
	});

	return (
		<div
			className={className}
			role="tablist"
			aria-orientation="horizontal"
			aria-label={ariaLabel}
		>
			{Children.map(children, (child, key) =>
				isValidElement<ComponentProps<typeof CarouselIndicator>>(child)
					? cloneElement(child, {
							id: `tab-${key}`,
							"aria-controls": `panel-${key}`,
							"aria-label": renderIndicatorAriaLabel(key + 1),
							role: "tab",
							"aria-selected": currentSlide === key,
							active: currentSlide === key,
							...getIndicatorRovingTabIndexProps(key),
						})
					: childIsNotValid(child),
			)}
		</div>
	);
};

export default CarouselIndicators;
