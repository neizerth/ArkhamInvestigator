import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectSelectedInvestigators } from "../game";

export const selectSelectedInvestigatorCodes = createSelector(
	[selectSelectedInvestigators],
	(investigators) => {
		return investigators.map(prop("code"));
	},
);
