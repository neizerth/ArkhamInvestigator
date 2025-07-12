import type { BoardHandler } from "@modules/board/base/shared/model";
import type { SetBoardPayload } from "../../actions";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export const handleSetBoard: BoardHandler<SetBoardPayload> = (
	state,
	{ boardId, data },
) => {
	const index = getBoardIndex({
		...state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}
	state.investigatorBoards[index] = data;
};
