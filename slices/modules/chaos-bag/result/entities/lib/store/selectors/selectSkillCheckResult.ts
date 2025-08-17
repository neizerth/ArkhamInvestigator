import {
	selectAllRevealedTokens,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckResult } from "../../../../shared/lib/logic";

export const selectSkillCheckResult = createSelector(
	[selectChaosBagSkillValue, selectAllRevealedTokens],
	(skillValue, tokens): number | null => {
		if (typeof skillValue !== "number") {
			return null;
		}

		return getSkillCheckResult({
			skillValue,
			tokens,
		});
	},
);
