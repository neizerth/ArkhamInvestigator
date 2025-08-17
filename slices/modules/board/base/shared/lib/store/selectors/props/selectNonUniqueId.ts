import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorBoards } from "../../board";
import { selectBoardById } from "../find";

export const selectNonUniqueId = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectInvestigatorBoards],
		(currentBoard, boards) => {
			const { code } = currentBoard.investigator;
			const sameCodeBoards = boards.filter(
				({ investigator }) => investigator.code === code,
			);

			const index = sameCodeBoards.findIndex(
				({ id }) => id === currentBoard.id,
			);

			return index + 1;
		},
	);
