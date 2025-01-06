import type { AppThunk } from "@/store";
import type { ActionCreator } from "@reduxjs/toolkit";
import { selectBoardHistory, selectBoardHistoryIndex } from "../boardHistory";
import { navigateBoardHistory } from "./navigateBoardHistory";

export const goToBoardHistory: ActionCreator<AppThunk> = (step: number) => (dispatch, getState) => {
  const state = getState();
  const currentIndex = selectBoardHistoryIndex(state);
  const history = selectBoardHistory(state);
  const index = currentIndex + step;
  const size = history.length;

  if (index < 0 || index >= size) {
    return;
  }

  dispatch(navigateBoardHistory(index));
} 

export const undo: ActionCreator<AppThunk> = () => 
  dispatch => dispatch(goToBoardHistory(-1));

export const redo: ActionCreator<AppThunk> = () => 
  dispatch => dispatch(goToBoardHistory(1));