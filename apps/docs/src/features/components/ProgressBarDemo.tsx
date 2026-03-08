import { ProgressBar } from "@/ui/progress-bar";

export function ProgressBarDemo() {
	return (
		<div className="flex max-w-xl flex-col gap-6">
			<ProgressBar value={96} label="NP400263 // PCKT RATE" />
			<ProgressBar value={68} label="IDNO. 02-103733" />
			<ProgressBar value={25} label="ITNO. 25.00 (BUILD)" />
			<ProgressBar hideValue value={8} label="Fuel Reserve" />

			{/* Separator to occupy space where normally a label would */}
			<div aria-hidden />
			<ProgressBar hideValue value={3} />
		</div>
	);
}
