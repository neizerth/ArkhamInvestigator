import { createSlice } from '@reduxjs/toolkit';
import type { InvestigatorBoard, SkillCheckInfo } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';

export type IBoardState = {
  currentInvestigatorIndex: number | null
  investigatorBoards: InvestigatorBoard[]
  currentCheck: SkillCheckInfo | null
}

const initialState: IBoardState = {
  currentInvestigatorIndex: null,
  investigatorBoards: [],
  currentCheck: null
};

const state = createSliceState(initialState);

export const board = createSlice({
  name: 'board',
  ...state
});

export const {
  setCurrentInvestigatorIndex,
  setInvestigatorBoards,
  setCurrentCheck
} = board.actions;

export const {
  selectCurrentInvestigatorIndex,
  selectInvestigatorBoards,
  selectCurrentCheck
} = board.selectors;

export default board.reducer;