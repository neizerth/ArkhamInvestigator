import type  { ActionCreator } from "@reduxjs/toolkit";
import { type  AppThunk, selectCurrentBoard, setCurrentBoard } from "@shared/lib/store";
import type  { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { v4 } from "uuid";

export const reduceCurrentStat: ActionCreator<AppThunk> = <T extends keyof InvestigatorBoardValues>(
  type: T,
  reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T]
) => (dispatch, getState) => {
    const state = getState();

    const board = selectCurrentBoard(state);

    if (!board) {
      return;
    }
    
    const value = {
      ...board.value, 
      [type]: reducer(board.value[type]) 
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