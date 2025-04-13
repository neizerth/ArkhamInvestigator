import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoard } from "../../board/selectors/current/selectCurrentBoard";
import { selectReplaceInvestigator } from "../game";

export const selectReplaceCode = createSelector(
	[selectCurrentBoard, selectReplaceInvestigator],
	(board, replace) => replace && board?.signatureGroupId,
);
