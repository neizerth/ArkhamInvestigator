import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosTokenType, ChaosTokensCount } from "../../../../model";

export type IChaosBagState = {
	tokenCount: ChaosTokensCount;
	sealedTokens: ChaosTokensCount;
	contents: ChaosTokenType[];
};

const initialState: IChaosBagState = {
	tokenCount: {},
	sealedTokens: {},
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
