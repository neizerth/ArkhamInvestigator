import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";

export const selectBoardById = (id: BoardId = "current") =>
	createSelector(
		[selectInvestigatorBoards, selectCurrentInvestigatorIndex],
		(boards, currentIndex) => {
			const board =
				id === "current" ? boards[currentIndex || 0] : boards.find(whereId(id));

			return board;
		},
	);
