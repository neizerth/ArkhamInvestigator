import { createSelector } from "@reduxjs/toolkit";
import { selectBoardByCode } from "@shared/lib";
import { selectBoardChaosTokenValue } from "../../chaosBag";

export const selectInvestigatorChaosTokenValuesByCode = (code: string) =>
	createSelector(
		[selectBoardChaosTokenValue, selectBoardByCode(code)],
		(value, boardId) => {
			if (!value || typeof boardId !== "number") {
				return {};
			}
			return value[boardId] || {};
		},
	);
