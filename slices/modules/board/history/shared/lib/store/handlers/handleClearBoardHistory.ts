import { getBoardIndex } from "@modules/board/base/shared/lib/store/getters";
import type { BoardHandler, BoardId } from "@modules/board/base/shared/model";

export const handleClearBoardHistory: BoardHandler<BoardId> = (
	state,
	boardId,
) => {
	const index = getBoardIndex({
		...state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}

	state.investigatorBoards[index].history = [];
	state.investigatorBoards[index].historyIndex = -1;
};
