import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";

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
	const command = `${packageManager} add ${packages.join(" ")}`;
	execSync(command, {
		cwd: projectRoot,
		stdio: "pipe",
	});
}
