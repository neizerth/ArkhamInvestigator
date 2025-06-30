import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../../../../shared/lib/store/chaosBag";
import { canAddMultipleChaosTokens } from "../../../logic";

type Options = {
	type: ChaosTokenType;
	count: number;
};

export const selectCanAddMultipleChaosTokens = (options: Options) =>
	createSelector(
		[selectUnlimitedChaosTokens, selectChaosBagTokenCount],
		(unlimitedChaosTokens, tokenCount) =>
			canAddMultipleChaosTokens({
				...options,
				unlimitedChaosTokens,
				tokenCount,
			}),
	);
