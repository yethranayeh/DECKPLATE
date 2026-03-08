// DECKPLATE v0.0.0
import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Value from `0` to `100` */
	value: number;
	/**
	 * When `value <= threshold`, then the color turns red
	 * @default 30
	 */
	threshold?: number;
	hideValue?: boolean;
	// TODO: a labelPosition prop could be nice
	label?: string;
	className?: string;
}

export function ProgressBar({
	value,
	label,
	hideValue = false,
	threshold = 30,
	className,
	...props
}: ProgressBarProps) {
	const clampedValue = Math.min(100, Math.max(0, value));
	const isBelowThreshold = clampedValue <= threshold;

	const fillColor = isBelowThreshold ? "bg-red-hi" : "bg-orange";
	const labelColor = isBelowThreshold ? "text-red-hi" : "text-dim";

	return (
		<div className={cn("flex flex-col gap-1", className)} {...props}>
			{(label != null || !hideValue) && (
				<div className="flex items-baseline justify-between">
					{label != null && (
						<span className="font-display text-off-white text-xs font-bold tracking-widest uppercase">
							{label}
						</span>
					)}
					{!hideValue && (
						<span
							className={cn(
								"font-mono text-[0.6rem] uppercase tracking-widest tabular-nums",
								labelColor,
							)}
						>
							{clampedValue}%
						</span>
					)}
				</div>
			)}

			<div
				role="progressbar"
				aria-valuenow={clampedValue}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={label ?? `${clampedValue}%`}
				className="bg-line h-0.5 w-full overflow-hidden"
			>
				<div
					className={cn("h-full transition-[width] duration-1000 ease-in-out", fillColor)}
					style={{ width: `${clampedValue}%` }}
				/>
			</div>
		</div>
	);
}
