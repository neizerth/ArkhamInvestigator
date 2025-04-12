import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorBoards } from "@shared/lib";
import { propEq } from "ramda";

export const selectIsInvestigatorDisabled = (code: string) =>
	createSelector([selectInvestigatorBoards], (boards) =>
		boards.some(propEq(code, "signatureGroupId")),
	);
