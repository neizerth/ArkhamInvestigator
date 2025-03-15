import type { ActionCreator } from "@reduxjs/toolkit";
import { selectCurrentBoard } from '../../selectors/selectCurrentBoard';
import { setValueFromHistoryIndex } from './setValueFromHistoryIndex'
import type { AppThunk } from "../../../..";

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