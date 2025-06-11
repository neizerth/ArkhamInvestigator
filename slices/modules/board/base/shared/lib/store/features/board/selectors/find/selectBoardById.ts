import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";
import { getBoardById } from "../../getters/find/getBoardById";

export const selectBoardById = (boardId: BoardId = "current") =>
	createSelector(
		[selectInvestigatorBoards, selectCurrentInvestigatorIndex],
		(investigatorBoards, currentInvestigatorIndex) => {
			return getBoardById({
				state: {
					investigatorBoards,
					currentInvestigatorIndex,
				},
				boardId,
			});
		},
	);
