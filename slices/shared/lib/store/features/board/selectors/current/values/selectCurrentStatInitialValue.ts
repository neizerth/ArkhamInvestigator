import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoardValues } from "@shared/model";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectCurrentStatInitialValue = <
	K extends keyof InvestigatorBoardValues,
>(
	stat: K,
) =>
	createSelector(
		[selectCurrentBoard],
		(board): InvestigatorBoardValues[K] => board?.initialValue[stat],
	);
