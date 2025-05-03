import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { selectAbilitiesTurnEnd } from "./selectAbilitiesTurnEnd";
import { selectBaseTurnEnd } from "./selectBaseTurnEnd";

export const selectTurnEnd = (boardId: BoardId) => {
	return createSelector(
		[selectBaseTurnEnd(boardId), selectAbilitiesTurnEnd(boardId)],
		(baseTurnEnd, abilitiesTurnEnd) => {
			return baseTurnEnd || abilitiesTurnEnd;
		},
	);
};
