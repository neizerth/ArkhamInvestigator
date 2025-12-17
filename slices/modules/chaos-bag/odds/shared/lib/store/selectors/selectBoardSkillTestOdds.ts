import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardOddsMatrix } from "../chaosOdds";
import { selectOddsSkillValue } from "./selectOddsSkillValue";

export const selectBoardSkillTestOdds = createSelector(
	[
		selectSkillCheckDifficulty,
		selectSkillCheckDifficultyType,
		selectOddsSkillValue,
		selectBoardOddsMatrix,
	],
	(defaultDifficulty, difficultyType, defaultSkillValue, matrix) => {
		const baseDifficulty = defaultDifficulty ?? 0;
		const difficulty =
			difficultyType === "gt" ? baseDifficulty + 1 : baseDifficulty;

		const skillValue = defaultSkillValue ?? 0;

		const value = matrix?.[skillValue]?.[difficulty] ?? null;

		return value;
	},
);
