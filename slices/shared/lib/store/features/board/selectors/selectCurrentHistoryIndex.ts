import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoard } from "./selectCurrentBoard";

export const selectCurrentHistoryIndex = createSelector(
  [
    selectCurrentBoard
  ],
  (board) => board?.historyIndex || 0
)