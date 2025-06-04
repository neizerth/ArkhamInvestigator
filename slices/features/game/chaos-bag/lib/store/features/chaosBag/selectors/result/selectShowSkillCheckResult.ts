import { createSelector } from "@reduxjs/toolkit";
import {
	selectChaosBagSkillValue,
	selectChaosTokenValue,
} from "../../chaosBag";

export const selectShowSkillCheckResult = createSelector(
	[selectChaosTokenValue, selectChaosBagSkillValue],
	(value, skillValue) => {
		return typeof skillValue === "number" && value;
	},
);
