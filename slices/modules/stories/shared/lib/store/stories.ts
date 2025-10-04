import { createSlice } from "@reduxjs/toolkit";
import type { Story } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type StoriesState = {
	stories: Story[];
	storyCode: string | null;
	showTranslatedOnlyStories: boolean;
	showFanMadeStories: boolean;
	storyTypeFilter: string;
	referenceCardCode: string | null;
	showReferenceBackText: boolean;
	storyDifficultyId: string | null;
};

const initialState: StoriesState = {
	stories: [],
	storyCode: null,
	showTranslatedOnlyStories: true,
	showFanMadeStories: false,
	storyTypeFilter: "campaign",
	referenceCardCode: null,
	showReferenceBackText: false,
	storyDifficultyId: null,
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
	setStoryDifficultyId,
} = stories.actions;
export const {
	selectStories,
	selectStoryCode,
	selectShowFanMadeStories,
	selectShowTranslatedOnlyStories,
	selectStoryTypeFilter,
	selectReferenceCardCode,
	selectShowReferenceBackText,
	selectStoryDifficultyId,
} = stories.selectors;

export default stories.reducer;
