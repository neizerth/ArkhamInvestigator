import type {
	BoardDraft,
	BoardId,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export type HandleReduceBoardOptions = {
	state: BoardDraft;
	boardId: BoardId;
	reducer: (board: InvestigatorBoard) => InvestigatorBoard;
};

export const handleReduceBoard = ({
	state,
	boardId,
	reducer,
}: HandleReduceBoardOptions) => {
	const index = getBoardIndex({
		state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}
	state.investigatorBoards[index] = reducer(state.investigatorBoards[index]);
};
