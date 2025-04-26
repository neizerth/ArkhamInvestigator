import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosTokensCount } from "../../../../model";

export type IChaosBagState = {
	contents: ChaosTokensCount | null;
};

const initialState: IChaosBagState = {
	contents: null,
};

const state = createSliceState(initialState);

export const chaosBag = createSlice({
	name: "chaosBag",
	...state,
	selectors: {
		...state.selectors,
		selectChaosBagContents: (state) => state.contents || {},
	},
});

export const { setContents: setChaosBagContents } = chaosBag.actions;

export const { selectChaosBagContents } = chaosBag.selectors;

export default chaosBag.reducer;
