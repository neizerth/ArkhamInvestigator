import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoard } from "../../board";
import { selectReplaceInvestigator } from "../game";

export const selectReplaceCode = createSelector(
	[selectCurrentBoard, selectReplaceInvestigator],
	(board, replace) => replace && board?.investigator.code,
);
