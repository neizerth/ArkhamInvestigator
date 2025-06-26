import { createSelector } from "@reduxjs/toolkit";
import { selectBoardByCode } from "@shared/lib";
import { selectInvestigatorChaosTokenValue } from "../../chaosBag";

export const selectInvestigatorChaosTokenValuesByCode = (code: string) =>
	createSelector(
		[selectInvestigatorChaosTokenValue, selectBoardByCode(code)],
		(value, boardId) => {
			if (!value || typeof boardId !== "number") {
				return {};
			}
			return value[boardId] || {};
		},
	);
