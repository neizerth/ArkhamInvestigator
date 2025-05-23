import type { AppThunk, SkillCheckDifficultyType } from "@shared/model";
import {
	selectSkillCheckDifficultyType,
	setSkillCheckDifficultyType,
} from "../skillCheck";

export const toggleSkillCheckDifficultyType =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();

		const type = selectSkillCheckDifficultyType(state);

		const nextType: SkillCheckDifficultyType = type === "gt" ? "gte" : "gt";

		dispatch(setSkillCheckDifficultyType(nextType));
	};
