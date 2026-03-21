import { existsSync } from "fs";
import { dirname, join, resolve } from "path";

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

export const checkSrcDir = (projectRoot: string) => existsSync(join(projectRoot, "src"));
