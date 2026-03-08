import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import path from "node:path";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

const registryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../registry");

export default defineConfig({
	integrations: [react(), mdx()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": registryRoot
			}
		}
	}
});
