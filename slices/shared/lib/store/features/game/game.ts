import { createSlice } from '@reduxjs/toolkit';
import type { InvestigatorDetails, Nullable, SelectedInvestigator } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';
import * as reducers from './reducers'

export type IGameState = {
  selectedInvestigators: SelectedInvestigator[]
  currentInvestigatorDetails: Nullable<InvestigatorDetails>
  showDescription: boolean
  showAdditionalInformation: boolean
  replaceInvestigator: boolean
}

const initialState: IGameState = {
  selectedInvestigators: [],
  currentInvestigatorDetails: null,
  showDescription: false,
  showAdditionalInformation: false,
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
  setReplaceInvestigator,
  setShowAdditionalInformation
} = game.actions;

export const {
  selectSelectedInvestigators,
  selectCurrentInvestigatorDetails,
  selectShowDescription,
  selectReplaceInvestigator,
  selectShowAdditionalInformation
} = game.selectors;

export default game.reducer;