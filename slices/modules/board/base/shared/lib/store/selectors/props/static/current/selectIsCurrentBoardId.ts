import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectBoardId } from "../id";

export const selectIsCurrentBoardId =
	(boardId: BoardId) => (state: RootState) => {
		const id = selectBoardId(boardId)(state);
		return boardId === "current" || id === boardId;
	};
