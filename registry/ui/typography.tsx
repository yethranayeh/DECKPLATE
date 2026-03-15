// DECKPLATE v0.0.0
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const typographyVariants = cva("uppercase", {
	variants: {
		variant: {
			display: [
				"font-display font-black",
				"text-[clamp(3rem,10vw,7.5rem)] leading-[0.88] tracking-[0.06em]",
				"text-off-white",
			],
			"headline-xl": [
				"font-display font-black",
				"text-[clamp(2rem,6vw,4.5rem)] leading-[0.92] tracking-[0.06em]",
				"text-off-white",
			],
			"headline-lg": [
				"font-display font-extrabold",
				"text-[clamp(1.4rem,3.5vw,2.8rem)] leading-[1] tracking-[0.08em]",
				"text-orange",
			],
			"label-md": [
				"font-display font-bold",
				"text-[1.15rem] leading-[1.1] tracking-[0.18em]",
				"text-off-white",
			],
			"label-sm": [
				"font-display font-semibold",
				"text-[0.8rem] leading-[1.2] tracking-[0.22em]",
				"text-dim",
			],
			serial: ["font-mono", "text-[0.65rem] leading-[1.6] tracking-[0.15em]", "text-orange"],
		},
	},
	defaultVariants: {
		variant: "label-md",
	},
});

/** *semantic* mapping of variants */
const defaultTagMap: Record<string, React.ElementType> = {
	display: "h1",
	"headline-xl": "h2",
	"headline-lg": "h3",
	"label-md": "p",
	"label-sm": "p",
	serial: "span",
};

type TypographyOwnProps<T extends React.ElementType = React.ElementType> = {
	/**
	 * Override what HTML tag it will output
	 * @default defaultTagMap
	 */
	as?: T;
	className?: string;
} & VariantProps<typeof typographyVariants>;

export type TypographyProps<T extends React.ElementType = React.ElementType> =
	TypographyOwnProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyOwnProps>;

function Typography<T extends React.ElementType = "p">({
	variant,
	as,
	className,
	children,
	...props
}: TypographyProps<T>) {
	const Tag = as ?? defaultTagMap[variant ?? "label-md"] ?? "p";

	return (
		<Tag className={cn(typographyVariants({ variant, className }))} {...props}>
			{children}
		</Tag>
	);
}
Typography.displayName = "Typography";

export { Typography };
