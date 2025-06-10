import type { InvestigatorAbility } from "arkham-investigator-data";

export const getAbilityIcon = (ability: InvestigatorAbility) => {
	if (ability.icon) {
		return ability.icon;
	}
	if (ability.type === "fast") {
		return "free";
	}
	return ability.type;
};
