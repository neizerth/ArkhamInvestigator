import type {
	BoardDraft,
	BoardId,
	InvestigatorBoardStat,
	InvestigatorBoardValueProp,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import { getBoardById } from "../../getters/find";

export type HandleSetBoardValuePropOptions<K extends InvestigatorBoardStat> = {
	state: BoardDraft;
	boardId: BoardId;
	prop: K;
	type: InvestigatorBoardValueProp;
	value: InvestigatorBoardValues[K];
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
