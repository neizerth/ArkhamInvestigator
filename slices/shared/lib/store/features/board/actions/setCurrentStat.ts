import type  { ActionCreator } from "@reduxjs/toolkit";
import { type  AppThunk, selectCurrentBoard, setCurrentBoard } from "@shared/lib/store";
import type  { InvestigatorBoardStat } from "@shared/model";
import { v4 } from "uuid";

export const setCurrentStat: ActionCreator<AppThunk> = (type: InvestigatorBoardStat, statValue: number) => 
  (dispatch, getState) => {
    const state = getState();

    const board = selectCurrentBoard(state);

    if (!board) {
      return;
    }
    
    const value = {
      ...board.value, 
      [type]: statValue 
    }

    const history = [
      ...board.history,
      {
        id: v4(),
        type,
        value
      }
    ]

    dispatch(setCurrentBoard({
      ...board,
      value,
      history
    }))
  }