import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { propIncludes } from "@shared/lib";
import { prop } from "ramda";

export const selectDisabledItems = createSelector(
	[
		(_, disabledBoardIds: number[]) => disabledBoardIds,
		selectInvestigatorBoards,
	],
	(disabledBoardIds, boards) => {
		const data = boards.filter(propIncludes("id", disabledBoardIds));
		return data.map(prop("signatureGroupId"));
	},
);
