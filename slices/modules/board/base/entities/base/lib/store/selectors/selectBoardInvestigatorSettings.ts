import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectInvestigatorSettings } from "@modules/signature/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectBoardInvestigatorSettings = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectInvestigatorSettings],
		(board, investigatorSettings) => {
			const { code } = board.investigator;
			const settings = investigatorSettings || {};

			return settings[code] || {};
		},
	);
