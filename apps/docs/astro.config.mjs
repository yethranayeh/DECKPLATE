import path from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import deckplateTheme from "./src/shiki-deckplate-overrides.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registryRoot = path.resolve(__dirname, "../../registry");

export default defineConfig({
	integrations: [react(), mdx()],
	markdown: {
		shikiConfig: {
			theme: deckplateTheme,
		},
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": registryRoot,
			},
		},
	},
});
