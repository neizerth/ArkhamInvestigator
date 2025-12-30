import * as C from "./InvestigatorStats.components";

export type InvestigatorStatsProps = {
	health: number;
	sanity: number;
};

export const InvestigatorStats = ({
	health,
	sanity,
}: InvestigatorStatsProps) => {
	return (
		<C.Container>
			<C.Health value={health} />
			<C.Sanity value={sanity} />
		</C.Container>
	);
};
