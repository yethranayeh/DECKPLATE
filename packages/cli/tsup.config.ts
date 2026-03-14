// DECKPLATE v0.0.0
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: false,
	clean: true,
	minify: true,
	treeshake: true,
	target: "esnext",
	banner: {
		js: "#!/usr/bin/env node",
	},
});
