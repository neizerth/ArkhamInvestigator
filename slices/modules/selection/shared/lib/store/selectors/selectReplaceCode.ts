import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectReplaceSignature } from "../selection";

export const selectReplaceCode = createSelector(
	[selectCurrentBoard, selectReplaceSignature],
	(board, replace) => replace && board?.signatureGroupId,
);
