import { createSlice } from "@reduxjs/toolkit";
import type { Story } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IStoriesState = {
	stories: Story[];
	storyCode: string | null;
	showTranslatedOnlyStories: boolean;
	showFanMadeStories: boolean;
};

const initialState: IStoriesState = {
	stories: [],
	storyCode: null,
	showTranslatedOnlyStories: true,
	showFanMadeStories: false,
};

export const stories = createSlice({
	name: "stories",
	...createSliceState(initialState),
});

export const {
	setStories,
	setStoryCode,
	setShowFanMadeStories,
	setShowTranslatedOnlyStories,
} = stories.actions;
export const {
	selectStories,
	selectStoryCode,
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
} = stories.selectors;

export default stories.reducer;
