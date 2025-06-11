import type {
	BoardDraft,
	BoardId,
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import { getBoardById } from "../../getters/find";

export type HandleReduceBoardValuePropType =
	| "value"
	| "baseValue"
	| "initialValue";

export type HandleReduceBoardValuePropOptions<K extends InvestigatorBoardStat> =
	{
		state: BoardDraft;
		boardId: BoardId;
		prop: K;
		type: HandleReduceBoardValuePropType;
		reducer: (value: InvestigatorBoardValues[K]) => InvestigatorBoardValues[K];
	};

export const handleSetBoardValueProp = <K extends InvestigatorBoardStat>({
	state,
	boardId,
	prop,
	reducer,
	type,
}: HandleReduceBoardValuePropOptions<K>) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!board) {
		return;
	}
	const value = board[type][prop];
	board[type][prop] = reducer(value);
};
