import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./features/reducers";

export type ChaosBagEffectState = {
	chaosTokenOptions: Partial<Record<ChaosTokenType, number | null>> | null;
	boardChaosTokenOptions: Partial<
		Record<ChaosTokenType, Partial<Record<number, number | null>>>
	> | null;
};

const initialState: ChaosBagEffectState = {
	chaosTokenOptions: null,
	boardChaosTokenOptions: null,
};

const state = createSliceState(initialState);

export const chaosBagEffect = createSlice({
	...state,
	name: "chaosBagEffect",
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setBoardChaosTokenOptions,
	setChaosTokenOptions,
	setChaosTokenOptionInternal,
	setBoardChaosTokenOptionInternal,
	removeBoardChaosTokenOptionInternal,
} = chaosBagEffect.actions;

export const { selectChaosTokenOptions, selectBoardChaosTokenOptions } =
	chaosBagEffect.selectors;

export default chaosBagEffect.reducer;
