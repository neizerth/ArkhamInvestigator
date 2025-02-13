import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ISettingsState = {

}

const initialState: ISettingsState = {

};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
  },
  selectors: {

  }
});

export const {

} = settings.actions;

export const {

} = settings.selectors;

export default settings.reducer;