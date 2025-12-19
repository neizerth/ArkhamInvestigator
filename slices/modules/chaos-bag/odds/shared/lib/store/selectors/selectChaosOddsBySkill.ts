import { selectSkillCheckDifficulty } from "@modules/board/skill-check/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { range } from "ramda";
import { selectBoardOddsMatrix, selectShowSkillOdds } from "../chaosOdds";

const skillRange = range(-2, 3);

type Result = Record<number, number>;

export const selectChaosOddsBySkill = createSelector(
	[
		(_: unknown, skillValue: number) => skillValue,
		selectSkillCheckDifficulty,
		selectBoardOddsMatrix,
		selectShowSkillOdds,
	],
	(skillValue, defaultDifficulty, matrix, enabled): Result | null => {
		if (!enabled) {
			return null;
		}

		const difficulty = defaultDifficulty ?? 0;
		if (!matrix) {
			return null;
		}
		return skillRange.reduce((acc, index) => {
			acc[index] = matrix[skillValue][difficulty + index];
			return acc;
		}, {} as Result);
	},
);
