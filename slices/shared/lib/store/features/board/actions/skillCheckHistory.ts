import type { ActionCreator } from "@reduxjs/toolkit";
import { getSkillCheckValue } from "@shared/lib/features";
import type { AppThunk } from "@shared/lib/store";
import { selectCurrentBoard, selectSkillCheckData, selectSkillCheckType, sendCommandSignal, sendNumberSignal } from "@shared/lib/store";
import type { SkillCheckHistoryItem } from "@shared/model";
import { setCurrentBoard } from "./setCurrentBoard";
import { v4 } from "uuid";

export const addCurrentSkillCheckToHistory: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const state = getState();
  const type = selectSkillCheckType(state);
  const expression = selectSkillCheckData(state);
  const board = selectCurrentBoard(state);

  if (!type || !board) {
    return;
  }

  const value = getSkillCheckValue({
    data: expression,
    value: board.value
  })

  const item: SkillCheckHistoryItem = {
    id: v4(),
    type,
    expression,
    value
  }

  const checkHistory = [
    ...board.checkHistory,
    item
  ]

  console.log(checkHistory);

  dispatch(setCurrentBoard({
    ...board,
    checkHistory
  }))

  dispatch(sendCommandSignal('clear'));
  dispatch(sendNumberSignal(value))
}