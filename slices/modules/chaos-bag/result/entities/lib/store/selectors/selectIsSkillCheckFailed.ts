import {
	getDefaulSkillCheckDifficultyType,
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import {
	selectAllRevealedTokens,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { isSkillCheckFailed } from "../../../../shared/lib/logic/isSkillCheckFailed";

export const selectIsSkillCheckFailed = createSelector(
	[
		selectChaosBagSkillValue,
		selectAllRevealedTokens,
		selectSkillCheckDifficulty,
		selectSkillCheckDifficultyType,
	],
	(skillCheckValue, tokens, currentDifficulty, currentDifficultyType) => {
		const difficulty = currentDifficulty ?? 0;
		const difficultyType = getDefaulSkillCheckDifficultyType(
			currentDifficultyType,
		);
		const skillValue = skillCheckValue ?? 0;

		return isSkillCheckFailed({
			tokens,
			difficulty,
			difficultyType,
			skillValue,
		});
	},
);
