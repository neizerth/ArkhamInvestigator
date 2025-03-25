import { createSlice } from '@reduxjs/toolkit';
import type { HapticFeedbackType } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';

export type IHapticState = {
  deafultType: HapticFeedbackType | false
}

const initialState: IHapticState = {
  deafultType: 'clockTick'
};

export const haptic = createSlice({
  name: 'haptic',
  ...createSliceState(initialState)
});

export const {
  setDeafultType: setDefaultHapticType
} = haptic.actions;

export const {
  selectDeafultType: selectDeafultHapticType
} = haptic.selectors;

export default haptic.reducer;