import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorSettingsProp } from "./selectInvestigatorSettingsProp";

export const selectInvestigatorCounterEnabled = (
	code: string,
	abilityId: string,
) =>
	createSelector(
		[selectInvestigatorSettingsProp(code, "counters")],
		(counters) => counters?.[abilityId] ?? false,
	);
