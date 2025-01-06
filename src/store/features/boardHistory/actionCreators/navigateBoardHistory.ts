import type { AppThunk } from "@/store";
import type { ActionCreator } from "@reduxjs/toolkit";
import { selectBoardBaseValue, selectBoardHistory, setBoardHistoryIndex, setBoardValue } from "../boardHistory";
import type { IBoard } from "@/types/board";
import { mapHistoryItem } from "../features/mapHistoryItem";

export const navigateBoardHistory: ActionCreator<AppThunk> = (index: number) => (dispatch, getState) => {
  const state = getState();
  const baseValue = selectBoardBaseValue(state);
  if (!baseValue) {
    return;
  }

  const history = selectBoardHistory(state);

  const items = history.slice(0, index + 1);
  const patches = items.map(mapHistoryItem);

  const value: IBoard = Object.assign({}, baseValue, ...patches);

  dispatch(setBoardValue(value));
  dispatch(setBoardHistoryIndex(index));
}
