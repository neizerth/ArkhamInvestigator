import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagSkillValue,
	selectModifyChaosTokens,
} from "../../chaosBag";

export const selectShowSkillCheckResult = createSelector(
	[selectChaosBagSkillValue, selectModifyChaosTokens],
	(skillValue, modifyEnabled) => {
		return modifyEnabled && typeof skillValue === "number";
	},
);
