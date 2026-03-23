import { createRequire } from "module";

import { Command } from "commander";

const require = createRequire(import.meta.url);
const { version } = require("../package.json") as { version: string };

const program = new Command()
	.name("deckplate")
	.description("DECKPLATE // COMPONENT REGISTRY")
	.version(version);

program
	.command("init")
	.description("Initialize DECKPLATE configurations for project")
	.option("-f, --force", "Overwrite existing config and files")
	.action(async (options: Record<string, unknown>) => {
		const { init } = await import("./commands/init.js");
		await init(options);
	});

program
	.command("add")
	.description("Add a DECKPLATE component to your project")
	.argument("<component>", "Component name (e.g. button, badge, status-dot)")
	.option("-f, --force", "Overwrite existing files")
	.action(async (component: string, options: Record<string, unknown>) => {
		const { add } = await import("./commands/add.js");
		await add(component, options);
	});

program.parse();
