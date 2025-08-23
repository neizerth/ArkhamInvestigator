import {
	getDefaulSkillCheckDifficultyType,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckResultSucceedBy } from "../../../../../shared/lib/logic";
import { selectSkillCheckResult } from "../selectSkillCheckResult";

export const selectAutoSucceedBy = createSelector(
	[selectSkillCheckResult, selectSkillCheckDifficultyType],
	(result, currentDifficultyType) => {
		if (typeof result !== "number") {
			return 0;
		}
		const difficultyType = getDefaulSkillCheckDifficultyType(
			currentDifficultyType,
		);

		return getSkillCheckResultSucceedBy({
			difficulty: 0,
			difficultyType,
			result,
		});
	},
);
