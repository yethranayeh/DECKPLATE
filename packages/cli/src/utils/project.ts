import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { resolve, extname } from "path";

import type { RegistryFileType } from "@deckplate/registry/schema";

import type { DeckplateConfig } from "../config.js";

type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

/**
 * Detect the user's package manager by reading a valid lockfiles
 * @default "npm"
 */
export function detectPackageManager(projectRoot: string): PackageManager {
	const check = (lockfile: string) => existsSync(resolve(projectRoot, lockfile));

	if (check("pnpm-lock.yaml")) return "pnpm";
	if (check("yarn.lock")) return "yarn";
	if (check("bun.lockb")) return "bun";
	return "npm";
}

export function installPackages(projectRoot: string, packages: string[]): void {
	const packageManager = detectPackageManager(projectRoot);
	/**
	 * `pnpm`, `yarn` and `bun` support **add** command by default,
	 * 	`npm` supports it also through an alias as well
	 * @see https://docs.npmjs.com/cli/v9/commands/npm-install#synopsis
	 */
	execSync(`${packageManager} add ${packages.join(" ")}`, {
		cwd: projectRoot,
		stdio: "inherit",
	});
}

/**
 * Assumes "traditional" and most common patterns
 * 	for finding alias configurations
 *
 * TODO: Need to check for "paths" configuration which is probably more common than baseUrl
 * TODO: Need to be able to read TypeScript and Javascript configurations
 */
export function findAlisConfiguration(projectRoot: string): string | null {
	const check = (configFile: string) => existsSync(resolve(projectRoot, configFile));

	const possibleConfigLocations = ["tsconfig.json", "vite.config.ts", "vite.config.js"];

	for (const configFileName of possibleConfigLocations) {
		if (check(configFileName)) {
			const fileContent = readFileSync(configFileName, "utf-8");
			if (extname(configFileName) === ".json") {
				const configuration: {
					compilerOptions?: {
						baseUrl?: string;
					};
				} = JSON.parse(fileContent);

				return configuration.compilerOptions?.baseUrl ?? null;
			}

			// TODO: check for .js and .ts files
		}
	}

	return null;
}

/**
 * Map file path to target project path.
 * @example // registry:lib files mapped to lib alias path
 * @example // registry:ui files mapped to components alias path
 * TODO: Should the "@" replacement be handled here?
 */
export function resolveOutputPath(
	filePath: string,
	fileType: RegistryFileType,
	config: DeckplateConfig,
): string {
	if (fileType === "registry:lib") {
		const withoutParentPath = filePath.replace(/^lib\//, "");
		return `${config.aliases.lib.replace(/^@\//, "")}/${withoutParentPath}`;
	}
	const withoutParentPath = filePath.replace(/^ui\//, "");
	return `${config.aliases.components.replace(/^@\//, "")}/${withoutParentPath}`;
}
