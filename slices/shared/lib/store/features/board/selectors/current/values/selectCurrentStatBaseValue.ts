import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoardValues } from "@shared/model";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectCurrentStatBaseValue = <
	K extends keyof InvestigatorBoardValues,
>(
	stat: K,
) =>
	createSelector(
		[selectCurrentBoard],
		({ baseValue }): InvestigatorBoardValues[K] => baseValue[stat],
	);
