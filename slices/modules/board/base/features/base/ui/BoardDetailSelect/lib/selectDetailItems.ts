import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { propIncludes } from "@shared/lib";
import type { RootState } from "@shared/model";
import { shallowEqual } from "react-redux";
import { getBoardDetailItem } from "./getBoardDetailItem";

export const selectDetailItems = (ids: number[]) => (state: RootState) =>
	select(state, ids);

const select = createSelector(
	[(_, ids: number[]) => ids, selectInvestigatorBoards],
	(boardIds, boards) => {
		const data = boards.filter(propIncludes("id", boardIds));

		return data.map(getBoardDetailItem);
	},
	{
		memoizeOptions: {
			resultEqualityCheck: shallowEqual,
		},
	},
);
