import { createSelector } from "@reduxjs/toolkit";
import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@shared/lib";
import { selectSkillCheckResult } from "./selectSkillCheckResult";

export const selectSkillCheckSucceedByResult = createSelector(
	[
		selectSkillCheckDifficulty,
		selectSkillCheckResult,
		selectSkillCheckDifficultyType,
	],
	(difficultyValue, resultValue, type) => {
		const total = typeof resultValue === "number" ? resultValue : 0;
		const difficulty = difficultyValue || 0;

		const diff = total - difficulty;

		if (type === "gt") {
			return diff - 1;
		}
		return diff;
	},
);
