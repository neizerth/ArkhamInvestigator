import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckSucceedBy } from "../../logic";
import { selectSkillCheckResult } from "./selectSkillCheckResult";

export const selectSkillCheckSucceedByResult = createSelector(
	[
		selectSkillCheckDifficulty,
		selectSkillCheckResult,
		selectSkillCheckDifficultyType,
	],
	(difficultyValue, result, type) => {
		if (result === null) {
			return 0;
		}
		const difficulty = difficultyValue || 0;
		const difficultyType = type || "gte";

		return getSkillCheckSucceedBy({
			difficulty,
			result,
			difficultyType,
		});
	},
);
