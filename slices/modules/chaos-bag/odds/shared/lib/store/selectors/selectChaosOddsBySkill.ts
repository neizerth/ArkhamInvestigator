import { selectSkillCheckDifficulty } from "@modules/board/skill-check/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardOddsMatrix, selectShowSkillOdds } from "../chaosOdds";

export const selectChaosOddsBySkill = createSelector(
	[
		(_: unknown, skillValue: number) => skillValue,
		selectSkillCheckDifficulty,
		selectBoardOddsMatrix,
		selectShowSkillOdds,
	],
	(skillValue, defaultDifficulty, matrix, enabled) => {
		if (!enabled) {
			return null;
		}
		const difficulty = defaultDifficulty ?? 0;
		if (!matrix) {
			return null;
		}
		return matrix[skillValue][difficulty];
	},
);
