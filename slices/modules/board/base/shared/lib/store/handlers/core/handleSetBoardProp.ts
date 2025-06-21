import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import type { SetBoardPropPayload } from "../../actions";
import { getBoardById } from "../../getters/find";

export type HandleSetBoardPropOptions<K extends BoardKey> =
	SetBoardPropPayload<K> & {
		state: BoardDraft;
	};

export const handleSetBoardProp = <K extends BoardKey>({
	state,
	boardId,
	prop,
	value,
}: HandleSetBoardPropOptions<K>) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!board) {
		return;
	}

	board[prop] = value;
};
