import { createSelector } from "@reduxjs/toolkit";
import { getStoryDifficultyLevelById } from "../../../logic";
import { selectStory } from "../selectStory";

export const selectStoryDifficultyById = (difficultyId: string) =>
	createSelector([selectStory], (story) => {
		return getStoryDifficultyLevelById({ story, difficultyId });
	});
