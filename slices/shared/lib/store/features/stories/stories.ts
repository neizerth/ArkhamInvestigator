import { createSlice } from "@reduxjs/toolkit";
import type { Story } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IStoriesState = {
	stories: Story[];
	storyCode: string | null;
	showTranslatedOnlyStories: boolean;
	showFanMadeStories: boolean;
	storyTypeFilter: string;
	referenceCardCode: string | null;
	showReferenceBackText: boolean;
};

const initialState: IStoriesState = {
	stories: [],
	storyCode: null,
	showTranslatedOnlyStories: true,
	showFanMadeStories: false,
	storyTypeFilter: "campaign",
	referenceCardCode: null,
	showReferenceBackText: false,
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
	setStoryTypeFilter,
	setReferenceCardCode,
	setShowReferenceBackText,
} = stories.actions;
export const {
	selectStories,
	selectStoryCode,
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStoryTypeFilter,
	selectReferenceCardCode,
	selectShowReferenceBackText,
} = stories.selectors;

export default stories.reducer;
