import type { BoardId } from "@modules/board/base/shared/model";
import { selectTurnEnd } from "@modules/mechanics/round/shared/lib/store/effects/turn/selectors/selectTurnEnd";
import { createSelector } from "@reduxjs/toolkit";
import { selectIsDefeated } from "./selectIsDefeated";

export const selectIsInactive = (boardId: BoardId) =>
	createSelector(
		[selectTurnEnd(boardId), selectIsDefeated(boardId)],
		(turnEnd, defeated) => turnEnd || defeated,
	);
