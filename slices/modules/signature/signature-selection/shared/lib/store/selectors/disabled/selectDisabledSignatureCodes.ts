import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectDisabledSignatures } from "./selectDisabledSignatures";

export const selectDisabledSignatureCodes = createSelector(
	[selectDisabledSignatures],
	(disabledInvestigators) => {
		return disabledInvestigators.map(prop("code"));
	},
);
