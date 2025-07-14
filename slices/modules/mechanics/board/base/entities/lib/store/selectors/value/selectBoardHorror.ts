import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";

export const selectBoardHorror = (boardId: BoardId) => (state: RootState) => {
	const board = selectBoardById(boardId)(state);
	return Math.min(board.baseValue.sanity - board.value.sanity, 0);
};
