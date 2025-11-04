import { createSelector } from "@reduxjs/toolkit";
import { MAX_UNLIMITED_TOKEN_COUNT } from "../../../config";
import { chaosTokenCount } from "../../../config/token/count";
import type { ChaosTokenType } from "../../../model";
import { selectUnlimitedChaosTokens } from "../chaosBag";

export const selectMaxChaosTokenCount = (type: ChaosTokenType) =>
	createSelector([selectUnlimitedChaosTokens], (isUnlimited) => {
		if (isUnlimited) {
			return MAX_UNLIMITED_TOKEN_COUNT;
		}

		return chaosTokenCount[type];
	});
