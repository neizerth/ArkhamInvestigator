import { AbilityCode } from "../../../shared/config";
import type { InvestigatorAbilityModification } from "../../model";

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
