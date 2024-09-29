import { useKeenSlider } from "keen-slider/react";
import CarouselContext from "lib/components/Carousel/Context";
import keenSliderCarousel, {
	CustomKeenSliderHooks,
} from "lib/components/Carousel/keenSliderPlugin";
import { easeInOutQuint } from "lib/helpers/easing";
import useControllableState from "lib/helpers/useControllableState";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from "react";

export interface CarouselConfigProps {
	duration?: number;
	delay?: number;
	easing?: (x: number) => number;
	playing?: boolean;
	onPlayingChange?: Dispatch<SetStateAction<boolean>>;
}

interface CarouselContextProviderProps extends CarouselConfigProps {
	children: ReactNode;
}
const CarouselContextProvider = ({
	children,
	delay = 2000,
	duration = 1000,
	easing = easeInOutQuint,
	playing,
	onPlayingChange,
}: CarouselContextProviderProps) => {
	const [loaded, setLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [slideCount, setSlideCount] = useState<number>(0);
	const [internalPlaying, setInternalPlaying] = useControllableState({
		state: playing,
		defaultState: true,
		onChange: onPlayingChange,
	});

	const [opacities, setOpacities] = useState<number[]>([]);

	const [sliderRef, instanceRef] = useKeenSlider<
		HTMLDivElement,
		unknown,
		unknown,
		CustomKeenSliderHooks
	>(
		{
			slides: slideCount,
			loop: true,
			defaultAnimation: {
				duration,
				easing,
			},
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			dragStarted(slider) {
				setInternalPlaying(false);
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

	const onPause = useCallback(() => {
		setInternalPlaying(false);
		instanceRef.current?.emit("stopped");
	}, [instanceRef, setInternalPlaying]);

	const handlePlayingChange = useCallback(() => {
		setInternalPlaying((prev) => {
			instanceRef.current?.emit(prev ? "stopped" : "resumed");
			return !prev;
		});
	}, [instanceRef, setInternalPlaying]);

	const value = useMemo(
		() => ({
			instanceRef,
			sliderRef,
			opacities,
			currentSlide,
			loaded,
			playing: internalPlaying,
			onPause,
			onPlayingChange: handlePlayingChange,
			slideCount,
			setSlideCount,
		}),
		[
			instanceRef,
			sliderRef,
			opacities,
			currentSlide,
			loaded,
			internalPlaying,
			onPause,
			handlePlayingChange,
			slideCount,
			setSlideCount,
		],
	);

	return (
		<CarouselContext.Provider value={value}>
			{children}
		</CarouselContext.Provider>
	);
};

export default CarouselContextProvider;
