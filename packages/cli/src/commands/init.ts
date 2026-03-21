import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";

import { configExists, writeConfig, type DeckplateConfig } from "../config.js";
import { REGISTRY_URL } from "../constants.js";
import { checkSrcDir, findProjectRoot } from "../lib/directory.js";
import { resolveRegistryTree, type RegistryItem } from "../registry/api.js";
import {
	log,
	resolveOutputPath,
	transformImports,
	detectPackageManager,
	installPackages,
} from "../utils/index.js";
import { findAlisConfiguration } from "../utils/project.js";

interface InitOptions {
	components?: string;
	lib?: string;
	force?: boolean;
}

export async function init(options: InitOptions): Promise<void> {
	const force = Boolean(options.force);
	const cwd = process.cwd();
	const projectRoot = findProjectRoot(cwd);
	const hasSrcDir = checkSrcDir(projectRoot);
	const aliasMapping = findAlisConfiguration(projectRoot);
	const importPathPrefix = aliasMapping ?? (hasSrcDir ? "./src/" : "@/");

	if (configExists(projectRoot) && !force) {
		log.warn("deckplate.json EXISTS // use --force to overwrite");
		process.exit(1);
	}

	const config: DeckplateConfig = {
		aliases: {
			components: options.components ?? importPathPrefix + `components/ui`,
			lib: options.lib ?? importPathPrefix + "lib",
		},
		registryUrl: process.env.DECKPLATE_REGISTRY_URL ?? REGISTRY_URL,
	};

	log.divider();
	log.info("INIT");
	log.divider();

	/**
	 * Since `items` (currently only "utils") is not optional
	 * 	for a proper initialization flow, the data is fetched first
	 * 	to ensure that all will go as *expected*.
	 */
	let items: RegistryItem[];
	try {
		items = await resolveRegistryTree(config.registryUrl, ["utils"]);
	} catch {
		log.error("REGISTRY UNREACHABLE // cannot fetch essentials");
		log.dim(`  REGISTRY // SRC: ${config.registryUrl}`);
		process.exit(1);
	}

	writeConfig(projectRoot, config);
	log.success("deckplate.json");

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

			const content = transformImports(file.content, file.type, config);
			writeFileSync(absolute, content, "utf-8");
			log.success(outputPath);
		}
	}

	const packageManager = detectPackageManager(projectRoot);
	log.info(`INSTALLING THEME // ${packageManager}`);

	try {
		installPackages(projectRoot, ["@deckplate/theme"]);
		log.success("@deckplate/theme");
	} catch {
		log.error("FAILED TO ALLOCATE: @deckplate/theme");
		log.dim(`  Run manually: ${packageManager} add @deckplate/theme`);
	}

	log.divider();

	log.info("Add to your CSS entry point:");
	log.dim("");
	log.dim('  @import "@deckplate/theme";');
	log.dim("");

	log.divider();
	log.success("INITIALIZED // Run: npx deckplate add <component>");
}
