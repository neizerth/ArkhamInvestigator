import type { AppThunk, BoardId } from "@shared/model";
import type { InvestigatorBoard } from "@shared/model";
import { whereId } from "../../../../../util";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	setInvestigatorBoards,
} from "../../board";

export const setBoard =
	(board: InvestigatorBoard, boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const boards = selectInvestigatorBoards(state);
		const currentIndex = selectCurrentInvestigatorIndex(state);

		if (currentIndex === null) {
			return;
		}

		const index =
			boardId === "current" ? currentIndex : boards.findIndex(whereId(boardId));

		const data = boards.with(index, board);

		dispatch(setInvestigatorBoards(data));
	};
