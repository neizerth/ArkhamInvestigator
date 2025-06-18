import type { InvestigatorAbility } from "arkham-investigator-data";

export type CanSetAbilityValueOptions = {
	ability: InvestigatorAbility;
	value: number;
};
export const canSetBoardAbilityValue = ({
	ability,
	value,
}: CanSetAbilityValueOptions) => {
	if (ability.type === "counter") {
		return typeof ability.max === "number" ? value > ability.max : true;
	}
	return true;
};
