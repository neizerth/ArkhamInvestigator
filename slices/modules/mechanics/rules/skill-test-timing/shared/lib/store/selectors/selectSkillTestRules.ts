import { selectRules } from "@modules/mechanics/rules/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillTestRules } from "../../logic";

export const selectSkillTestRules = createSelector(
	[selectRules],
	(rules = []) => {
		return getSkillTestRules(rules);
	},
);
