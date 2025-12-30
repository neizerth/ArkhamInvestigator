import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleClearBoards } from "./handleClearBoards";

export const clearBoardsReducer: BoardReducer = (state, { payload }) => {
	handleClearBoards(state, payload);
};
