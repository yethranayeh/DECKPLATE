import { Badge } from "@/ui/badge";

export function BadgeDemo() {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<p className="text-dim mb-4 font-mono text-xs tracking-widest uppercase">
					Outline variants
				</p>
				<div className="space-y-2">
					{[0, 1].map((dot) => (
						<div key={dot} className="flex flex-wrap gap-3">
							<Badge dot={!!dot} variant="outline-orange">
								Active
							</Badge>
							<Badge dot={!!dot} variant="outline-red">
								Offline
							</Badge>
							<Badge dot={!!dot} variant="outline-yellow">
								Standby
							</Badge>
							<Badge dot={!!dot} variant="outline-white">
								Authorized
							</Badge>
						</div>
					))}
				</div>
			</div>
			<div>
				<p className="text-dim mb-4 font-mono text-xs tracking-widest uppercase">Fill variants</p>
				<div className="space-y-2">
					{[0, 1].map((dot) => (
						<div key={dot} className="flex flex-wrap gap-3">
							<Badge dot={!!dot} variant="fill-orange">
								Field Tested
							</Badge>
							<Badge dot={!!dot} variant="fill-red">
								Alert
							</Badge>
							<Badge dot={!!dot} variant="fill-yellow">
								Warning
							</Badge>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
