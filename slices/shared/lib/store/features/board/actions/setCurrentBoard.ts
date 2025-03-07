import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import { selectCurrentInvestigatorIndex, selectInvestigatorBoards, setInvestigatorBoards } from "@shared/lib/store";
import type { InvestigatorBoard } from "@shared/model";

export const setCurrentBoard: ActionCreator<AppThunk> = (board: InvestigatorBoard) => (dispatch, getState) => {
  const state = getState();
  const boards = selectInvestigatorBoards(state);
  const index = selectCurrentInvestigatorIndex(state);

  if (index === null) {
    return;
  }

  const data = boards.with(index, board);

  dispatch(setInvestigatorBoards(data));
}