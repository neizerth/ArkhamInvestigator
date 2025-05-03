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
): AppSelector<InvestigatorBoard | undefined> =>
	createSelector(
		[selectInvestigatorBoards, selectCurrentInvestigatorIndex],
		(boards, currentIndex) =>
			id === "current" ? boards[currentIndex || 0] : boards.find(whereId(id)),
	);
