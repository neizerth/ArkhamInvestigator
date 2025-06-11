import type {
	BoardDraft,
	BoardId,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export type HandleSetBoardOptions = {
	state: BoardDraft;
	boardId: BoardId;
	data: InvestigatorBoard;
};

export const handleSetBoard = ({
	state,
	boardId,
	data,
}: HandleSetBoardOptions) => {
	const index = getBoardIndex({
		state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}
	state.investigatorBoards[index] = data;
};
