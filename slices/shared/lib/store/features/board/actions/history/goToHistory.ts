import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import { selectCurrentBoard } from '../../selectors/selectCurrentBoard';
import { setValueFromHistoryIndex } from './setValueFromHistoryIndex'

export const goToHistory: ActionCreator<AppThunk> = (delta: number) => 
  (dispatch, getState) => {
    const state = getState();

    const board = selectCurrentBoard(state);

    if (!board) {
      return;
    }
    const index = board.historyIndex + delta;

    const historyIndex = Math.min(
      Math.max(-1, index),
      board.history.length - 1
    )

    dispatch(setValueFromHistoryIndex(historyIndex))
  }