import { createSelector } from "@reduxjs/toolkit";
import { selectStoryDifficultyId } from "../../stories";
import { selectStory } from "../selectStory";

export const selectStoryDifficulty = createSelector(
	[selectStoryDifficultyId, selectStory],
	(difficultyId, story) => {
		return story?.difficultyLevels.find((level) => level.id === difficultyId);
	},
);
