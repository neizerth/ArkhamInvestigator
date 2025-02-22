import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentInvestigatorIndex, selectInvestigatorBoards } from "@shared/lib";

export const selectBoard = createSelector(
  [
    selectCurrentInvestigatorIndex,
    selectInvestigatorBoards
  ],
  (index, boards) => {
    return boards[index || 0];
  }
)