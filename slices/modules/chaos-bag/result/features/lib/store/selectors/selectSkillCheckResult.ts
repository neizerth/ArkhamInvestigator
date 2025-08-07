import {
	selectChaosBagSkillValue,
	selectRevealedTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckResult } from "../../logic";

export const selectSkillCheckResult = createSelector(
	[selectChaosBagSkillValue, selectRevealedTokens],
	(skillValue, tokens): ChaosTokenValue | null => {
		if (typeof skillValue !== "number") {
			return null;
		}

		return getSkillCheckResult({
			skillValue,
			tokens,
		});
	},
);
