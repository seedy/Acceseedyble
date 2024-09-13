import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts({ include: ["lib"], rollupTypes: true })],
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},
	resolve: {
		alias: {
			lib: "../lib",
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, "lib/main.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react-dom", "tailwindcss"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					tailwindcss: "tailwindcss",
				},
			},
		},
		sourcemap: true,
		emptyOutDir: true,
	},
});
