import { createSelector } from "@reduxjs/toolkit";
import { selectSelectedInvestigators } from "../game";

export const selectSelectedInvestigatorCount = createSelector(
	[selectSelectedInvestigators],
	(investigators) => {
		return investigators.reduce(
			(acc, investigator) => {
				acc[investigator.code] = acc[investigator.code] || 0;
				acc[investigator.code]++;
				return acc;
			},
			{} as Record<string, number>,
		);
	},
);
