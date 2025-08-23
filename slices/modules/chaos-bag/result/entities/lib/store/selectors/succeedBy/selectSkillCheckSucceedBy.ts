import {
	getDefaulSkillCheckDifficultyType,
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { selectAllRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckSucceedBy } from "../../../../../shared/lib/logic";
import { selectSkillCheckResult } from "../selectSkillCheckResult";

export const selectSkillCheckSucceedBy = createSelector(
	[
		selectSkillCheckDifficulty,

		selectSkillCheckDifficultyType,
		selectSkillCheckResult,

		selectAllRevealedTokens,
	],
	(currentDifficulty, currentDifficultyType, result, tokens) => {
		if (result === null) {
			return 0;
		}
		const difficulty = currentDifficulty ?? 0;
		const difficultyType = getDefaulSkillCheckDifficultyType(
			currentDifficultyType,
		);

		return getSkillCheckSucceedBy({
			difficulty,
			result,
			difficultyType,
			tokens,
		});
	},
);
