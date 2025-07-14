import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectBoardById } from "../../../find/selectBoardById";

export const selectBoardId = (boardId: BoardId) => (state: RootState) => {
	const board = selectBoardById(boardId)(state);
	return board?.id;
};
