import { createSliceSelector } from '@/features/slice/createSliceSelector';
import { createSliceSetter } from '@/features/slice/createSliceSetter';
import { IIcon } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

export type IIconsState = {
  icons: IIcon[]
}

const initialState: IIconsState = {
  icons: []
};

export const icons = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIcons: createSliceSetter('icons')
  },
  selectors: {
    selectIcons: createSliceSelector('icons')
  }
});

export const {
  setIcons
} = icons.actions;

export const {
  selectIcons
} = icons.selectors;

export default icons.reducer;