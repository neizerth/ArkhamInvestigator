import { createSelector } from "@reduxjs/toolkit";
import type { AppSelector, BoardId } from "@shared/model";
import type { InvestigatorBoard } from "@shared/model";
import { whereId } from "../../../../util";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../board";

export const selectBoardById = (
	id: BoardId = "current",
): AppSelector<InvestigatorBoard> =>
	createSelector(
		[selectInvestigatorBoards, selectCurrentInvestigatorIndex],
		(boards, currentIndex) => {
			const board =
				id === "current"
					? (boards[currentIndex || 0] as InvestigatorBoard)
					: boards.find(whereId(id));

			return board as InvestigatorBoard;
		},
	);
