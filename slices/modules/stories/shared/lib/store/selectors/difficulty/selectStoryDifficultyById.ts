import { createSelector } from "@reduxjs/toolkit";
import { selectStory } from "../selectStory";

export const selectStoryDifficultyById = (difficultyId: string) =>
	createSelector([selectStory], (story) => {
		return story?.difficultyLevels.find((level) => level.id === difficultyId);
	});
