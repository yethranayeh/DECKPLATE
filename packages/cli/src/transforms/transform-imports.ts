import type { RegistryFileType } from "@deckplate/registry/schema";

import type { DeckplateConfig } from "../config.js";

/**
 * Transform `@/` import paths in source code based on user's project configurations
 *
 * Registry source uses `@/lib/utils` and `@/components/ui/*` convention
 */
export function transformImports(
	source: string,
	_fileType: RegistryFileType, // TODO: perhaps "just in case" is not enough reason to pass this
	config: DeckplateConfig,
): string {
	let result = source;

	result = result.replace(/from\s+["']@\/lib\//g, `from "${config.aliases.lib}/`);

	result = result.replace(/from\s+["']@\/components\/ui\//g, `from "${config.aliases.components}/`);

	return result;
}
