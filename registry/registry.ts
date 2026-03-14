import type { RegistryItem } from "./schema";

export const registry: RegistryItem[] = [
	{
		name: "utils",
		type: "registry:lib",
		description: "cn() class merging utility (clsx + tailwind-merge)",
		dependencies: ["clsx", "tailwind-merge"],
		files: [{ path: "lib/utils.ts", type: "registry:lib" }],
	},
	{
		name: "button",
		type: "registry:ui",
		description: "Primary action primitive. Four variants: primary, danger, outline, ghost.",
		dependencies: ["class-variance-authority"],
		registryDependencies: ["utils"],
		cssImports: ["@deckplate/theme"],
		files: [{ path: "ui/button.tsx", type: "registry:ui" }],
	},
	{
		name: "badge",
		type: "registry:ui",
		description: "Operational state indicator. Seven variants across outline and fill styles.",
		dependencies: ["class-variance-authority"],
		registryDependencies: ["utils"],
		cssImports: ["@deckplate/theme"],
		files: [{ path: "ui/badge.tsx", type: "registry:ui" }],
	},
	{
		name: "status-dot",
		type: "registry:ui",
		description: "Circular unit state indicator. Four states with pulse animations.",
		dependencies: ["class-variance-authority"],
		registryDependencies: ["utils"],
		cssImports: ["@deckplate/theme", "@deckplate/theme/motifs"],
		files: [{ path: "ui/status-dot.tsx", type: "registry:ui" }],
	},
	{
		name: "progress-bar",
		type: "registry:ui",
		description: "Operational metric bar. Switches to danger color below threshold",
		dependencies: [],
		registryDependencies: ["utils"],
		cssImports: ["@deckplate/theme"],
		files: [{ path: "ui/progress-bar.tsx", type: "registry:ui" }],
	},
	{
		name: "typography",
		type: "registry:ui",
		description:
			"Component with 6 predefined typography variants: display, headline-xl, headline-lg, label-md, label-sm, serial.",
		dependencies: ["class-variance-authority"],
		registryDependencies: ["utils"],
		cssImports: ["@deckplate/theme"],
		files: [{ path: "ui/typography.tsx", type: "registry:ui" }],
	},
];
