import path from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const registryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../registry");

export default defineConfig({
	integrations: [react(), mdx()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": registryRoot,
			},
		},
	},
});
