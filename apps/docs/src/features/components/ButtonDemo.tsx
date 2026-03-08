import { Button } from "@/ui/button";

/**
 * This is also written in `tsx` instead of `.astro` because each use of `client:load`
 * 	would create a different island. Maybe it would be better, but for now a single
 * 	React island for the whole demo seemed more appropriate.
 *
 * TODO: Evaluate which approach would be better in terms of Astro best practices.
 */
export function ButtonDemo() {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<p className="text-dim mb-4 font-mono text-xs tracking-widest uppercase">Variants</p>
				<div className="flex flex-wrap gap-3">
					<Button variant="primary">Deploy Unit</Button>
					<Button variant="danger">Emergency Stop</Button>
					<Button variant="outline">Initialize</Button>
					<Button variant="ghost">Cancel</Button>
				</div>
			</div>

			<div>
				<p className="text-dim mb-4 font-mono text-xs tracking-widest uppercase">Sizes</p>
				<div className="flex flex-wrap items-end gap-3">
					<Button variant="primary" size="sm">
						Engage
					</Button>
					<Button variant="primary" size="md">
						Engage
					</Button>
					<Button variant="primary" size="lg">
						Engage
					</Button>
				</div>
			</div>

			<div>
				<p className="text-dim mb-4 font-mono text-xs tracking-widest uppercase">Disabled</p>
				<div className="flex flex-wrap gap-3">
					<Button variant="primary" disabled>
						Offline
					</Button>
					<Button variant="danger" disabled>
						Offline
					</Button>
					<Button variant="outline" disabled>
						Offline
					</Button>
					<Button variant="ghost" disabled>
						Offline
					</Button>
				</div>
			</div>
		</div>
	);
}
