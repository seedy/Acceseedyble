import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
  ],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true,
  }
})
