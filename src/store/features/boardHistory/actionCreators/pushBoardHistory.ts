import type { AppThunk } from "@/store";
import type { IBoard, IBoardHistoryItem } from "@/types/board";
import type { ActionCreator } from "@reduxjs/toolkit";
import { selectBoardHistory, selectBoardValue, setBoardHistory, setBoardHistoryIndex, setBoardValue } from "../boardHistory";
import { mapHistoryItem } from "../features/mapHistoryItem";

export const pushBoardHistory: ActionCreator<AppThunk> = (type: keyof IBoard, value: number) => (dispatch, getState) => {
  const state = getState();

  const history = selectBoardHistory(state);
  const boardValue = selectBoardValue(state);
  const item: IBoardHistoryItem = {
    type,
    value
  }
  
  const currentHistory = [
    ...history,
    item
  ];

  const patches = currentHistory.map(mapHistoryItem);
  const currentBoardValue: IBoard = Object.assign({}, boardValue, ...patches);

  dispatch(setBoardValue(currentBoardValue));
  dispatch(setBoardHistoryIndex(
    history.length
  ));
  dispatch(setBoardHistory(currentHistory));
}
