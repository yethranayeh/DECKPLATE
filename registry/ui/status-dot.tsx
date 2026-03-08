// DECKPLATE v0.0.0
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const statusDotVariants = cva(["block shrink-0 rounded-full", "border border-transparent"], {
	variants: {
		variant: {
			active: "bg-active-green",
			warning: "bg-orange",
			danger: "bg-red-hi",
			offline: "bg-dim",
		},
		size: {
			sm: "h-1.5 w-1.5",
			md: "h-2.5 w-2.5",
			lg: "h-3.5 w-3.5",
		},
	},
	defaultVariants: {
		variant: "offline",
		size: "md",
	},
});

const glowClass: Record<string, string> = {
	active: "shadow-[0_0_5px_var(--color-active-green)]",
	warning: "shadow-[0_0_5px_var(--color-orange)]",
	danger: "shadow-[0_0_5px_var(--color-red-hi)]",
	offline: "",
};

const pulseClass: Record<string, string> = {
	active: "pulse-active",
	warning: "pulse-warning",
	danger: "pulse-danger",
	offline: "",
};

export interface StatusDotProps
	extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof statusDotVariants> {
	["aria-label"]: string;
	pulse?: boolean;
	disableGlow?: boolean;
	className?: string;
}

const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
	({ variant, size, pulse = false, disableGlow = false, className, children, ...props }, ref) => {
		const key = variant ?? "offline";
		/** The dot glows by default, unless disabled by `disableGlow` or overriden by a pulse state */
		const effectClass = pulse ? pulseClass[key] : disableGlow ? "" : glowClass[key];

		return (
			<span
				role="status"
				title={props["aria-label"]}
				ref={ref}
				className={cn(statusDotVariants({ variant, size, className }), effectClass)}
				{...props}
			>
				{children}
			</span>
		);
	},
);
StatusDot.displayName = "StatusDot";

export { StatusDot, statusDotVariants };
