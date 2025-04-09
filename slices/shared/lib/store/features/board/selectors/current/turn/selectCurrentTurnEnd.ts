import { createSelector } from "@reduxjs/toolkit";
import { getIsTurnEnd } from "../../../../../../features";
import { selectEndTurnStrict } from "../../../board";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectCurrentTurnEnd = createSelector(
	[selectEndTurnStrict, selectCurrentBoard],
	(strict, board) =>
		getIsTurnEnd({
			board,
			strict,
		}),
);
