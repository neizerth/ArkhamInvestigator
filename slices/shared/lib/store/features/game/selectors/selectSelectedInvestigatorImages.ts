import { createSelector } from "@reduxjs/toolkit";
import { selectSelectedInvestigators } from "../game";

export const selectSelectedInvestigatorImages = createSelector(
	[selectSelectedInvestigators],
	(investigators) => {
		return investigators.reduce(
			(acc, investigator) => {
				acc[investigator.code] = investigator.image.id;
				return acc;
			},
			{} as Record<string, string>,
		);
	},
);
