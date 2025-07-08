import { createSelector } from "@reduxjs/toolkit";
import { selectNextBoard } from "../../../find";

export const selectNextBoardId = createSelector(
	[selectNextBoard],
	(board) => board?.id,
);
