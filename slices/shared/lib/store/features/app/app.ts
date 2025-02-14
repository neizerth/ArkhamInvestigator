import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSliceState } from 'redux-toolkit-helpers';

export type IAppState = {
  loading: boolean
}

const initialState: IAppState = {
  loading: true,
};

export const app = createSlice({
  name: 'app',
  ...createSliceState(initialState)
});


export const {
  setLoading
} = app.actions;

export const {
  selectLoading
} = app.selectors;

export default app.reducer;