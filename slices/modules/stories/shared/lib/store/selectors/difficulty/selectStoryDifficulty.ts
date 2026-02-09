import { createSelector } from "@reduxjs/toolkit";
import { getStoryDifficultyLevelById } from "../../../logic";
import { selectStoryDifficultyId } from "../../stories";
import { selectStory } from "../selectStory";

export const selectStoryDifficulty = createSelector(
	[selectStoryDifficultyId, selectStory],
	(difficultyId, story) => {
		return getStoryDifficultyLevelById({ story, difficultyId });
	},
);
