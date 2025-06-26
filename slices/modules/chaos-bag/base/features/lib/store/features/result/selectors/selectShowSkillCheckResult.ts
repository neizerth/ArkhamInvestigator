import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagSkillValue,
	selectModifyChaosTokens,
} from "../../../../../../shared/lib/store/chaosBag";

export const selectShowSkillCheckResult = createSelector(
	[selectChaosBagSkillValue, selectModifyChaosTokens],
	(skillValue, modifyEnabled) => {
		return modifyEnabled && typeof skillValue === "number";
	},
);
