import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { canAddMultipleChaosTokens } from "../../../logic";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../chaosBag";

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
