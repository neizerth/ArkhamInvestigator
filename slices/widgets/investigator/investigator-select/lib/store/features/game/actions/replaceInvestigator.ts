import type { ActionCreator } from "@reduxjs/toolkit";
import { type AppThunk, goBack, replaceCurrentBoard, selectCurrentBoard, setReplaceInvestigator, setSelectedInvestigators } from "@shared/lib";
import { selectGameInvestigatorBoards } from "../selectors";

export const replaceInvestigator: ActionCreator<AppThunk> = () => 
  (dispatch, getState) => {
    const state = getState();
    const [board] = selectGameInvestigatorBoards(state);
    const currentBoard = selectCurrentBoard(state);

    if (!currentBoard) {
      return;
    }

    const { id } = currentBoard;
    

    dispatch(replaceCurrentBoard({
      ...board,
      id
    }));
    
    dispatch(setReplaceInvestigator(false));
    dispatch(setSelectedInvestigators([]));
    dispatch(goBack());
  }