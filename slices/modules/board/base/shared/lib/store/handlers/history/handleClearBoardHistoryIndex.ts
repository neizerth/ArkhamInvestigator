import type { BoardDraft, BoardId } from "@modules/board/base/shared/model";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export type HandleClearBoardHistoryItemOptions = {
	state: BoardDraft;
	boardId: BoardId;
};

export const handleClearBoardHistoryIndex = ({
	state,
	boardId,
}: HandleClearBoardHistoryItemOptions) => {
	const index = getBoardIndex({
		state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}

	state.investigatorBoards[index].history = [];
	state.investigatorBoards[index].historyIndex = 0;
};
