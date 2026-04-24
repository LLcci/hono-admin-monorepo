import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ["vue", "vue-router", "pinia"],
			dts: "src/auto-imports.d.ts",
			eslintrc: {
				enabled: true,
			},
		}),
		Components({
			dirs: ["src/components"],
			dts: "src/components.d.ts",
		}),
	],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:3001",
				changeOrigin: true,
			},
		},
	},
});
