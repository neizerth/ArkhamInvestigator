import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { canAddChaosToken } from "../../../logic";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../chaosBag";

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
