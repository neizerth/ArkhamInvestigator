import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import { isBoardExists } from "../../../fallback";
import { getBoardById } from "../../getters/find";
import type { SetBoardPropPayload } from "./setBoardProp";

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
