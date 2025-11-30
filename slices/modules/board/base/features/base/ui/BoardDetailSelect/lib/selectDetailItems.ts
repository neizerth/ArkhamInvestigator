import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { propIncludes } from "@shared/lib";
import { getBoardDetailItem } from "./getBoardDetailItem";

export const selectDetailItems = createSelector(
	[(_, ids: number[]) => ids, selectInvestigatorBoards],
	(boardIds, boards) => {
		const data = boards.filter(propIncludes("id", boardIds));

		return data.map(getBoardDetailItem);
	},
);
