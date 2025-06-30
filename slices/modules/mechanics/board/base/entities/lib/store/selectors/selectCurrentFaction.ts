import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getBoardFaction } from "../../logic";

export const selectCurrentFaction = createSelector(
	[selectCurrentBoard],
	(board) => {
		if (!board) {
			return;
		}
		return getBoardFaction(board);
	},
);
