import type {
	BoardDraft,
	BoardId,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { getBoardById } from "../../getters/find";

export type HandleReduceBoardPropOptions<K extends BoardKey> = {
	state: BoardDraft;
	boardId: BoardId;
	prop: K;
	reducer: (value: InvestigatorBoard[K]) => InvestigatorBoard[K];
};

export const handleReduceBoardProp = <K extends BoardKey>({
	state,
	boardId,
	prop,
	reducer,
}: HandleReduceBoardPropOptions<K>) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!board) {
		return;
	}

	board[prop] = reducer(board[prop]);
};
