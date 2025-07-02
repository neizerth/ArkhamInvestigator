import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ModalData } from "../../model";

export type ModalState = {
	modalId: string | null;
	data: ModalData | null;
	ready: boolean;
};
const initialState: ModalState = {
	modalId: null,
	data: null,
	ready: false,
};

export const modal = createSlice({
	name: "modal",
	...createSliceState(initialState),
});

export const {
	setData: setModalData,
	setModalId,
	setReady: setModalReady,
} = modal.actions;

export const {
	selectData: selectModalData,
	selectModalId,
	selectReady: selectModalReady,
} = modal.selectors;

export default modal.reducer;
