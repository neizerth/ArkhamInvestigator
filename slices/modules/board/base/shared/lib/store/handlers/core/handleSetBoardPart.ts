import type {
	BoardDraft,
	BoardId,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export type HandleSetBoardPartOptions = {
	state: BoardDraft;
	boardId: BoardId;
	data: Partial<InvestigatorBoard>;
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
	state.investigatorBoards[index] = {
		...board,
		...data,
	};
};
