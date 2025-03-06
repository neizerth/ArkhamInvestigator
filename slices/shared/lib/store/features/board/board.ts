import { createSlice } from '@reduxjs/toolkit';
import type { InvestigatorBoard, SkillCheck } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';
import { sendDigitSignal } from './actions/signals';

export type IBoardState = {
  currentInvestigatorIndex: number | null
  investigatorBoards: InvestigatorBoard[]
  
}

const initialState: IBoardState = {
  currentInvestigatorIndex: null,
  investigatorBoards: []
};

const state = createSliceState(initialState);

export const board = createSlice({
  name: 'board',
  ...state
});

export const {
  setCurrentInvestigatorIndex,
  setInvestigatorBoards,
} = board.actions;

export const {
  selectCurrentInvestigatorIndex,
  selectInvestigatorBoards,
} = board.selectors;

export default board.reducer;