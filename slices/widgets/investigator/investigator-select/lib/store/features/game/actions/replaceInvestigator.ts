import type { ActionCreator } from "@reduxjs/toolkit";
import { type AppThunk, goBack, replaceCurrentBoard, setReplaceInvestigator } from "@shared/lib";
import { selectGameInvestigatorBoards } from "../selectors";

export const replaceInvestigator: ActionCreator<AppThunk> = () => 
  (dispatch, getState) => {
    const state = getState();
    const [board] = selectGameInvestigatorBoards(state);

    dispatch(replaceCurrentBoard(board));
    dispatch(setReplaceInvestigator(false));
    dispatch(goBack());
  }