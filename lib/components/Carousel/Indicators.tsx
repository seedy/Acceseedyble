import CarouselIndicator from "lib/components/Carousel/Indicator";
import { CustomKeenSliderHooks } from "lib/components/Carousel/keenSliderPlugin";
import { KeenSliderInstance } from "keen-slider/react";
import {
	Children,
	cloneElement,
	FocusEvent,
	isValidElement,
	KeyboardEvent,
	MouseEvent,
	MutableRefObject,
	ReactNode,
	useRef,
} from "react";

interface CarouselIndicatorsProps {
	className?: string;
	children: ReactNode;
	currentSlide: number;
	instanceRef: MutableRefObject<KeenSliderInstance<
		{},
		{},
		CustomKeenSliderHooks
	> | null>;
	onPause?: (e: MouseEvent | KeyboardEvent | FocusEvent) => void;
	"aria-label"?: string;
}
const CarouselIndicators = ({
	className,
	children,
	currentSlide,
	instanceRef,
	onPause,
	"aria-label": ariaLabel = "Carousel controls",
}: CarouselIndicatorsProps) => {
	const childrenCount = Children.count(children);
	const indicatorRefList = useRef<(HTMLButtonElement | null)[]>(
		Array(childrenCount).fill(null),
	);

	const childIsNotValid = (child: unknown) => {
		console.error("CarouselIndicators children should be CarouselIndicator");
		console.error(child);
		return null;
	};

	return (
		<div
			className={className}
			role="tablist"
			aria-orientation="horizontal"
			aria-label={ariaLabel}
		>
			{Children.map(children, (child, key) =>
				isValidElement<typeof CarouselIndicator>(child)
					? cloneElement(child, {
							// @ts-expect-error
							id: `tab-${key}`,
							"aria-controls": `panel-${key}`,
							ref: (node: HTMLButtonElement) => {
								if (node) {
									indicatorRefList.current[key] = node;
								}
							},
							"aria-label": `Voir le slide n°${key + 1}`,
							role: "tab",
							"aria-selected": currentSlide === key,
							active: currentSlide === key,
							tabIndex: currentSlide === key ? 0 : -1,
							onFocus: (e: FocusEvent) => {
								if (onPause) {
									onPause(e);
								}
							},
							onKeyDown: (e: KeyboardEvent) => {
								if (e.key === "ArrowLeft") {
									if (onPause) {
										onPause(e);
									}
									const nextKey = key === 0 ? childrenCount - 1 : key - 1;
									indicatorRefList.current[nextKey]?.focus();
									return instanceRef.current?.moveToIdx(key - 1);
								}
								if (e.key === "ArrowRight") {
									if (onPause) {
										onPause(e);
									}
									const nextKey = key === childrenCount - 1 ? 0 : key + 1;
									indicatorRefList.current[nextKey]?.focus();
									return instanceRef.current?.moveToIdx(key + 1);
								}
							},
							onClick: (e: MouseEvent) => {
								if (onPause) {
									onPause(e);
								}
								instanceRef.current?.moveToIdx(key);
							},
						})
					: childIsNotValid(child),
			)}
		</div>
	);
};

export default CarouselIndicators;
