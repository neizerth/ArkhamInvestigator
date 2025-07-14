import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";
import { getBoardById } from "../../getters/find/getBoardById";

export const selectBoardById = (boardId: BoardId) => (state: RootState) => {
	const investigatorBoards = selectInvestigatorBoards(state);
	const currentInvestigatorIndex = selectCurrentInvestigatorIndex(state);
	return getBoardById({
		investigatorBoards,
		currentInvestigatorIndex,
		boardId,
	});
};
