import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve, dirname } from "path";

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

/** Assumes first occurrence of **package.json** is project root */
export function findProjectRoot(cwd: string): string {
	let dir = cwd;
	while (true) {
		if (existsSync(resolve(dir, "package.json"))) return dir;
		const parent = dirname(dir);
		if (parent === dir) return cwd;
		dir = parent;
	}
}

/**
 * Map file path to target project path.
 * @example // registry:lib files mapped to lib alias path
 * @example // registry:ui files mapped to components alias path
 */
export function resolveOutputPath(
	filePath: string,
	fileType: RegistryFileType,
	config: DeckplateConfig,
): string {
	if (fileType === "registry:lib") {
		const relativePath = filePath.replace(/^lib\//, "");
		return `${config.aliases.lib.replace(/^@\//, "")}/${relativePath}`;
	}
	const relativePath = filePath.replace(/^ui\//, "");
	return `${config.aliases.components.replace(/^@\//, "")}/${relativePath}`;
}
