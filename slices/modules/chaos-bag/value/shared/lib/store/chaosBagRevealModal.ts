import type { ScenarioChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { chaosTokenValuePrefix } from "../../config";
import * as reducers from "./reducers";

export type ChaosTokenValueState = {
	chaosTokenValue: ScenarioChaosTokenValues | null;
	boardChaosTokenValue: Record<number, ScenarioChaosTokenValues | null> | null;
};

const initialState: ChaosTokenValueState = {
	chaosTokenValue: null,
	boardChaosTokenValue: null,
};

const state = createSliceState(initialState);

export const chaosBagRevealModal = createSlice({
	name: chaosTokenValuePrefix,
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setChaosTokenValue: setChaosTokenValueInternal,
	setBoardChaosTokenValue,

	clearChaosTokenValue,
	updateBoardChaosTokenValueInternal,
	updateChaosTokenValueInternal,
} = chaosBagRevealModal.actions;

export const {
	selectChaosTokenValue: selectChaosTokenValueInternal,
	selectBoardChaosTokenValue,
} = chaosBagRevealModal.selectors;

export default chaosBagRevealModal.reducer;
