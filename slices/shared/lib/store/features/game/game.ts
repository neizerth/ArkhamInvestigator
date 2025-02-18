import { createSlice } from '@reduxjs/toolkit';
import type { InvestigatorDetails, Nullable, SelectedInvestigator } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';

export type IGameState = {
  selectedInvestigators: SelectedInvestigator[]
  currentInvestigatorDetails: Nullable<InvestigatorDetails>
}

const initialState: IGameState = {
  selectedInvestigators: [],
  currentInvestigatorDetails: null
}

export const game = createSlice({
  name: 'game',
  ...createSliceState(initialState)
});

export const {
  setSelectedInvestigators,
  setCurrentInvestigatorDetails
} = game.actions;

export const {
  selectSelectedInvestigators,
  selectCurrentInvestigatorDetails
} = game.selectors;

export default game.reducer;