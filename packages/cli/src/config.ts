import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

import { z } from "zod";

const configSchema = z.object({
	aliases: z
		.object({
			components: z.string().default("@/components/ui"),
			lib: z.string().default("@/lib"),
		})
		.default({}),
	cssImport: z.string().optional(),
	registryUrl: z.string().default("https://deckplate.netlify.app/r"),
});
const CONFIG_NAME = "deckplate.json";

export type DeckplateConfig = z.infer<typeof configSchema>;

export function loadConfig(cwd: string): DeckplateConfig {
	const configPath = resolve(cwd, CONFIG_NAME);
	if (!existsSync(configPath)) {
		return configSchema.parse({});
	}
	const raw = JSON.parse(readFileSync(configPath, "utf-8")) as unknown;
	return configSchema.parse(raw);
}
