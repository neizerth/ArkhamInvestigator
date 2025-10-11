import type { InvestigatorAbility } from "arkham-investigator-data";

import { specialAbilitityCodes } from "@modules/mechanics/board/abilities/shared/config";
import {
	BOARD_ABILITY_LIMITS,
	PERMANENT_BOARD_ABILITY_TYPES,
} from "../../config";
import { getAbilityLimits } from "./getAbilityLimits";

type Options = {
	ability: InvestigatorAbility;
	investigatorsCount: number;
};

export const isBoardAbility = ({ ability }: Options) => {
	if (specialAbilitityCodes.includes(ability.id)) {
		return true;
	}

	if (PERMANENT_BOARD_ABILITY_TYPES.includes(ability.type)) {
		return true;
	}

	const limits = getAbilityLimits(ability);

	if (!limits) {
		return false;
	}

	return limits.every((limit) => BOARD_ABILITY_LIMITS.includes(limit));
};
