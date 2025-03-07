import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoard } from "../../board";
import { selectSkillCheckType } from "../skillCheck";
import { propEq } from "ramda";

export const selectSkillCheckHistory = createSelector(
  [
    selectCurrentBoard,
    selectSkillCheckType
  ],
  (board, type) => {
    if (!board) {
      return []
    }
    return board.checkHistory.filter(propEq(type, 'type'));
  }
)