import { createSelector } from "@reduxjs/toolkit";
import { selectBoardOddsMatrix } from "../chaosOdds";

export const selectChaosOdds = createSelector(
	[
		(_: unknown, skillValue: number) => skillValue,
		(_: unknown, difficulty: number) => difficulty,
		selectBoardOddsMatrix,
	],
	(skillValue, difficulty, matrix) => {
		if (!matrix) {
			return null;
		}
		return matrix[skillValue][difficulty];
	},
);
