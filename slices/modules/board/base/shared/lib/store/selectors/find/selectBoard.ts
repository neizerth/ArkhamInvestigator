import type { InvestigatorBoard } from "@modules/board/base/shared/model/board";
import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorBoards } from "../../board";

export const selectBoard = (selector: (board: InvestigatorBoard) => boolean) =>
	createSelector([selectInvestigatorBoards], (boards) => boards.find(selector));
