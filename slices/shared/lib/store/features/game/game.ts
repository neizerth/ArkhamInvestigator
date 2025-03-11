import { createSlice } from '@reduxjs/toolkit';
import type { InvestigatorDetails, Nullable, SelectedInvestigator } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';
import * as reducers from './reducers'

export type IGameState = {
  selectedInvestigators: SelectedInvestigator[]
  currentInvestigatorDetails: Nullable<InvestigatorDetails>
  showDescription: boolean
  replaceInvestigator: boolean
}

const initialState: IGameState = {
  selectedInvestigators: [],
  currentInvestigatorDetails: null,
  showDescription: false,
  replaceInvestigator: false
}

const state = createSliceState(initialState);

export const game = createSlice({
  name: 'game',
  ...state,
  reducers: {
    ...reducers,
    ...state.reducers
  }
});

export const {
  setSelectedInvestigators,
  setCurrentInvestigatorDetails,
  setInvestigatorSkin,
  setInvestigatorVariant,
  setShowDescription,
  setReplaceInvestigator
} = game.actions;

export const {
  selectSelectedInvestigators,
  selectCurrentInvestigatorDetails,
  selectShowDescription,
  selectReplaceInvestigator
} = game.selectors;

export default game.reducer;