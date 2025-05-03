import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { selectEndTurnStrict } from "../../../board";
import { selectAbilitiesTurnEnd } from "./selectAbilitiesTurnEnd";
import { selectBaseTurnEnd } from "./selectBaseTurnEnd";

export const selectTurnEnd = (boardId: BoardId) => {
	return createSelector(
		[
			selectBaseTurnEnd(boardId),
			selectAbilitiesTurnEnd(boardId),
			selectEndTurnStrict,
		],
		(baseTurnEnd, abilitiesTurnEnd, strict) => {
			console.log({
				baseTurnEnd,
			});
			if (!baseTurnEnd) {
				return false;
			}
			return strict ? abilitiesTurnEnd : false;
		},
	);
};
