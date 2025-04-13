import type { InvestigatorSignature } from "arkham-investigator-data";
import { Health, Sanity } from "../stats";
import * as C from "./InvestigatorStats.components";

export type InvestigatorStatsProps = {
	investigator: InvestigatorSignature;
};

export const InvestigatorStats = ({ investigator }: InvestigatorStatsProps) => {
	const { health, sanity } = investigator;
	return (
		<C.Container>
			<Health value={health} />
			<Sanity value={sanity} />
		</C.Container>
	);
};
