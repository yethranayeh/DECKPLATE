import { Typography } from "@/ui/typography";

export function TypographyDemo() {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<Typography variant="serial" className="text-dim">
					Display
				</Typography>
				<Typography variant="display">Signal Nominal</Typography>
			</div>

			<div>
				<Typography variant="serial" className="text-dim">
					Headline XL
				</Typography>
				<Typography variant="headline-xl">Macro-Telemetry Refinement</Typography>
			</div>

			<div>
				<Typography variant="serial" className="text-dim">
					Headline LG
				</Typography>
				<Typography variant="headline-lg">Structural Integrity</Typography>
			</div>

			<div>
				<Typography variant="serial" className="text-dim">
					Label MD
				</Typography>
				<Typography variant="label-md">Operator Clearance Required</Typography>
			</div>

			<div>
				<Typography variant="serial" className="text-dim">
					Label SM
				</Typography>
				<Typography variant="label-sm">Unit SPOT-100 // Archival Processing // Rev 4.2</Typography>
			</div>

			<div className="flex flex-col">
				<Typography variant="serial" className="text-dim">
					Serial
				</Typography>
				<Typography variant="serial">MTR-400263-250 // b11205d698e</Typography>
			</div>
		</div>
	);
}
