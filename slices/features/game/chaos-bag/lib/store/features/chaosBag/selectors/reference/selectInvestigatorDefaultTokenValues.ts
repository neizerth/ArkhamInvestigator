import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoardProp } from "@shared/lib";
import { getDefaultReferenceTokenValues } from "../../../../../reference/getDefaultReferenceTokenValues";

export const selectInvestigatorDefaultTokenValues = createSelector(
	[selectCurrentBoardProp("investigator")],
	(investigator) => getDefaultReferenceTokenValues(investigator.tokens),
);
