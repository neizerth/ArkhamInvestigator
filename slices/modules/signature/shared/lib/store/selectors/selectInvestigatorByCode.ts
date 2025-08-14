import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSignatureGroups } from "../signatures";

export const selectInvestigatorByCode = (code: string) =>
	createSelector([selectSignatureGroups], (groups) =>
		groups.find(propEq(code, "code")),
	);
