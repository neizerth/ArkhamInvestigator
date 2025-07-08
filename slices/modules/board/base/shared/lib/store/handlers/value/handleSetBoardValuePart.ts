import type {
	BoardDraft,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import { mergeDeepRight } from "ramda";
import { isBoardExists } from "../../../fallback";
import type { SetBoardValuePartPayload } from "../../actions";
import { getBoardById } from "../../getters/find";

export const handleSetBoardValuePart = <K extends Key>(
	state: BoardDraft,
	{ boardId, value, type }: SetBoardValuePartPayload<K>,
) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!isBoardExists(board)) {
		return;
	}
	board[type] = mergeDeepRight(board[type], value);
};
