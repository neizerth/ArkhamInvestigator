import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSelectedInvestigators } from "../game";

export const selectSelectedInvestigatorByCode = (code: string) =>
	createSelector([selectSelectedInvestigators], (investigators) =>
		investigators.find(propEq(code, "code")),
	);
