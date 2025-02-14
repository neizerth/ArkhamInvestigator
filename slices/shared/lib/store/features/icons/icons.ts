import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ArkhamIcon } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';
import { loadCoreData } from '../app/app.thunks';

export type IIconsState = {
  icons: ArkhamIcon[]
}

const initialState: IIconsState = {
  icons: []
};

export const icons = createSlice({
  name: 'icons',
  ...createSliceState(initialState),
  extraReducers(builder) {
    builder.addCase(loadCoreData.fulfilled, (state, { payload }) => {
      const { icons } = payload;
      state.icons = icons;
    })
  }
});

export const {

} = icons.actions;

export const {

} = icons.selectors;

export default icons.reducer;