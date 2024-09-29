import { ReactNode } from "react";
import cn from "lib/helpers/cn";
import useCarouselContext from "lib/components/Carousel/Context/useCarouselContext";

interface ContentProps {
	children: ReactNode;
}
const CarouselContent = ({ children }: ContentProps) => {
	const { sliderRef } = useCarouselContext();
	return (
		<div
			className={cn("relative overflow-hidden", "keen-slider")}
			ref={sliderRef}
		>
			{children}
		</div>
	);
};

export default CarouselContent;
