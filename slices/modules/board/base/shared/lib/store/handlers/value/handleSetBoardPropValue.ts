import type { BoardHandler } from "@modules/board/base/shared/model";
import { isBoardExists } from "../../../fallback";
import type { SetBoardPropValuePayload } from "../../actions";
import { getBoardById } from "../../getters/find";

export const handleSetBoardPropValue: BoardHandler<SetBoardPropValuePayload> = (
	state,
	{ boardId, prop, value, type },
) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!isBoardExists(board)) {
		return;
	}
	board[type][prop] = value;
};
