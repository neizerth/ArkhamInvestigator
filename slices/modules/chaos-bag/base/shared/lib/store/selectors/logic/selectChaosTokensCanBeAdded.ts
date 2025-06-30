import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getChaosTokensCanBeAdded } from "../../../logic";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../chaosBag";

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
