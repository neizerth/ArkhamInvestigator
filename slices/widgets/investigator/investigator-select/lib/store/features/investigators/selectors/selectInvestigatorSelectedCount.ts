import { createSelector } from "@reduxjs/toolkit";
import { selectSelectedInvestigators } from "@shared/lib";
import { propEq } from "ramda";

export const selectInvestigatorSelectedCount = (code: string) =>
	createSelector(
		[selectSelectedInvestigators],
		(investigators) => investigators.filter(propEq(code, "code")).length,
	);
