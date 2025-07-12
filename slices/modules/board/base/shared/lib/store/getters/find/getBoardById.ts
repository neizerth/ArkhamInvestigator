import type {
	BoardId,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib/util";
import { createFallbackBoard } from "../../../fallback/createFallbackBoard";
import { getCurrentBoard } from "./current";

export type GetBoardByIdOptions = {
	investigatorBoards: InvestigatorBoard[];
	currentInvestigatorIndex: number | null;
	boardId: BoardId;
};

const fallbackBoard = createFallbackBoard();

export const getBoardById = (options: GetBoardByIdOptions) => {
	const { boardId, investigatorBoards } = options;

	if (boardId === "current") {
		return getCurrentBoard(options) || fallbackBoard;
	}
	const board = investigatorBoards.find(whereId(boardId));

	return board || fallbackBoard;
};
