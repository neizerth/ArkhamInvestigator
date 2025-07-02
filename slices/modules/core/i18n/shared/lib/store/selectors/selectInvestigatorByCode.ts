import { createSelector } from "@reduxjs/toolkit";
import { selectSignatureGroups } from "@shared/lib";
import { propEq } from "ramda";

export const selectInvestigatorByCode = (code: string) =>
	createSelector([selectSignatureGroups], (groups) =>
		groups.find(propEq(code, "code")),
	);
