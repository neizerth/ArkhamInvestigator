import { selectChaosBagSkillValue } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectCustomSkillValue } from "../chaosOdds";

export const selectOddsSkillValue = createSelector(
	[selectChaosBagSkillValue, selectCustomSkillValue],
	(difficulty, customSkillValue) => {
		return difficulty ?? customSkillValue ?? 0;
	},
);
