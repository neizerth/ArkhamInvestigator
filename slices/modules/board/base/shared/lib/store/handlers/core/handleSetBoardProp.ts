import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import { isBoardExists } from "../../../fallback";
import type { SetBoardPropPayload } from "../../actions";
import { getBoardById } from "../../getters/find";

export const handleSetBoardProp = <K extends BoardKey>(
	state: BoardDraft,
	{ boardId, prop, value }: SetBoardPropPayload<K>,
) => {
	const board = getBoardById({
		...state,
		boardId,
	});

	if (!isBoardExists(board)) {
		return;
	}

	board[prop] = value;
};
