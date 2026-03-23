// import { findProjectRoot } from "../lib/directory.js";
import { log } from "../utils/index.js";

interface InitOptions {
	components?: string;
	lib?: string;
	force?: boolean;
}

export async function init(_options: InitOptions): Promise<void> {
	// const force = Boolean(options.force);
	// const cwd = process.cwd();
	// const projectRoot = findProjectRoot(cwd);

	// TODO: initialize Shadcn and/or add deckplate as a registry in components.json

	log.divider();
	log.success("INITIALIZED // You can now allocate components");
	log.dim("  npx shadcn@latest add @deckplate/<component>");
}
