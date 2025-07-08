import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import type { AppThunk } from "@shared/model";
import { giveUpkeepResourceToBoard } from "./giveUpkeepResourceToBoard";

export const giveUpkeepResourcesToAllBoards =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();

		const boards = selectInvestigatorBoards(state);

		for (const board of boards) {
			dispatch(giveUpkeepResourceToBoard(board.id));
		}
	};
