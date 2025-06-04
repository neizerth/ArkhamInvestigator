import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagSkillValue,
	selectChaosTokenValue,
	selectModifyScenarioChaosTokens,
} from "../../chaosBag";

export const selectShowSkillCheckResult = createSelector(
	[
		selectChaosTokenValue,
		selectChaosBagSkillValue,
		selectModifyScenarioChaosTokens,
	],
	(value, skillValue, modifyEnabled) => {
		return modifyEnabled && typeof skillValue === "number" && value;
	},
);
