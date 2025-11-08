import { createSelector } from "@reduxjs/toolkit";
import { selectSkillTestRules } from "./selectSkillTestRules";

export const selectSkillTestReferenceTitle = createSelector(
	[selectSkillTestRules],
	(rules) => rules?.title,
);
