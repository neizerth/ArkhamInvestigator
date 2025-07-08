import type { InvestigatorAbilityModification } from "../../model";
import { AbilityCode } from "../codes";

export const ShatteredSelfCounter: InvestigatorAbilityModification = {
	[AbilityCode.ShatteredSelf]: ({ board, ability }) => {
		if (ability.type !== "counter") {
			return ability;
		}

		const { handSize } = board.value;

		return {
			...ability,
			max: handSize,
		};
	},
};
