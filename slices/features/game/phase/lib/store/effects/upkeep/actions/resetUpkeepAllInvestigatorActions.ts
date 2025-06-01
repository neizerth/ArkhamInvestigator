import { selectInvestigatorBoards } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { resetUpkeepInvestigatorActions } from "./resetUpkeepInvestigatorActions";

export const resetUpkeepAllInvestigatorActions =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const boards = selectInvestigatorBoards(state);

		for (const board of boards) {
			dispatch(resetUpkeepInvestigatorActions(board.id));
		}
	};
