import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
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

export const chaosBagReveal = createSlice({
	name: chaosBagRevealHistoryPrefix,
	...state,
	reducers: {
		...state.reducers,
		...reducers,
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
