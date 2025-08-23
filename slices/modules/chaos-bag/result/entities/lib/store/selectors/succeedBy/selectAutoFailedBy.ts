import {
	getDefaulSkillCheckDifficultyType,
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckResultSucceedBy } from "../../../../../shared/lib/logic";

export const selectAutoFailedBy = createSelector(
	[selectSkillCheckDifficulty, selectSkillCheckDifficultyType],
	(currentDifficulty, currentDifficultyType) => {
		const difficulty = currentDifficulty ?? 0;
		const difficultyType = getDefaulSkillCheckDifficultyType(
			currentDifficultyType,
		);

		return getSkillCheckResultSucceedBy({
			result: 0,
			difficulty,
			difficultyType,
		});
	},
);
