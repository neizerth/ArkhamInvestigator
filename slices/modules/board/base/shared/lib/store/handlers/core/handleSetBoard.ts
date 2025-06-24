import type { BoardDraft } from "@modules/board/base/shared/model";
import type { SetBoardPayload } from "../../actions";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export type HandleSetBoardOptions = SetBoardPayload & {
	state: BoardDraft;
};

export const handleSetBoard = ({
	state,
	boardId,
	data,
}: HandleSetBoardOptions) => {
	const index = getBoardIndex({
		state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}
	state.investigatorBoards[index] = data;
};
