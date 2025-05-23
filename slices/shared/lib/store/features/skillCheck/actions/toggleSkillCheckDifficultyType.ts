import type { AppThunk, SkillCheckDifficultyType } from "@shared/model";
import {
	selectSkillCheckDifficultyType,
	setSkillCheckDifficultyType,
} from "../skillCheck";

export const toggleSkillCheckDifficultyType =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();

		const type = selectSkillCheckDifficultyType(state);

		const nextType: SkillCheckDifficultyType =
			type === "equals" ? "gte" : "equals";

		dispatch(setSkillCheckDifficultyType(nextType));
	};
