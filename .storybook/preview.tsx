import type { Preview } from "@storybook/react";
import "lib/main.css";
import Root from "./Root";

const preview: Preview = {
	decorators: [
		(Story) => (
			<Root>
				<Story />
			</Root>
		),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
