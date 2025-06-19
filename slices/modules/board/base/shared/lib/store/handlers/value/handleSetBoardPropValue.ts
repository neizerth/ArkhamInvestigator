import type { BoardDraft } from "@modules/board/base/shared/model";
import type { ChangeBoardPropValuePayload } from "../../actions";
import { getBoardById } from "../../getters/find";

export type HandleSetBoardPropValueOptions = ChangeBoardPropValuePayload & {
	state: BoardDraft;
};

export const handleSetBoardPropValue = ({
	state,
	boardId,
	prop,
	value,
	type,
}: HandleSetBoardPropValueOptions) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!board) {
		return;
	}
	board[type][prop] = value;
};
