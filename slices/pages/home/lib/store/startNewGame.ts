import type { ActionCreator } from "@reduxjs/toolkit";
import { goToPage, replacePageTo, setInvestigatorBoards, setSelectedInvestigators, type AppThunk } from "@shared/lib";

export const startNewGame: ActionCreator<AppThunk> = () => (dispatch) => {
  dispatch(goToPage('/select-investigators'))
  dispatch(setSelectedInvestigators([]));
  dispatch(setInvestigatorBoards([]));
}