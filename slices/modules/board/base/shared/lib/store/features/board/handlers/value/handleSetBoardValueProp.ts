import type {
	BoardDraft,
	BoardId,
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import { getBoardById } from "../../getters/find";

export type HandleSetBoardValuePropType =
	| "value"
	| "baseValue"
	| "initialValue";

export type HandleSetBoardValuePropOptions<K extends InvestigatorBoardStat> = {
	state: BoardDraft;
	boardId: BoardId;
	prop: K;
	value: InvestigatorBoardValues[K];
	type: HandleSetBoardValuePropType;
};

export const handleSetBoardValueProp = <K extends InvestigatorBoardStat>({
	state,
	boardId,
	prop,
	value,
	type,
}: HandleSetBoardValuePropOptions<K>) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!board) {
		return;
	}

	board[type][prop] = value;
};
