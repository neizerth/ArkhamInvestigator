import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

/**
 * Persisted on purpose: an interrupted download continues after a network error or an app restart.
 */
export type AssetDownloadResumeState = {
	/**
	 * url → data to resume the download with.
	 * iOS: the blob of the paused task. Android: `null`, the partial file size is used instead.
	 */
	interrupted: Record<string, string | null>;
};

type SetInterruptedPayload = {
	url: string;
	resumeData: string | null;
};

const initialState: AssetDownloadResumeState = {
	interrupted: {},
};

const state = createSliceState(initialState);

export const assetDownloadResume = createSlice({
	name: "assetDownloadResume",
	...state,
	reducers: {
		...state.reducers,
		setInterrupted: (
			state,
			{ payload }: PayloadAction<SetInterruptedPayload>,
		) => {
			state.interrupted = {
				...state.interrupted,
				[payload.url]: payload.resumeData,
			};
		},
		removeInterrupted: (state, { payload }: PayloadAction<string>) => {
			const { [payload]: _, ...rest } = state.interrupted ?? {};
			state.interrupted = rest;
		},
	},
});

export const { setInterrupted, removeInterrupted } =
	assetDownloadResume.actions;

export const { selectInterrupted } = assetDownloadResume.selectors;

export default assetDownloadResume.reducer;
