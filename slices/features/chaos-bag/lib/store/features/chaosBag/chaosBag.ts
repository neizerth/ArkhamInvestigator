import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosBagToken, ChaosTokensCount } from "../../../../model";

export type IChaosBagState = {
	tokenCount: ChaosTokensCount;
	sealedTokens: ChaosBagToken[];
	contents: ChaosBagToken[];
};

const initialState: IChaosBagState = {
	tokenCount: {},
	sealedTokens: [],
	contents: [],
};

const state = createSliceState(initialState);

export const chaosBag = createSlice({
	name: "chaosBag",
	...state,
});

export const {
	setTokenCount: setChaosBagTokenCount,
	setContents: setChaosBagContents,
	setSealedTokens: setChaosBagSealedTokens,
} = chaosBag.actions;

export const {
	selectTokenCount: selectChaosBagTokenCount,
	selectSealedTokens: selectChaosBagSealedTokens,
	selectContents: selectChaosBagContents,
} = chaosBag.selectors;

export default chaosBag.reducer;
