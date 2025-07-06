import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { chaosBagRevealModalPrefix } from "../../config";
import * as reducers from "./reducers";

export type ChaosBagRevealModalState = {
	showRevealModal: boolean;
};

const initialState: ChaosBagRevealModalState = {
	showRevealModal: false,
};

const state = createSliceState(initialState);

export const chaosBagRevealModal = createSlice({
	name: chaosBagRevealModalPrefix,
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const { setShowRevealModal, openChaosBagRevealModal } =
	chaosBagRevealModal.actions;

export const { selectShowRevealModal } = chaosBagRevealModal.selectors;

export default chaosBagRevealModal.reducer;
