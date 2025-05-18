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
		(investigator): InvestigatorBoardValues[K] => investigator?.baseValue[stat],
	);
