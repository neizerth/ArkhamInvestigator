import type { ActionCreator } from "@reduxjs/toolkit";
import type { InvestigatorBoard } from "@shared/model";

import { selectCurrentBoard } from "../../selectors/selectCurrentBoard";
import { setCurrentBoard } from "./setCurrentBoard";
import type { AppThunk } from "../../../..";
import { mergeBoardStats } from "../../../../../features";

export const replaceCurrentBoard: ActionCreator<AppThunk> = (board: InvestigatorBoard) => 
  (dispatch, getState) => {
    const state = getState();
    const currentBoard = selectCurrentBoard(state);

    if (!currentBoard) {
      return;
    }
    
    const value = mergeBoardStats(currentBoard, board.baseValue);

    const data = {
      ...board,
      value
    }

    dispatch(setCurrentBoard(data));
  }