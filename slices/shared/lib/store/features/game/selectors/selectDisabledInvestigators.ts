import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectReplaceCode } from "./selectReplaceCode";

export const selectDisabledInvestigators = createSelector(
	[selectReplaceCode, selectInvestigatorBoards],
	(replaceCode, boards) => {
		if (!replaceCode) {
			return [];
		}

		return boards
			.filter(({ investigator }) => {
				return !investigator.multiselect && investigator.code !== replaceCode;
			})
			.map(prop("investigator"));
	},
);
