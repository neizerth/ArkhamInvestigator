import { createSelector } from "@reduxjs/toolkit";
import { selectStories, selectStoryCode } from "../stories";

export const selectStory = createSelector(
	selectStoryCode,
	selectStories,
	(code, stories) => {
		if (!code) {
			return null;
		}
		return stories.find((story) => story.code === code);
	},
);
