import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { getReferenceCardTokenValues } from "../../logic";

export const selectBoardRefenceCardTokenValues =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const { tokens } = board.investigator;
		return getReferenceCardTokenValues(tokens);
	};
