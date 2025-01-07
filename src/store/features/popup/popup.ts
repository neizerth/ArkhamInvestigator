import { createSliceSelector } from '@/features/slice/createSliceSelector';
import { createSliceSetter } from '@/features/slice/createSliceSetter';
import type { AppThunk } from '@/store';
import type { Nullable } from '@/types/common';
import { createSlice, type ActionCreator } from '@reduxjs/toolkit';

export type IPopupState = {
  id: Nullable<string>;
}

const initialState: IPopupState = {
  id: null
};

export const popup = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopupId: createSliceSetter('id')
  },
  selectors: {
    selectPopupId: createSliceSelector('id')
  }
});

export const openPopup: ActionCreator<AppThunk> = (id: string) => dispatch => dispatch(setPopupId(id));
export const closePopup: ActionCreator<AppThunk> = () => dispatch => dispatch(setPopupId(null));

export const {
  setPopupId
} = popup.actions;

export const {
  selectPopupId
} = popup.selectors;

export default popup.reducer;