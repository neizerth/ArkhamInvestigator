import type { BoardHandler } from "@modules/board/base/shared/model";
import { isBoardExists } from "../../../fallback";
import { getBoardById } from "../../getters/find";
import type { SetBoardPropValuePayload } from "./setBoardPropValue";

export const handleSetBoardPropValue: BoardHandler<SetBoardPropValuePayload> = (
	state,
	{ boardId, prop, value, type },
) => {
	const board = getBoardById({
		...state,
		boardId,
	});

	if (!isBoardExists(board)) {
		return;
	}
	board[type][prop] = value;
};
