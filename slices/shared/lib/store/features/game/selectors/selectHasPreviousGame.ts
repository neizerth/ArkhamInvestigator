import {
	isBoardExists,
	selectCurrentBoard,
} from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectHasPreviousGame = createSelector(
	[selectCurrentBoard],
	(board) => {
		return isBoardExists(board);
	},
);
