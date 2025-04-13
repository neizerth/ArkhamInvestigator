import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorSettings } from "@shared/model";
import { selectInvestigatorSettingsByCode } from "./selectInvestigatorSettingsByCode";

export const selectInvestigatorSettingsProp = <
	T extends keyof InvestigatorSettings,
>(
	code: string,
	prop: T,
	defaultValue?: InvestigatorSettings[T],
) =>
	createSelector([selectInvestigatorSettingsByCode(code)], (settings) => {
		return settings?.[prop] || defaultValue;
	});
