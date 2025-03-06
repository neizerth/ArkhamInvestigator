import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentInvestigatorIndex, selectInvestigatorBoards } from "../board";

export const selectCurrentBoard = createSelector(
  [
    selectCurrentInvestigatorIndex,
    selectInvestigatorBoards
  ],
  (index, boards) => {
    return boards[index || 0];
  }
)