import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EncounterSet } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';

export type IEncounterSetsState = {
  encounterSets: EncounterSet[]
}

const initialState: IEncounterSetsState = {
  encounterSets: []
};

export const encounterSets = createSlice({
  name: 'encounterSets',
  ...createSliceState(initialState),
  // extraReducers:
});

export const {

} = encounterSets.actions;

export const {

} = encounterSets.selectors;

export default encounterSets.reducer;