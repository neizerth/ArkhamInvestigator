import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectCurrentBoard } from "../../../board";
import { selectSkillCheckType } from "../../skillCheck";

export const selectSkillCheckHistory = createSelector(
	[selectCurrentBoard, selectSkillCheckType],
	(board, type) => {
		if (!board) {
			return [];
		}
		return board.checkHistory.filter(propEq(type, "type"));
	},
);
