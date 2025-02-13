import { createSlice } from '@reduxjs/toolkit';
import type { Investigator } from 'arkham-investigator-data';
import { loadInvestigatorsMediaData } from '../app/app.thunks';

import { createSliceReducer, createSliceState } from 'redux-toolkit-helpers'; 

export type IInvestigatorsState = {
  investigatorsMedia: Investigator[]
}

const initialState: IInvestigatorsState = {
  investigatorsMedia: []
};

export const investigatorsMedia = createSlice({
  name: 'investigators',
  ...createSliceState(initialState),
  extraReducers: builder => {
    builder.addCase(
      loadInvestigatorsMediaData.fulfilled, 
      createSliceReducer('investigatorsMedia')
    );
  }
});

export const {
  selectInvestigatorsMedia
} = investigatorsMedia.selectors;

export default investigatorsMedia.reducer;