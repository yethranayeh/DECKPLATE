// DECKPLATE v0.0.0
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	[
		"inline-flex items-center gap-1.5",
		"px-2 py-0.5",
		"font-mono text-[0.6rem] tracking-[0.2em]", // tracking-widest is `0.1em`
		"uppercase",
		"border",
	],
	{
		variants: {
			variant: {
				"outline-orange": "border-orange text-orange bg-transparent",
				"outline-red": "border-red-hi text-red-hi bg-transparent",
				"outline-yellow": "border-yellow text-yellow bg-transparent",
				"outline-white": "border-off-white text-off-white bg-transparent",
				"fill-orange": "border-orange text-black bg-orange",
				"fill-red": "border-red text-off-white bg-red",
				"fill-yellow": "border-yellow text-black bg-yellow",
			},
		},
		defaultVariants: {
			variant: "outline-orange",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
	className?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant, className, children, ...props }, ref) => (
		<span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props}>
			{children}
		</span>
	),
);
Badge.displayName = "Badge";

export { Badge };
