import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../../../../../shared/lib/store/chaosBag";
import { canAddChaosToken } from "../../../../logic";

export const selectCanAddChaosToken = (type: ChaosTokenType) =>
	createSelector(
		[selectUnlimitedChaosTokens, selectChaosBagTokenCount],
		(unlimitedChaosTokens, tokenCount) =>
			canAddChaosToken({
				type,
				unlimitedChaosTokens,
				tokenCount,
			}),
	);
