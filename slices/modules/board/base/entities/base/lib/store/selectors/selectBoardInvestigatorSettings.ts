import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectSignatureSettings } from "@modules/signature/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";

export const selectBoardInvestigatorSettings =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[
		(state, boardId: BoardId) => selectBoardById(boardId)(state),
		selectSignatureSettings,
	],
	(board, investigatorSettings) => {
		const { code } = board.investigator;
		const settings = investigatorSettings || {};

		return settings[code] || {};
	},
);
