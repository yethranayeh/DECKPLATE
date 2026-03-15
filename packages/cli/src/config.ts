import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

import { z } from "zod";

import { REGISTRY_URL, SCHEMA_URL } from "./constants.js";

const configSchema = z.object({
	aliases: z
		.object({
			components: z.string().default("@/components/ui"),
			lib: z.string().default("@/lib"),
		})
		.default({}),
	cssImport: z.string().optional(),
	registryUrl: z.string().default(REGISTRY_URL),
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

export const configExists = (cwd: string) => existsSync(resolve(cwd, CONFIG_NAME));

export function writeConfig(cwd: string, config: DeckplateConfig): void {
	const configPath = resolve(cwd, CONFIG_NAME);
	const output = {
		$schema: SCHEMA_URL,
		...config,
	};
	writeFileSync(configPath, JSON.stringify(output, null, "\t") + "\n", "utf-8");
}
