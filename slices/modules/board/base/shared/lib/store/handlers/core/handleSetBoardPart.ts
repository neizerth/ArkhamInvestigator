import type {
	BoardDraft,
	BoardId,
	InvestigatorBoard,
	InvestigatorBoardValueProp,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import { mergeDeepRight } from "ramda";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

type Data = Omit<Partial<InvestigatorBoard>, InvestigatorBoardValueProp> &
	Partial<Record<InvestigatorBoardValueProp, Partial<InvestigatorBoardValues>>>;

export type HandleSetBoardPartOptions = {
	state: BoardDraft;
	boardId: BoardId;
	data: Data;
};

export const handleSetBoardPart = ({
	state,
	boardId,
	data,
}: HandleSetBoardPartOptions) => {
	const index = getBoardIndex({
		state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}
	const board = state.investigatorBoards[index];
	state.investigatorBoards[index] = mergeDeepRight(
		board,
		data,
	) as InvestigatorBoard;
};
