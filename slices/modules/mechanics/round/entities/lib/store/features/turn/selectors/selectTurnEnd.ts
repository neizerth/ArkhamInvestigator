import { selectEndTurnStrict } from "@modules/board/base/shared/lib/store/features/board/board";
import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
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
			if (!baseTurnEnd) {
				return false;
			}
			return strict ? abilitiesTurnEnd : false;
		},
	);
};
