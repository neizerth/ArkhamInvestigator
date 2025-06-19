import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import { createSelector } from "@reduxjs/toolkit";
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
