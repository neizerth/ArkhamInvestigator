import type { ModalData } from '@features/modal/model';
import { createSlice } from '@reduxjs/toolkit';
import { createSliceState } from 'redux-toolkit-helpers';

export type IModalState = {
  modalId: string | null
  data: ModalData | null,
 
}
const initialState: IModalState = {
  modalId: null,
  data: null
};

export const modal = createSlice({
  name: 'modal',
  ...createSliceState(initialState),
});

export const {
  setData: setModalData,
  setModalId
} = modal.actions;

export const {
  selectData: selectModalData,
  selectModalId
} = modal.selectors;

export default modal.reducer;