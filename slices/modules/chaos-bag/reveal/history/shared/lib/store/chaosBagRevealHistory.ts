import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import { createRemoteReducer } from "@modules/core/network/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { chaosBagRevealHistoryPrefix } from "../../config";
import * as reducers from "./features/reducers";

export type ChaosBagRevealHistoryState = {
	revealHistory: ChaosBagHistoryItem[];
	currentRevealHistoryItem: ChaosBagHistoryItem | null;
};

const initialState: ChaosBagRevealHistoryState = {
	revealHistory: [],
	currentRevealHistoryItem: null,
};

const state = createSliceState(initialState);

const sliceReducers = {
	...state.reducers,
	...reducers,
};

export const chaosBagReveal = createSlice({
	name: chaosBagRevealHistoryPrefix,
	...state,
	reducers: {
		...sliceReducers,
		setRevealHistory: createRemoteReducer(sliceReducers.setRevealHistory, {
			notify: "all",
		}),
		addRevealHistoryItem: createRemoteReducer(
			sliceReducers.addRevealHistoryItem,
			{
				notify: "all",
			},
		),
		clearRevealHistory: createRemoteReducer(sliceReducers.clearRevealHistory, {
			notify: "all",
		}),
		patchRevealHistoryItem: createRemoteReducer(
			sliceReducers.patchRevealHistoryItem,
			{
				notify: "all",
			},
		),
		removeRevealHistoryItem: createRemoteReducer(
			sliceReducers.removeRevealHistoryItem,
			{
				notify: "all",
			},
		),
	},
});

export const {
	setRevealHistory,
	setCurrentRevealHistoryItem,
	addRevealHistoryItem,
	clearRevealHistory,
	patchRevealHistoryItem,
	removeRevealHistoryItem,
} = chaosBagReveal.actions;

export const { selectRevealHistory, selectCurrentRevealHistoryItem } =
	chaosBagReveal.selectors;

export default chaosBagReveal.reducer;
