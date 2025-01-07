import type { AppThunk } from "@/store";
import type { IBoard, IBoardHistoryItem } from "@/types/board";
import type { ActionCreator } from "@reduxjs/toolkit";
import { selectBoardHistory, selectBoardHistoryIndex, selectBoardValue, setBoardHistory, setBoardHistoryIndex, setBoardValue } from "../boardHistory";
import { mapHistoryItem } from "../features/mapHistoryItem";

export const pushBoardHistory: ActionCreator<AppThunk> = (type: keyof IBoard, value: number) => (dispatch, getState) => {
  const state = getState();
  const index = selectBoardHistoryIndex(state);
  const history = selectBoardHistory(state);
  const boardValue = selectBoardValue(state);
  const oldValue = boardValue[type];

  const item: IBoardHistoryItem = {
    type,
    value,
    oldValue,
    date: (new Date).toString()
  }
  
  const currentHistory = [
    ...history.slice(0, index),
    item
  ];

  const patches = currentHistory.map(mapHistoryItem);
  const currentBoardValue: IBoard = Object.assign({}, boardValue, ...patches);
  const currentIndex = index + 1;

  dispatch(setBoardValue(currentBoardValue));
  dispatch(setBoardHistoryIndex(currentIndex));
  dispatch(setBoardHistory(currentHistory));
}
