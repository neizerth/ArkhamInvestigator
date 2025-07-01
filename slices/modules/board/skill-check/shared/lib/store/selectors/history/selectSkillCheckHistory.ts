import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSkillCheckType } from "../../skillCheck";

export const selectSkillCheckHistory = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectSkillCheckType],
		(board, type) => {
			if (!board) {
				return [];
			}
			return board.checkHistory.filter(propEq(type, "type"));
		},
	);
