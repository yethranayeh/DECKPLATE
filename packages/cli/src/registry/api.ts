// DECKPLATE v0.0.0
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

import { REGISTRY_FILE_TYPES } from "@deckplate/registry/schema";
import { z } from "zod";

/**
 * A stricter CLI-side schema version of registry schem
 *
 * Built registry items will *always* have `content` populated
 */
const registryFileSchema = z.object({
	path: z.string(),
	type: z.enum(REGISTRY_FILE_TYPES),
	content: z.string(),
});

const registryItemSchema = z.object({
	name: z.string(),
	type: z.enum(REGISTRY_FILE_TYPES),
	description: z.string().optional(),
	dependencies: z.array(z.string()).optional(),
	registryDependencies: z.array(z.string()).optional(),
	cssImports: z.array(z.string()).optional(),
	files: z.array(registryFileSchema),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;

export async function fetchRegistryItem(registryUrl: string, name: string): Promise<RegistryItem> {
	const url = `${registryUrl}/${name}.json`;

	if (url.startsWith("file://")) {
		// So we can use file:// URLs for local dev
		const filePath = fileURLToPath(url);
		const raw = JSON.parse(readFileSync(filePath, "utf-8")) as unknown;
		return registryItemSchema.parse(raw);
	}

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`REGISTRY UNREACHABLE: ${url} (${res.status})`);
	}
	return registryItemSchema.parse(await res.json());
}

/**
 * Recursively resolve `registryDependencies`
 * @returns items in dependency order (dependencies first)
 */
export async function resolveRegistryTree(
	registryUrl: string,
	names: string[],
): Promise<RegistryItem[]> {
	const resolved = new Map<string, RegistryItem>();
	const queue = [...names];

	while (queue.length > 0) {
		const name = queue.shift()!;
		if (resolved.has(name)) continue;

		const item = await fetchRegistryItem(registryUrl, name);
		resolved.set(name, item);

		for (const dep of item.registryDependencies ?? []) {
			if (!resolved.has(dep)) {
				queue.push(dep);
			}
		}
	}

	/** Dependencies first, then the items that *depend* on those dependencies */
	const sorted: RegistryItem[] = [];
	const visited = new Set<string>();

	function visit(name: string) {
		if (visited.has(name)) return;
		visited.add(name);
		const item = resolved.get(name);
		if (!item) return;
		for (const dep of item.registryDependencies ?? []) {
			visit(dep);
		}
		sorted.push(item);
	}

	for (const name of resolved.keys()) {
		visit(name);
	}

	return sorted;
}
