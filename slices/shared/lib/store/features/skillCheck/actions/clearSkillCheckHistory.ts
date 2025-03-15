import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import { propEq, reject } from "ramda";

import { selectSkillCheckType, sendCommandSignal } from '../skillCheck'
import { selectCurrentBoard, setCurrentBoard } from '../../board'


export const clearSkillCheckHistory: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const state = getState();
  const board = selectCurrentBoard(state);
  const type = selectSkillCheckType(state);

  if (!board || !type) {
    return;
  }

  const checkHistory = reject(
    propEq(type, 'type'),
    board.checkHistory
  );

  dispatch(setCurrentBoard({
    ...board,
    checkHistory
  }))
  dispatch(sendCommandSignal('clear'));
}