import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../../../../shared/lib/store/chaosBag";
import { getChaosTokensCanBeAdded } from "../../../logic";

export const selectChaosTokensCanBeAdded = (type: ChaosTokenType) =>
	createSelector(
		[selectUnlimitedChaosTokens, selectChaosBagTokenCount],
		(unlimitedChaosTokens, tokenCount) =>
			getChaosTokensCanBeAdded({
				type,
				unlimitedChaosTokens,
				tokenCount,
			}),
	);
