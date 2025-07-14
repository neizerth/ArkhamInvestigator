import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { propEq } from "ramda";
import { selectSkillCheckType } from "../../skillCheck";

export const selectSkillCheckHistory =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const type = selectSkillCheckType(state);

		if (!isBoardExists(board)) {
			return [];
		}
		return board.checkHistory.filter(propEq(type, "type"));
	};
