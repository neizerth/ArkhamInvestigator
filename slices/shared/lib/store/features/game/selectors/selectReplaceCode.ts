import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectReplaceInvestigator } from "../game";

export const selectReplaceCode = createSelector(
	[selectCurrentBoard, selectReplaceInvestigator],
	(board, replace) => replace && board?.signatureGroupId,
);
