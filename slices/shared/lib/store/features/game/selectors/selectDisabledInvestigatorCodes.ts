import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectDisabledInvestigators } from "./selectDisabledInvestigators";

export const selectDisabledInvestigatorCodes = createSelector(
	[selectDisabledInvestigators],
	(disabledInvestigators) => {
		return disabledInvestigators.map(prop("code"));
	},
);
