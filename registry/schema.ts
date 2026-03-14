import { z } from "zod";

/**
 * All *valid* registry file types
 * Source of truth and union type dervied from the variable
 */
export const REGISTRY_FILE_TYPES = ["registry:ui", "registry:lib"] as const;
export type RegistryFileType = (typeof REGISTRY_FILE_TYPES)[number];

export const registryItemFileSchema = z.object({
	path: z.string(),
	type: z.enum(REGISTRY_FILE_TYPES),
	content: z.string().optional(),
});

export const registryItemSchema = z.object({
	name: z.string(),
	type: z.enum(REGISTRY_FILE_TYPES),
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
