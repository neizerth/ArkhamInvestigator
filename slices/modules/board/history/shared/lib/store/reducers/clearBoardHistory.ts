import type { BoardId, BoardReducer } from "@modules/board/base/shared/model";
import { handleClearBoardHistory } from "../handlers";

export const clearBoardHistory: BoardReducer<BoardId> = (
	state,
	{ payload },
) => {
	handleClearBoardHistory(state, payload);
};
