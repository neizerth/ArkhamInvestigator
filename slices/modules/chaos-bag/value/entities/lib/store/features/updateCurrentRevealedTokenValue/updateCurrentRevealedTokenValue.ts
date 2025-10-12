import { chaosTokenValuePrefix } from "@modules/chaos-bag/value/shared/config";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type UpdateCurrentRevealedTokenValue = {
	id: string;
	value: ChaosTokenValue;
};

export const updateCurrentRevealedTokenValue =
	createAction<UpdateCurrentRevealedTokenValue>(
		`${chaosTokenValuePrefix}/updateCurrentValue`,
	);
