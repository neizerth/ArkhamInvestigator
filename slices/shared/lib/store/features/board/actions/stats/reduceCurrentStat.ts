import type  { ActionCreator } from "@reduxjs/toolkit";
import { setCurrentBoard } from "../board/setCurrentBoard";
import { selectCurrentBoard } from "../../selectors/selectCurrentBoard";
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
    
    const statValue = reducer(board.value[type]);

    const value = {
      ...board.value, 
      [type]: statValue 
    }

    const historyIndex = board.historyIndex + 1;

    const currentHistory = board.history
      .slice(0, historyIndex);

    const historyItem = {
      id: v4(),
      type,
      value: statValue
    }

    const history = [
      ...currentHistory,
      historyItem
    ]

    dispatch(setCurrentBoard({
      ...board,
      value,
      history,
      historyIndex
    }))
  }