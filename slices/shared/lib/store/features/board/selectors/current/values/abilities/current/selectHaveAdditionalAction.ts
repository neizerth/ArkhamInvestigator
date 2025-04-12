import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoardProp } from "../../../props";

export const selectHaveAdditionalAction = createSelector(
	[selectCurrentBoardProp("investigator")],
	(investigator) => investigator.additionalAction === true,
);
