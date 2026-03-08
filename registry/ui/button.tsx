// DECKPLATE v0.0.0
import type { VariantProps } from "class-variance-authority";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	[
		"inline-flex items-center justify-center gap-2",
		"font-display font-bold uppercase tracking-widest",
		"border border-transparent",
		"cursor-pointer select-none",
		"transition-colors duration-150",
		"disabled:opacity-40 disabled:cursor-not-allowed"
	],
	{
		variants: {
			variant: {
				primary: "bg-orange text-black border-transparent hover:bg-yellow disabled:hover:bg-orange",
				danger: "bg-red text-off-white border-transparent hover:bg-red-hi disabled:hover:bg-red",
				outline:
					"bg-transparent text-orange border-orange hover:bg-orange hover:text-black disabled:hover:bg-transparent disabled:hover:text-orange",
				ghost: "bg-transparent border-transparent text-off-white hover:bg-white/8 disabled:hover:bg-transparent"
			},
			size: {
				sm: "px-3 py-1.5 text-xs",
				md: "px-5 py-2.5 text-sm",
				lg: "px-7 py-3.5 text-base"
			}
		},
		defaultVariants: {
			variant: "primary",
			size: "md"
		}
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, size, className, children, ...props }, ref) => (
		<button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props}>
			{children}
		</button>
	)
);
Button.displayName = "Button";

export { Button };
