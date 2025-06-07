import { createSelector } from "@reduxjs/toolkit";
import { selectBoardByCode } from "@shared/lib";
import { getDefaultReferenceTokenValues } from "../../../../../../reference/getDefaultReferenceTokenValues";

export const selectInvestigatorDefaultTokenValues = (code: string) =>
	createSelector([selectBoardByCode(code)], (board) => {
		if (!board) {
			return {};
		}
		const { investigator } = board;

		return getDefaultReferenceTokenValues(investigator.tokens);
	});
