import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { getIsDefeated } from "../../../logic";

export const selectIsDefeated = (boardId: BoardId) => (state: RootState) => {
	const board = selectBoardById(boardId)(state);
	return getIsDefeated(board.value);
};
