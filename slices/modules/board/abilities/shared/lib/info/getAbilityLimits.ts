import type { InvestigatorAbility } from "arkham-investigator-data";

export const getAbilityLimits = ({ limitPer }: InvestigatorAbility) => {
	if (!limitPer) {
		return;
	}
	return Array.isArray(limitPer) ? limitPer : [limitPer];
};
