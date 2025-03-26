import { createSelector } from "@reduxjs/toolkit";
import { getIsTurnEnd } from "@shared/lib/features";
import { selectCurrentBoard } from ".";
import { selectEndTurnStrict } from "../../board";

export const selectCurrentTurnEnd = createSelector(
	[selectEndTurnStrict, selectCurrentBoard],
	(strict, board) =>
		getIsTurnEnd({
			board,
			strict,
		}),
);
