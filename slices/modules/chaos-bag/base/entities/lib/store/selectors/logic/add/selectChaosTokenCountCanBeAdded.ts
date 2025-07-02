import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../../../../../shared/lib/store/chaosBag";
import { getChaosTokenCountCanBeAdded } from "../../../../logic";

export const selectChaosTokenCountCanBeAdded = (type: ChaosTokenType) =>
	createSelector(
		[selectUnlimitedChaosTokens, selectChaosBagTokenCount],
		(unlimitedChaosTokens, tokenCount) =>
			getChaosTokenCountCanBeAdded({
				type,
				unlimitedChaosTokens,
				tokenCount,
			}),
	);
