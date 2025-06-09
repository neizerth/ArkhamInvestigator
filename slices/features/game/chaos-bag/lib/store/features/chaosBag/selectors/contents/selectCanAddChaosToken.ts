import { createSelector } from "@reduxjs/toolkit";
import { chaosToken } from "../../../../../../config";
import type { ChaosTokenType } from "../../../../../../model";
import { selectUnlimitedChaosTokens } from "../../chaosBag";
import { selectChaosTokenCount } from "./selectChaosTokenCount";

export const selectCanAddChaosToken = (type: ChaosTokenType) =>
	createSelector(
		[selectChaosTokenCount(type), selectUnlimitedChaosTokens],
		(count, unlimited) => {
			if (unlimited) {
				return true;
			}
			return count + 1 < chaosToken.count[type];
		},
	);
