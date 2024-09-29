import { KeenSliderInstance } from "keen-slider/react";
import { CustomKeenSliderHooks } from "lib/components/Carousel/keenSliderPlugin";
import { createContext, MutableRefObject } from "react";

interface CarouselContextValue {
	instanceRef: MutableRefObject<KeenSliderInstance<
		unknown,
		unknown,
		CustomKeenSliderHooks
	> | null>;
	sliderRef: (node: HTMLDivElement | null) => void;
	opacities: number[];
	currentSlide: number;
	loaded: boolean;
	playing: boolean;
	onPause: () => void;
	onPlayingChange: () => void;
	slideCount: number;
	setSlideCount: (nextSlideCount: number) => void;
}

const CarouselContext = createContext<CarouselContextValue | undefined>(
	undefined,
);

export default CarouselContext;
