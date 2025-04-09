import type { InvestigatorAbility } from "arkham-investigator-data";
import { BOARD_ABILITY_LIMITS, BOARD_ABILITY_TYPES } from "../../../../config";

export const getAbilityLimits = ({ limitPer }: InvestigatorAbility) => {
	if (!limitPer) {
		return;
	}
	return Array.isArray(limitPer) ? limitPer : [limitPer];
};

export const isBoardAbility = (ability: InvestigatorAbility) => {
	if (ability.perInvestigator) {
		return false;
	}
	if (!BOARD_ABILITY_TYPES.includes(ability.type)) {
		return false;
	}

	const limits = getAbilityLimits(ability);

	if (!limits) {
		return false;
	}
	return limits.every((limit) => BOARD_ABILITY_LIMITS.includes(limit));
};

export const getAbilityIcon = (ability: InvestigatorAbility) => {
	if ("icon" in ability) {
		return ability.icon;
	}
	if (ability.type === "fast") {
		return "free";
	}
	return ability.type;
};
