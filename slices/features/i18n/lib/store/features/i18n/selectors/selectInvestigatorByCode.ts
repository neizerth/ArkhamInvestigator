import { createSelector } from "@reduxjs/toolkit";
import { selectSignatures } from "@shared/lib";
import { propEq } from "ramda";

export const selectInvestigatorByCode = (code: string) =>
	createSelector([selectSignatures], (investigators) =>
		investigators.find(propEq(code, "code")),
	);
