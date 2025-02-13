import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAppData } from './app.thunks';

export type IAppState = {

}

const initialState: IAppState = {

};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
  },
  selectors: {

  }
});


export const {

} = app.actions;

export const {

} = app.selectors;

export default app.reducer;