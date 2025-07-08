import type { BoardId } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib/util";
import { createFallbackBoard } from "../../../fallback/createFallbackBoard";
import type { BoardState } from "../../board";
import { getCurrentBoard } from "./current";

export type GetBoardByIdOptions = {
	state: Pick<BoardState, "investigatorBoards" | "currentInvestigatorIndex">;
	boardId: BoardId;
};

const fallbackBoard = createFallbackBoard();

export const getBoardById = ({ state, boardId }: GetBoardByIdOptions) => {
	const { investigatorBoards } = state;

	if (boardId === "current") {
		return getCurrentBoard({ state }) || fallbackBoard;
	}
	const board = investigatorBoards.find(whereId(boardId));

	return board || fallbackBoard;
};
