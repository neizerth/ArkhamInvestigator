import { createSelector } from "@reduxjs/toolkit";
import { selectIsDefeated } from "./selectIsDefeated";
import { selectTurnEnd } from "./turn/selectTurnEnd";

export const selectIsInactive = (boardId: number) =>
	createSelector(
		[selectTurnEnd(boardId), selectIsDefeated(boardId)],
		(turnEnd, defeated) => turnEnd || defeated,
	);
