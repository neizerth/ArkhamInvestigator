import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import * as baseReducers from "./features/reducers";

import { createRemoteReducer } from "@modules/core/network/shared/lib";
import type { ChaosBagToken, ChaosTokenCount } from "../../model";

export type ChaosBagState = {
	tokenCount: ChaosTokenCount;
	contents: ChaosBagToken[];

	loadingAnimation: boolean;
	enabled: boolean;
	unlimitedChaosTokens: boolean;
	modifyChaosTokens: boolean;
	showDifficulty: boolean;
	chaosBagUpdatedAt: string;
};

const initialState: ChaosBagState = {
	enabled: true,
	tokenCount: {},
	contents: [],
	loadingAnimation: false,

	unlimitedChaosTokens: false,
	modifyChaosTokens: true,
	showDifficulty: false,
	chaosBagUpdatedAt: new Date().toISOString(),
};

const state = createSliceState(initialState);

const sliceReducers = {
	...state.reducers,
	...baseReducers,
};

export const chaosBag = createSlice({
	name: "chaosBag",
	...state,
	reducers: {
		...sliceReducers,
		setTokenCount: createRemoteReducer(sliceReducers.setTokenCount, {
			notify: "all",
		}),
		setUnlimitedChaosTokens: createRemoteReducer(
			sliceReducers.setUnlimitedChaosTokens,
			{
				notify: "all",
			},
		),
		addChaosTokenInternal: createRemoteReducer(
			sliceReducers.addChaosTokenInternal,
			{
				notify: "all",
			},
		),
		removeAllChaosTokensByTypeInternal: createRemoteReducer(
			sliceReducers.removeAllChaosTokensByTypeInternal,
			{
				notify: "all",
			},
		),
		removeChaosTokenInternal: createRemoteReducer(
			sliceReducers.removeChaosTokenInternal,
			{
				notify: "all",
			},
		),
		updateChaosTokenInternal: createRemoteReducer(
			sliceReducers.updateChaosTokenInternal,
			{
				notify: "all",
			},
		),
		clearChaosBagInternal: createRemoteReducer(
			sliceReducers.clearChaosBagInternal,
			{
				notify: "all",
			},
		),
	},
});

export const {
	setTokenCount: setChaosBagTokenCount,
	setLoadingAnimation: setChaosBagLoadingAnimation,
	setEnabled: setChaosBagEnabled,
	setChaosBagContents,
	setUnlimitedChaosTokens,
	setModifyChaosTokens,
	setShowDifficulty,

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
	selectChaosBagUpdatedAt,
} = chaosBag.selectors;

export default chaosBag.reducer;
