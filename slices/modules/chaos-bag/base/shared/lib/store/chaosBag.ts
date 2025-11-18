import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import * as baseReducers from "./features/reducers";

import type { ChaosBagToken, ChaosTokenCount } from "../../model";

export type ChaosBagState = {
	tokenCount: ChaosTokenCount;
	contents: ChaosBagToken[];

	loadingAnimation: boolean;
	enabled: boolean;
	unlimitedChaosTokens: boolean;
	modifyChaosTokens: boolean;
	showDifficulty: boolean;
	showChaosBagOdds: boolean;
};

const initialState: ChaosBagState = {
	enabled: true,
	tokenCount: {},
	contents: [],
	loadingAnimation: false,

	unlimitedChaosTokens: false,
	modifyChaosTokens: true,
	showDifficulty: false,
	showChaosBagOdds: false,
};

const state = createSliceState(initialState);

export const chaosBag = createSlice({
	name: "chaosBag",
	...state,
	reducers: {
		...state.reducers,
		...baseReducers,
	},
});

export const {
	setTokenCount: setChaosBagTokenCount,
	setContents: setChaosBagContents,
	setLoadingAnimation: setChaosBagLoadingAnimation,
	setEnabled: setChaosBagEnabled,
	setUnlimitedChaosTokens,
	setModifyChaosTokens,
	setShowDifficulty,
	setShowChaosBagOdds,

	// internal reducers
	addChaosTokenInternal,
	removeAllChaosTokensByTypeInternal,
	removeChaosTokenInternal,
	updateChaosTokenInternal,
	clearChaosBagInternal,
} = chaosBag.actions;

export const {
	selectTokenCount: selectChaosBagTokenCount,
	selectContents: selectChaosBagContents,

	selectLoadingAnimation: selectChaosBagLoadingAnimation,
	selectEnabled: selectChaosBagEnabledInternal,
	selectUnlimitedChaosTokens,
	selectModifyChaosTokens,
	selectShowDifficulty,
	selectShowChaosBagOdds,
} = chaosBag.selectors;

export default chaosBag.reducer;
