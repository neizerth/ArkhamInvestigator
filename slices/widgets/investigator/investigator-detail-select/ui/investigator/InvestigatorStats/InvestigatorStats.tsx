import type { InvestigatorSignature } from "arkham-investigator-data";
import * as C from "./InvestigatorStats.components";

export type InvestigatorStatsProps = {
	investigator: InvestigatorSignature;
};

export const InvestigatorStats = ({ investigator }: InvestigatorStatsProps) => {
	const { health, sanity } = investigator;
	return (
		<C.Container>
			<C.Health>
				<C.HealthValue value={health} />
			</C.Health>
			<C.Sanity>
				<C.SanityValue value={sanity} />
			</C.Sanity>
		</C.Container>
	);
};
