import useCarouselContext from "lib/components/Carousel/Context/useCarouselContext";
import useTabPanel from "lib/components/Carousel/useTabPanel";
import cn from "lib/helpers/cn";
import { Children, ReactNode, useLayoutEffect } from "react";

interface SlidesProps {
	children: ReactNode;
}
const CarouselSlides = ({ children }: SlidesProps) => {
	const { opacities, setSlideCount } = useCarouselContext();
	const getTabPanel = useTabPanel(opacities);

	useLayoutEffect(() => {
		setSlideCount(Children.count(children));
	}, [children, setSlideCount]);

	return (
		<>
			{Children.map(children, (child, index) => (
				<div
					className={cn("min-w-full flex-initial", "keen-slider__slide", {
						invisible: opacities[index] === 0,
					})}
					{...getTabPanel(index)}
					key={index}
					style={{ opacity: opacities[index] }}
				>
					{child}
				</div>
			))}
		</>
	);
};

export default CarouselSlides;
