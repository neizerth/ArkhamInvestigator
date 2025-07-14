import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";

export const selectBaseTurnEnd = (boardId: BoardId) => (state: RootState) => {
	const board = selectBoardById(boardId)(state);
	const { value } = board;
	const { actions } = value;

	if (actions > 0) {
		return false;
	}

	return true;
};
