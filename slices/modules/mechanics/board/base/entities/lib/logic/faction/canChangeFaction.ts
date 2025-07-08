import type { InvestigatorSignature } from "arkham-investigator-data";

export type CanChangeFactionOptions = {
	investigator: InvestigatorSignature;
};

export const canChangeFaction = ({ investigator }: CanChangeFactionOptions) => {
	const rolesCount = investigator.roles?.length || 0;

	return rolesCount > 0;
};
