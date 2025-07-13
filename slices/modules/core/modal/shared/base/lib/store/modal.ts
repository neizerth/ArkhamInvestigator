import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { modalPrefix } from "../../config";
import type { ModalType } from "../../model";
import * as reducers from "./reducers";

export type ModalState = {
	modalId: string | null;
	type: ModalType | null;
	data: unknown | null;
	textValue: string | null;
};
const initialState: ModalState = {
	modalId: null,
	type: null,
	data: null,
	textValue: null,
};

const state = createSliceState(initialState);

export const modal = createSlice({
	name: modalPrefix,
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setData: setModalData,
	setType: setModalType,
	setModalId,
	openModal,
	closeModalInternal,
	setTextValue: setModalTextValue,
} = modal.actions;

export const {
	selectType: selectModalType,
	selectData: selectModalData,
	selectModalId,
	selectTextValue: selectModalTextValue,
} = modal.selectors;

export default modal.reducer;
