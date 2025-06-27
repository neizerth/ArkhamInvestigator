import {
	selectChaosBagSkillValue,
	selectModifyChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectShowSkillCheckResult = createSelector(
	[selectChaosBagSkillValue, selectModifyChaosTokens],
	(skillValue, modifyEnabled) => {
		return modifyEnabled && typeof skillValue === "number";
	},
);
