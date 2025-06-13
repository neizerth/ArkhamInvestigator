import type {
	BoardDraft,
	BoardId,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { getBoardById } from "../../getters/find";

export type HandleSetBoardPropOptions<K extends BoardKey> = {
	state: BoardDraft;
	boardId: BoardId;
	prop: K;
	value: InvestigatorBoard[K];
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
