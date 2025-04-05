import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectTranslatedInvestigators } from "./selectTranslatedInvestigators";

export const selectInvestigatorByCode = (code: string) =>
	createSelector([selectTranslatedInvestigators], (investigators) =>
		investigators.find(propEq(code, "code")),
	);
