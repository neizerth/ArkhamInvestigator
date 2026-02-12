import { createRemoteReducer } from "@modules/core/network/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { Story } from "../../model";

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

const state = createSliceState(initialState);

export const stories = createSlice({
	name: "stories",
	...state,
	reducers: {
		...state.reducers,
		setStoryCode: createRemoteReducer(state.reducers.setStoryCode, {
			notify: "all",
		}),
		setReferenceCardCode: createRemoteReducer(
			state.reducers.setReferenceCardCode,
			{
				notify: "all",
			},
		),
		setShowReferenceBackText: createRemoteReducer(
			state.reducers.setShowReferenceBackText,
			{
				notify: "all",
			},
		),
		setStoryDifficultyId: createRemoteReducer(
			state.reducers.setStoryDifficultyId,
			{
				notify: "all",
			},
		),
	},
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
