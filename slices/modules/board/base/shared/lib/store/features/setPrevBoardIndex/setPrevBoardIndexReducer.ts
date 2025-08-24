import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleSetPrevBoardIndex } from "./handleSetPrevBoardIndex";

export const setPrevBoardIndexReducer: BoardReducer = (state, { payload }) => {
	handleSetPrevBoardIndex(state, payload);
};
