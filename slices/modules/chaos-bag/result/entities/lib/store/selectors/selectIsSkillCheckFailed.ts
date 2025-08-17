import {
	getDefaulSkillCheckDifficultyType,
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { selectAllRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { isSkillCheckFailed } from "../../../../shared/lib/logic/isSkillCheckFailed";

export const selectIsSkillCheckFailed = createSelector(
	[
		selectAllRevealedTokens,
		selectSkillCheckDifficulty,
		selectSkillCheckDifficultyType,
	],
	(tokens, currentDifficulty, currentDifficultyType) => {
		const difficulty = currentDifficulty ?? 0;
		const difficultyType = getDefaulSkillCheckDifficultyType(
			currentDifficultyType,
		);

		return isSkillCheckFailed({
			tokens,
			difficulty,
			difficultyType,
			skillValue: 0,
		});
	},
);
