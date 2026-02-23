import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { propIncludes } from "@shared/lib";
import type { RootState } from "@shared/model";
import { prop } from "ramda";
import { shallowEqual } from "react-redux";

export const selectDisabledSignatureGroupIds =
	(disabledBoardIds: number[]) => (state: RootState) =>
		select(state, disabledBoardIds);

const select = createSelector(
	[
		(_, disabledBoardIds: number[]) => disabledBoardIds,
		selectInvestigatorBoards,
	],
	(disabledBoardIds, boards) => {
		const data = boards.filter(propIncludes("id", disabledBoardIds));
		return data.map(prop("signatureGroupId"));
	},
	{
		memoizeOptions: {
			resultEqualityCheck: shallowEqual,
		},
	},
);
