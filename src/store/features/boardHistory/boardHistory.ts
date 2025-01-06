import { createSliceSelector } from '@/features/slice/createSliceSelector';
import { createSliceSetter } from '@/features/slice/createSliceSetter';
import type { AppThunk } from '@/store';
import type { IBoard, IBoardHistoryItem } from '@/types/board';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { ActionCreator } from "@reduxjs/toolkit";
import { onInvestigatorSet } from './extraReducers/onInvestigatorSet';
import { DEFAULT_ACTIONS_COUNT, DEFAULT_RESOURCES_COUNT } from '@/config/app';

export type IBoardHistoryState = {
  baseValue: IBoard
  value: IBoard
  history: IBoardHistoryItem[]
  index: number
}

export const initialValue: IBoard = {
  health: 0,
  sanity: 0,
  actions: DEFAULT_ACTIONS_COUNT,
  clues: 0,
  combat: 0,
  agility: 0,
  willpower: 0,
  intellect: 0,
  resources: DEFAULT_RESOURCES_COUNT
}

const initialState: IBoardHistoryState = {
  baseValue: initialValue,
  value: initialValue,
  history: [],
  index: 0
};

export const boardHistory = createSlice({
  name: 'boardHistory',
  initialState,
  reducers: {
    setBoardBaseValue: createSliceSetter('baseValue'),
    setBoardValue: createSliceSetter('value'),
    setBoardHistory: createSliceSetter('history'),
    setBoardHistoryIndex: createSliceSetter('index')
  },
  selectors: {
    selectBoardBaseValue: createSliceSelector('baseValue'),
    selectBoardValue: createSliceSelector('value'),
    selectBoardHistory: createSliceSelector('history'),
    selectBoardHistoryIndex: createSliceSelector('index')
  },
  extraReducers(builder) {
    onInvestigatorSet(builder);
  }
});

export const clearBoardHistory: ActionCreator<AppThunk> = () => 
  dispatch => {
    dispatch(setBoardHistory([]))
    dispatch(setBoardHistoryIndex(0));
  };

export const {
  setBoardBaseValue,
  setBoardValue,
  setBoardHistory,
  setBoardHistoryIndex
} = boardHistory.actions;

export const {
  selectBoardBaseValue,
  selectBoardValue,
  selectBoardHistory,
  selectBoardHistoryIndex
} = boardHistory.selectors;

export * from './actionCreators';
export * from './selectors';
export default boardHistory.reducer;