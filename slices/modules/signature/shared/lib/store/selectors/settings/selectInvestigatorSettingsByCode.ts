import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorSettings } from "../../signatures";

export const selectInvestigatorSettingsByCode = (code: string) =>
	createSelector([selectInvestigatorSettings], (settings) => {
		return settings?.[code] || {};
	});
