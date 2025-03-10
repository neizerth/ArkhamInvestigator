import type  { ActionCreator } from "@reduxjs/toolkit";
import { setCurrentBoard } from "./setCurrentBoard";
import { selectCurrentBoard } from "../selectors/selectCurrentBoard";
import type { AppThunk } from "@shared/lib/store";
import type  { InvestigatorBoardValues } from "@shared/model";
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
    
    const boardValue = reducer(board.value[type]);

    const value = {
      ...board.value, 
      [type]: boardValue 
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