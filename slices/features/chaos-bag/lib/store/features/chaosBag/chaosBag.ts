import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosTokensCount } from "../../../../model";

export type IChaosBagState = {
	contents: ChaosTokensCount;
};

const initialState: IChaosBagState = {
	contents: {},
};

export const chaosBag = createSlice({
	name: "chaosBag",
	...createSliceState(initialState),
});

export const { setContents: setChaosBagContents } = chaosBag.actions;

export const { selectContents: selectChaosBagContents } = chaosBag.selectors;

export default chaosBag.reducer;
