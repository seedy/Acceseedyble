"use client";
import { ComponentProps, ReactNode } from "react";

type SlideAriaProps =
	| {
			"aria-description": string;
			"aria-describedby"?: never;
	  }
	| {
			"aria-describedby": string;
			"aria-description"?: never;
	  };

type SlideProps = ComponentProps<"img"> &
	SlideAriaProps & {
		children: ReactNode;
	};

const Slide = ({
	"aria-description": ariaDescription,
	"aria-describedby": ariaDescribedBy,
	alt,
	children,
	...rest
}: SlideProps) => {
	return (
		<div
			className="relative flex size-full items-center"
			aria-description={ariaDescription}
			aria-describedby={ariaDescribedBy}
		>
			{children}
			<div className="relative size-full">
				<img
					sizes="100vw"
					className="absolute h-full w-full inset-0 text-transparent object-cover rounded-none block "
					alt={alt}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default Slide;
