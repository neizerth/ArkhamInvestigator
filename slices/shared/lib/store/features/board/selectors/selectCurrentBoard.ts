import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentInvestigatorIndex, selectInvestigatorBoards } from "../board";
import { InvestigatorBoard } from "@shared/model";

export const selectCurrentBoard = createSelector(
  [
    selectCurrentInvestigatorIndex,
    selectInvestigatorBoards
  ],
  (index, boards): InvestigatorBoard | undefined => {
    return boards[index || 0];
  }
)