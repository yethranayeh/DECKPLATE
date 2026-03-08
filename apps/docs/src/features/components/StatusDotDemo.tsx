import { StatusDot } from "@/ui/status-dot";

const variants = [
	{ variant: "active", label: "Active / Online", desc: "Unit is operational and responding" },
	{
		variant: "warning",
		label: "Degraded / At Capacity",
		desc: "Unit is operating at degraded levels",
	},
	{ variant: "danger", label: "Critical / Denied", desc: "Unit is in error or access denied" },
	{ variant: "offline", label: "Offline / Unknown", desc: "Unit is not responding" },
] as const;

export function StatusDotDemo() {
	return (
		<div className="flex flex-col gap-6">
			{variants.map(({ variant, label, desc }) => (
				<div
					key={variant}
					className="border-line flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
				>
					<div className="flex w-20 items-center gap-3">
						{(["sm", "sm", "md", "lg"] as const).map((size, i) => (
							<StatusDot
								aria-label={label}
								key={size}
								pulse={i === 0}
								variant={variant}
								size={size}
							/>
						))}
					</div>
					<div>
						<p className="font-display text-off-white text-sm font-bold tracking-widest uppercase">
							{label}
						</p>
						<p className="text-dim mt-1 font-mono text-xs tracking-widest normal-case">{desc}</p>
					</div>
				</div>
			))}
		</div>
	);
}
