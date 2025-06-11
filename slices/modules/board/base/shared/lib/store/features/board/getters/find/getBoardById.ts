import type { BoardId } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib";
import type { BoardState } from "../../board";
import { getCurrentBoard } from "./current";

export type GetBoardByIdOptions = {
	state: Pick<BoardState, "investigatorBoards" | "currentInvestigatorIndex">;
	boardId: BoardId;
};
export const getBoardById = ({ state, boardId }: GetBoardByIdOptions) => {
	const { investigatorBoards } = state;

	if (boardId === "current") {
		return getCurrentBoard({ state });
	}
	const board = investigatorBoards.find(whereId(boardId));

	return board;
};
