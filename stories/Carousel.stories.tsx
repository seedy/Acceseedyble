import type { Meta, StoryObj } from "@storybook/react";

import CarouselRoot from "lib/components/Carousel/Root";
import CarouselIndicators from "lib/components/Carousel/Indicators";
import CarouselContent from "lib/components/Carousel/Content";
import CarouselSlide from "lib/components/Carousel/Slide";
import CarouselSlides from "lib/components/Carousel/Slides";
import CarouselPlayPause from "lib/components/Carousel/PlayPause";

import cn from "lib/helpers/cn";
import { ComponentProps, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Components/Carousel",
	component: CarouselRoot,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
} satisfies Meta<typeof CarouselRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ComponentProps<typeof CarouselRoot>) => {
	const [playing, setPlaying] = useState(true);

	return (
		<CarouselRoot playing={playing} onPlayingChange={setPlaying} {...args}>
			<CarouselIndicators
				className={cn(
					"absolute bottom-4 left-0 z-10 flex pl-5",
					"md:bottom-0",
					"lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:pl-0",
					"text-red-500",
				)}
			>
				<svg
					width="13"
					height="18"
					viewBox="0 0 13 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke="currentColor"
						d="M8.583 14.9612C8.00783 15.7404 7.41033 16.4332 6.62508 16.8777C6.60624 16.8765 6.58737 16.8748 6.56755 16.8723C6.50727 16.8336 6.44725 16.7965 6.39438 16.7637C6.35748 16.7409 6.32407 16.7202 6.29647 16.7027C6.19559 16.6385 6.12996 16.5909 6.08001 16.5433C3.98684 14.5492 2.60309 12.1005 1.67864 9.35244C1.51023 8.85181 1.39366 8.35035 1.27108 7.82301C1.21666 7.58887 1.16105 7.34963 1.09918 7.10309C1.09921 6.37999 1.10013 5.6654 1.13112 4.90009C1.59493 3.35576 2.60161 2.39488 4.03262 1.77986C4.34173 1.64701 4.64862 1.55583 4.98516 1.45584C5.12972 1.41289 5.27974 1.36832 5.43776 1.31812C6.15757 1.31816 6.86904 1.31936 7.63292 1.35184C7.77185 1.38796 7.89633 1.41273 8.00179 1.43359C8.12653 1.45826 8.21524 1.47582 8.29908 1.49991C9.85162 1.94587 11.0594 2.71243 11.7179 4.14334C11.8291 4.38501 11.9011 4.62157 11.9831 4.891C12.0186 5.00764 12.0559 5.13045 12.0992 5.26249C12.099 5.62329 12.0967 5.9721 12.0657 6.36854C11.9766 6.77084 11.9016 7.16868 11.8294 7.55133C11.8071 7.66919 11.7852 7.78561 11.7631 7.90027C11.6665 8.4037 11.5674 8.881 11.4351 9.34357C10.8519 11.3823 9.85123 13.2431 8.583 14.9612Z"
					/>
				</svg>
			</CarouselIndicators>
			<CarouselContent>
				<CarouselPlayPause
					getAriaLabel={(playing) =>
						playing ? "Mettre en pause" : "Reprendre"
					}
				>
					{playing ? (
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
								fill="currentColor"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path>
						</svg>
					) : (
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
								fill="currentColor"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path>
						</svg>
					)}
				</CarouselPlayPause>
				<CarouselSlides>
					<CarouselSlide>Slide 1</CarouselSlide>
					<CarouselSlide>Slide 2</CarouselSlide>
					<CarouselSlide>Slide 3</CarouselSlide>
				</CarouselSlides>
			</CarouselContent>
		</CarouselRoot>
	);
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		"aria-label": "Cover photos",
	},
	render: Template,
};
