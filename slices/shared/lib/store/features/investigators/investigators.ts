import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Investigator } from 'arkham-investigator-data';
import { loadAppData } from '../app/app.thunks';

import { createSliceReducer, createSliceState } from 'redux-toolkit-helpers'; 

export type IInvestigatorsState = {
  investigators: Investigator[]
}

const initialState: IInvestigatorsState = {
  investigators: []
};

export const investigators = createSlice({
  name: 'investigators',
  ...createSliceState(initialState),
  extraReducers: builder => {
    builder.addCase(loadAppData.fulfilled, createSliceReducer('investigators'));
  }
});

export const {
  selectInvestigators
} = investigators.selectors;

export default investigators.reducer;