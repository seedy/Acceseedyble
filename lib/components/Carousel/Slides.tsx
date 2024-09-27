import { Children, ReactNode } from "react";

interface SlidesProps {
	children: ReactNode;
}
const Slides = ({ children }: SlidesProps) => {
	return (
		<>
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
		</>
	);
};

export default Slides;
