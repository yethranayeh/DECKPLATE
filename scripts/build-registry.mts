import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_DIR = resolve(__dirname, "../registry");
const OUT_DIR = resolve(REGISTRY_DIR, "__registry__");
/**
 * This is mostly to help easily identify the type of schema
 * 	that we are interacting with through CLI or elsewhere.
 * This versioning is independent from the DECKPLATE library version
 */
const IDENTITY_VERSION = "0.1.0";

async function main() {
	const { registry } = await import(resolve(REGISTRY_DIR, "registry.ts"));

	if (!existsSync(OUT_DIR)) {
		mkdirSync(OUT_DIR, { recursive: true });
	}

	let built = 0;
	let skipped = 0;

	for (const item of registry) {
		const missingFiles = item.files.filter(
			(file: { path: string }) => !existsSync(resolve(REGISTRY_DIR, file.path)),
		);

		if (missingFiles.length > 0) {
			const paths = missingFiles.map((f: { path: string }) => f.path).join(", ");
			console.warn(`Skipped: ${item.name} (missing: ${paths})`);
			skipped++;
			continue;
		}

		const entry = {
			...item,
			files: item.files.map((file: { path: string; type: string }) => ({
				...file,
				content: readFileSync(resolve(REGISTRY_DIR, file.path), "utf-8"),
			})),
		};

		const outPath = resolve(OUT_DIR, `${item.name}.json`);
		writeFileSync(outPath, JSON.stringify(entry, null, 2));
		console.log(`Built: ${item.name}.json`);
		built++;
	}

	const index = {
		version: IDENTITY_VERSION,
		items: registry.map((item: { name: string; type: string; description?: string }) => ({
			name: item.name,
			type: item.type,
			description: item.description,
		})),
	};

	writeFileSync(resolve(OUT_DIR, "index.json"), JSON.stringify(index, null, 2));
	console.log("Built: index.json");
	console.log(`\nDone: ${built} built, ${skipped} skipped`);
}

main().catch(console.error);
