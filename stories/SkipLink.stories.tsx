import type { Meta, StoryObj } from "@storybook/react";

import SkipLink from "lib/components/SkipLink";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Components/SkipLink",
	component: SkipLink,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { href: "#", children: "Skip to main content" },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {},
};

export const SkipToMainContent: Story = {
	decorators: [
		(Story) => (
			<>
				<Story />
				<nav style={{ display: "flex", gap: "1rem" }}>
					<a href="/legal">Legal</a>
					<a href="/privacy">Privacy</a>
					<a href="/terms">Terms</a>
				</nav>
				<main id="main">Main content</main>
				<a href="/other">Other</a>
			</>
		),
	],
	args: {
		href: "#main",
		children: "Skip to main content",
	},
};
