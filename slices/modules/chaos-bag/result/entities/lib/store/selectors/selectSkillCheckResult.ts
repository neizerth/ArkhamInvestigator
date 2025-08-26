import { selectModifyChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import {
	selectAllRevealedTokens,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckResult } from "../../../../shared/lib/logic";

export const selectSkillCheckResult = createSelector(
	[selectChaosBagSkillValue, selectAllRevealedTokens, selectModifyChaosTokens],
	(skillValue, tokens, modify): number | null => {
		if (!modify || typeof skillValue !== "number") {
			return null;
		}

		return getSkillCheckResult({
			skillValue,
			tokens,
		});
	},
);
