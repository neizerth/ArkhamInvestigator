import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { chaosTokenValuePrefix } from "../../config";
import * as reducers from "./features/reducers";

export type ChaosTokenValueState = {
	chaosTokenValue: ChaosTokenValues | null;
	boardChaosTokenValue: Record<number, ChaosTokenValues | null> | null;
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
