import { ActionCreator } from "@reduxjs/toolkit";
import { AppThunk, goBack, setCurrentBoard, setReplaceInvestigator } from "@shared/lib";
import { selectGameInvestigatorBoards } from "../selectors";

export const replaceInvestigator: ActionCreator<AppThunk> = () => 
  (dispatch, getState) => {
    const state = getState();
    const [board] = selectGameInvestigatorBoards(state);

    dispatch(setReplaceInvestigator(false));
    dispatch(setCurrentBoard(board));
    dispatch(goBack());
  }