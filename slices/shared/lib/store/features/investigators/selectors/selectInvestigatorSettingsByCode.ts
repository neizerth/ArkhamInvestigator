import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorSettings } from "../investigators";

export const selectInvestigatorSettingsByCode = (code: string) =>
	createSelector([selectInvestigatorSettings], (settings) => {
		return settings?.[code];
	});
