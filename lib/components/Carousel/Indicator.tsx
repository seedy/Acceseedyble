import { cva } from "class-variance-authority";
import cn from "lib/helpers/cn";
import { ComponentProps, forwardRef, ReactNode } from "react";

const indicatorVariants = cva("aspect-square h-auto w-indicator text-current", {
	variants: {
		active: {
			true: ["fill-current"],
		},
	},
});

interface CarouselIndicatorProps extends ComponentProps<"button"> {
	active?: boolean;
	children?: ReactNode;
}
const CarouselIndicator = forwardRef<HTMLButtonElement, CarouselIndicatorProps>(
	({ active, children, className, ...props }, forwardedRef) => {
		const indicatorVariantsClassName = indicatorVariants({ active });
		return (
			<button
				ref={forwardedRef}
				data-active={active}
				className={cn(
					"m-0 inline-flex items-center justify-center rounded-round border-none text-current",
					indicatorVariantsClassName,
					"focus-visible:outline-current hover:cursor-pointer",
					className,
				)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

CarouselIndicator.displayName = "CarouselIndicator";

export default CarouselIndicator;
