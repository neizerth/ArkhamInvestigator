import { createSelector } from "@reduxjs/toolkit";
import { selectPrevBoard } from "../../../find";

export const selectPrevBoardId = createSelector(
	[selectPrevBoard],
	(board) => board?.id,
);
