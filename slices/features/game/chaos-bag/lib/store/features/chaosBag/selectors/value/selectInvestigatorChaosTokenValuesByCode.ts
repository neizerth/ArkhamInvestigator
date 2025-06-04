import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorChaosTokenValue } from "../../chaosBag";

export const selectInvestigatorChaosTokenValuesByCode = (code?: string) =>
	createSelector([selectInvestigatorChaosTokenValue], (value) => {
		if (!value || !code) {
			return {};
		}
		return value[code] || {};
	});
