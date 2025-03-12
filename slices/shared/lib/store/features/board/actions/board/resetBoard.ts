import type { ActionCreator } from "@reduxjs/toolkit";
import { NEW_TURN_ACTIONS_COUNT, START_GAME_RESOURCES_COUNT } from "../../../../../../config";
import type { AppThunk } from "@shared/lib/store";
import { selectCurrentBoard } from "../../selectors/selectCurrentBoard";
import { setCurrentBoard } from "./setCurrentBoard";
import { setShowDescription } from "../../../game/game";

import type { InvestigatorBoard } from "@shared/model";

export const resetBoard: ActionCreator<AppThunk> = () => 
  (dispatch, getState) => {
    const state = getState();

    const board = selectCurrentBoard(state);
    
    if (!board) {
      return;
    }

    const data: InvestigatorBoard = {
      ...board,
      value: {
        ...board.baseValue,
        clues: 0,
        resources: START_GAME_RESOURCES_COUNT,
        actions: NEW_TURN_ACTIONS_COUNT
      }
    }

    dispatch(setCurrentBoard(data));
    dispatch(setShowDescription(false));
  }