import { createSelector } from "@reduxjs/toolkit";
import { getSkillTestSteps } from "../../logic";
import { selectSkillTestRules } from "./selectSkillTestRules";

export const selectSkillTestSteps = createSelector(
	[selectSkillTestRules],
	(item) => {
		if (!item) {
			return [];
		}
		return getSkillTestSteps(item);
	},
);
