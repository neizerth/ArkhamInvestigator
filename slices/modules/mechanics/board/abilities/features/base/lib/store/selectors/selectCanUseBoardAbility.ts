import type { AppSelector } from "@shared/model";
import { always } from "ramda";
import { ParallelZoeySamarasFastAbilityChecker as validators } from "../features";

export const selectCanUseBoardAbility = (
	abilityId: string,
): AppSelector<boolean> => {
	const validator = validators[abilityId];

	if (!validator) {
		return always(true);
	}

	return validator;
};
