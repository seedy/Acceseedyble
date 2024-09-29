import CarouselContext from "lib/components/Carousel/Context";
import { useContext } from "react";

const useCarouselContext = () => {
	const context = useContext(CarouselContext);
	if (context === undefined) {
		throw new Error(
			"useCarouselContext must be used within a CarouselProvider",
		);
	}
	return context;
};

export default useCarouselContext;
