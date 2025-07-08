import type { BoardId } from "@modules/board/base/shared/model";
import { selectTurnEnd } from "@modules/mechanics/round/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getIsInactive } from "../../../logic";
import { selectIsDefeated } from "./selectIsDefeated";

export const selectBoardIsInactive = (boardId: BoardId) =>
	createSelector(
		[selectTurnEnd(boardId), selectIsDefeated(boardId)],
		(isTurnEnd, isDefeated) =>
			getIsInactive({
				isTurnEnd,
				isDefeated,
			}),
	);
