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

const dotColor: Record<string, string> = {
	"outline-orange": "bg-orange",
	"outline-red": "bg-red-hi",
	"outline-yellow": "bg-yellow",
	"outline-white": "bg-off-white",
	"fill-orange": "bg-black",
	"fill-red": "bg-off-white",
	"fill-yellow": "bg-black",
};

function BadgeDot({ variant }: { variant: BadgeProps["variant"] }) {
	const color = dotColor[variant ?? "outline-orange"] ?? "bg-orange";
	return <span className={cn("block h-1.5 w-1.5 rounded-full", color)} aria-hidden="true" />;
}

export interface BadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
	className?: string;
	dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant, dot, className, children, ...props }, ref) => (
		<span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props}>
			{dot && <BadgeDot variant={variant} />}
			{children}
		</span>
	),
);
Badge.displayName = "Badge";

export { Badge };
