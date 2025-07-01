import { selectUnlimitedChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getChaosTokenLimit } from "../../../logic";

export const selectChaosTokenLimit = (type: ChaosTokenType) =>
	createSelector([selectUnlimitedChaosTokens], (unlimitedChaosTokens) =>
		getChaosTokenLimit({ type, unlimitedChaosTokens }),
	);
