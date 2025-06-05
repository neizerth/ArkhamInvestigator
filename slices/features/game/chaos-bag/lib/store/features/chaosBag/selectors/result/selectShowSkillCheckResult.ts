import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagSkillValue,
	selectChaosTokenValue,
	selectModifyChaosTokens,
} from "../../chaosBag";

export const selectShowSkillCheckResult = createSelector(
	[selectChaosTokenValue, selectChaosBagSkillValue, selectModifyChaosTokens],
	(value, skillValue, modifyEnabled) => {
		return modifyEnabled && typeof skillValue === "number" && value;
	},
);
