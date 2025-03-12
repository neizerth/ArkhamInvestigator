import { createSlice } from '@reduxjs/toolkit';
import type { Investigator } from 'arkham-investigator-data';

import { createSliceReducer, createSliceState } from 'redux-toolkit-helpers'; 
import { loadInvestigatorsMediaData } from '../../app/actions/api';
export type IInvestigatorsState = {
  investigatorMedia: Investigator[]
}

const initialState: IInvestigatorsState = {
  investigatorMedia: []
};

export const investigatorMedia = createSlice({
  name: 'investigatorMedia',
  ...createSliceState(initialState),
  extraReducers: builder => {
    builder.addCase(
      loadInvestigatorsMediaData.fulfilled, 
      createSliceReducer('investigatorMedia')
    );
  }
});

export const {
  selectInvestigatorMedia
} = investigatorMedia.selectors;

export default investigatorMedia.reducer;