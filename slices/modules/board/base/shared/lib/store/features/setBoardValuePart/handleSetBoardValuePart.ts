import type {
	BoardDraft,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import { mergeDeepRight } from "ramda";
import { isBoardExists } from "../../../fallback";
import { getBoardById } from "../../getters/find";
import type { SetBoardValuePartPayload } from "./setBoardValuePart";

export const handleSetBoardValuePart = <K extends Key>(
	state: BoardDraft,
	{ boardId, value, type }: SetBoardValuePartPayload<K>,
) => {
	const board = getBoardById({
		...state,
		boardId,
	});

	if (!isBoardExists(board)) {
		return;
	}
	board[type] = mergeDeepRight(board[type], value);
};
