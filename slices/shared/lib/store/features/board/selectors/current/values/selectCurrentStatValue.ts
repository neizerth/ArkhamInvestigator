import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoardValues } from "@shared/model";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectCurrentStatValue = <K extends keyof InvestigatorBoardValues>(
	stat: K,
) =>
	createSelector(
		[selectCurrentBoard],
		(board): InvestigatorBoardValues[K] => board?.value[stat],
	);
