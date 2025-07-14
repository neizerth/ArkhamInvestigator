import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { getBoardFaction } from "../../../logic";

export const selectBoardFaction = (boardId: BoardId) => (state: RootState) => {
	const board = selectBoardById(boardId)(state);
	return getBoardFaction(board);
};
