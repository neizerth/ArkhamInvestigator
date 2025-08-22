import { selectBoardInvestigatorSettings } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib/createInvestigatorBoard";
import { createSelector } from "@reduxjs/toolkit";

export const selectCleanInvestigatorBoard = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectBoardInvestigatorSettings(boardId)],
		(board, settings) => {
			return createInvestigatorBoard({
				...board,
				...settings,
			});
		},
	);
