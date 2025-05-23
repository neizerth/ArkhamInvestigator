import { createSelector } from "@reduxjs/toolkit";
import type { SkillCheckDifficultyType } from "@shared/model";
import { selectSkillCheckDifficultyType } from "../skillCheck";

const mapping: Record<SkillCheckDifficultyType, string> = {
	gt: ">",
	gte: "⩾",
};

export const selectSkillCheckDifficultyCharacter = createSelector(
	[selectSkillCheckDifficultyType],
	(type) => {
		if (!type) {
			return mapping.gte;
		}
		return mapping[type];
	},
);
