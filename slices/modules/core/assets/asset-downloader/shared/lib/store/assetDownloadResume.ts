import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

/**
 * Persisted on purpose: an interrupted download continues from the partial file
 * after a network error or an app restart.
 */
export type AssetDownloadResumeState = {
	interruptedUrls: string[];
};

const initialState: AssetDownloadResumeState = {
	interruptedUrls: [],
};

const state = createSliceState(initialState);

export const assetDownloadResume = createSlice({
	name: "assetDownloadResume",
	...state,
	reducers: {
		...state.reducers,
		addInterruptedUrl: (state, { payload }: PayloadAction<string>) => {
			if (!state.interruptedUrls.includes(payload)) {
				state.interruptedUrls.push(payload);
			}
		},
		removeInterruptedUrl: (state, { payload }: PayloadAction<string>) => {
			state.interruptedUrls = state.interruptedUrls.filter(
				(url) => url !== payload,
			);
		},
	},
});

export const { addInterruptedUrl, removeInterruptedUrl } =
	assetDownloadResume.actions;

export const { selectInterruptedUrls } = assetDownloadResume.selectors;

export default assetDownloadResume.reducer;
