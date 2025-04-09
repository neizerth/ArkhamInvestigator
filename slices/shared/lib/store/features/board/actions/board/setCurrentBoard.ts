import type { AppThunk } from "@shared/model";
import type { InvestigatorBoard } from "@shared/model";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	setInvestigatorBoards,
} from "../../board";

export const setCurrentBoard =
	(board: InvestigatorBoard): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const boards = selectInvestigatorBoards(state);
		const index = selectCurrentInvestigatorIndex(state);

		if (index === null) {
			return;
		}

		const data = boards.with(index, board);

		dispatch(setInvestigatorBoards(data));
	};
