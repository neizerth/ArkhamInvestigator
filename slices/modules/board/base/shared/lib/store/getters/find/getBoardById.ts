import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib/util";
import { createFallbackBoard } from "../../../fallback/createFallbackBoard";
import { type GetCurrentBoardOptions, getCurrentBoard } from "./current";

export type GetBoardByIdOptions = GetCurrentBoardOptions & PropsWithBoardId;

const fallbackBoard = createFallbackBoard();

export const getBoardById = (options: GetBoardByIdOptions) => {
	const { boardId, investigatorBoards } = options;

	if (boardId === "current") {
		return getCurrentBoard(options) || fallbackBoard;
	}
	const board = investigatorBoards.find(whereId(boardId));

	return board || fallbackBoard;
};
