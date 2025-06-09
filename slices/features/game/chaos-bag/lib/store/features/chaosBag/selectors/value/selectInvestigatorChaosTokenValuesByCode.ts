import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorChaosTokenValue } from "../../chaosBag";

export const selectInvestigatorChaosTokenValuesByCode = (code: string) =>
	createSelector([selectInvestigatorChaosTokenValue], (value) => {
		if (!value) {
			return {};
		}
		return value[code] || {};
	});
