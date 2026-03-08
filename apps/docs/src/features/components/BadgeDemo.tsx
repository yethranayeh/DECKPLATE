import { Badge } from "@/ui/badge";

export function BadgeDemo() {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<p className="text-dim mb-4 font-mono text-xs tracking-widest uppercase">
					Outline variants
				</p>
				<div className="flex flex-wrap gap-3">
					<Badge variant="outline-orange">Active</Badge>
					<Badge variant="outline-red">Offline</Badge>
					<Badge variant="outline-yellow">Standby</Badge>
					<Badge variant="outline-white">Authorized</Badge>
				</div>
			</div>
			<div>
				<p className="text-dim mb-4 font-mono text-xs tracking-widest uppercase">Fill variants</p>
				<div className="flex flex-wrap gap-3">
					<Badge variant="fill-orange">Field Tested</Badge>
					<Badge variant="fill-red">Alert</Badge>
					<Badge variant="fill-yellow">Warning</Badge>
				</div>
			</div>
		</div>
	);
}
