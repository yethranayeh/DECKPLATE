import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";

import { loadConfig } from "../config.js";
import { resolveRegistryTree, type RegistryItem } from "../registry/api.js";
import {
	log,
	findProjectRoot,
	detectPackageManager,
	resolveOutputPath,
	transformImports,
} from "../utils/index.js";

export async function add(component: string, options: Record<string, unknown>): Promise<void> {
	const force = Boolean(options.force);
	const cwd = process.cwd();
	const projectRoot = findProjectRoot(cwd);
	const config = loadConfig(projectRoot);

	if (process.env.DECKPLATE_REGISTRY_URL) {
		// override for local testing purposes
		config.registryUrl = process.env.DECKPLATE_REGISTRY_URL;
	}

	log.divider();
	log.info(`INTEGRATING: ${component.toUpperCase()}`);
	log.divider();

	let items: RegistryItem[];
	try {
		items = await resolveRegistryTree(config.registryUrl, [component]);
	} catch {
		log.error(`NOT FOUND: "${component}"`);
		log.dim(`  REGISTRY // SRC: ${config.registryUrl}`);
		process.exit(1);
	}

	let writtenCount = 0;
	for (const item of items) {
		for (const file of item.files) {
			const outputPath = resolveOutputPath(file.path, file.type, config);
			const absolute = resolve(projectRoot, outputPath);
			const dir = dirname(absolute);

			if (!existsSync(dir)) {
				mkdirSync(dir, { recursive: true });
			}

			if (existsSync(absolute) && !force) {
				log.warn(`EXISTS: ${outputPath} // use --force to overwrite`);
				continue;
			}

			// Transform import paths for consumer's aliases
			/**
			 * It is important that the user's own aliases are
			 * 	taken into consideration
			 * So, try to map paths properly
			 */
			const content = transformImports(file.content, file.type, config);
			writeFileSync(absolute, content, "utf-8");
			log.success(outputPath);
			writtenCount++;
		}
	}

	log.divider();

	const allDeps = new Set<string>();
	for (const item of items) {
		for (const dep of item.dependencies ?? []) {
			allDeps.add(dep);
		}
	}

	if (allDeps.size > 0) {
		log.info("INSTALL DEPENDENCIES:");
		log.dim("");
		const packageManager = detectPackageManager(projectRoot);
		log.dim(`  ${packageManager} add ${[...allDeps].join(" ")}`);
		log.dim("");
	}

	const allCssImports = new Set<string>();
	for (const item of items) {
		for (const imp of item.cssImports ?? []) {
			allCssImports.add(imp);
		}
	}

	if (allCssImports.size > 0) {
		log.info("ADD TO CSS ENTRY POINT:");
		log.dim("");
		for (const imp of allCssImports) {
			log.dim(`  @import "${imp}";`);
		}
		log.dim("");
	}

	log.divider();

	if (writtenCount === 0) {
		log.warn("NO FILES WRITTEN // use --force to overwrite existing files");
	} else {
		log.success(`DONE: ${writtenCount} file${writtenCount > 1 ? "s" : ""} added.`);
	}
}
