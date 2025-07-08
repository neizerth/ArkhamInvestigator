import type { InvestigatorSignature } from "arkham-investigator-data";

export type GetAvailableFactionsOptions = {
	investigator: InvestigatorSignature;
};

export const getAvailableFactions = ({
	investigator,
}: GetAvailableFactionsOptions) => {
	return investigator.roles || [];
};
