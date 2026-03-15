import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import deckplateTheme from "./src/shiki-deckplate-overrides.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registryRoot = path.resolve(__dirname, "../../registry");
const registryPkg = JSON.parse(readFileSync(path.join(registryRoot, "package.json"), "utf-8"));

export default defineConfig({
	integrations: [react(), mdx()],
	markdown: {
		shikiConfig: {
			theme: deckplateTheme,
		},
	},
	vite: {
		plugins: [tailwindcss()],
		define: {
			__REGISTRY_VERSION__: JSON.stringify(registryPkg.version),
		},
		resolve: {
			alias: {
				"@": registryRoot,
			},
		},
	},
});
