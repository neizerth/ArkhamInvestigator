import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EncounterSet } from '@shared/model';
import { createSliceReducer, createSliceState } from 'redux-toolkit-helpers';
import { loadCoreData } from '../app/app.thunks';

export type IEncounterSetsState = {
  encounterSets: EncounterSet[]
}

const initialState: IEncounterSetsState = {
  encounterSets: []
};

export const encounterSets = createSlice({
  name: 'encounterSets',
  ...createSliceState(initialState),
  extraReducers(builder) {
    builder.addCase(loadCoreData.fulfilled, (state, { payload }) => {
      const { encounterSets } = payload;
      state.encounterSets = encounterSets;
    })
  }
});

export const {
  selectEncounterSets
} = encounterSets.selectors;

export default encounterSets.reducer;