import { createSlice } from "@reduxjs/toolkit";
import type { Story } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IStoriesState = {
	stories: Story[];
};

const initialState: IStoriesState = {
	stories: [],
};

export const stories = createSlice({
	name: "stories",
	...createSliceState(initialState),
});

export const { setStories } = stories.actions;
export const { selectStories } = stories.selectors;

export default stories.reducer;
