import type {
	BoardId,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	setInvestigatorBoards,
} from "../../board";

export type SetBoardOptions = {
	boardId: BoardId;
	board: InvestigatorBoard;
};

export const setBoard =
	({ boardId, board }: SetBoardOptions): AppThunk =>
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
