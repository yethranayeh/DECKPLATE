import { z } from "zod";

export const registryItemFileSchema = z.object({
	path: z.string(),
	type: z.enum(["registry:ui", "registry:lib"]),
	content: z.string().optional(),
});

export const registryItemSchema = z.object({
	name: z.string(),
	type: z.enum(["registry:ui", "registry:lib"]),
	description: z.string().optional(),
	dependencies: z.array(z.string()).optional(),
	registryDependencies: z.array(z.string()).optional(),
	cssImports: z.array(z.string()).optional(),
	files: z.array(registryItemFileSchema),
});

export const registryIndexSchema = z.object({
	version: z.string(),
	items: z.array(registryItemSchema),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;
export type RegistryItemFile = z.infer<typeof registryItemFileSchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;
