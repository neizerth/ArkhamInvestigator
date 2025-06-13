import type {
	BoardDraft,
	BoardId,
	InvestigatorBoardValues,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import { mergeDeepRight } from "ramda";
import { getBoardById } from "../../getters/find";

export type HandleSetBoardValueOptions<K extends Key> = {
	state: BoardDraft;
	boardId: BoardId;
	type: K;
	value: Partial<InvestigatorBoardValues>;
};

export const handleSetBoardValuePart = <K extends Key>({
	state,
	boardId,
	value,
	type,
}: HandleSetBoardValueOptions<K>) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!board) {
		return;
	}
	board[type] = mergeDeepRight(board[type], value);
};
