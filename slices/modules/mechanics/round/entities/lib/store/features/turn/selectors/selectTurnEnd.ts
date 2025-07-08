import { selectEndTurnStrict } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
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
