import { resolve } from "node:path";

/** @type {import('tailwindcss').Config} */
export default {
	content: [resolve(__dirname, "lib/**/*.{js,ts,jsx,tsx}")],
	theme: {
		extend: {},
	},
	plugins: [],
};
