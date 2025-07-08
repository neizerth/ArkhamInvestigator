import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";

export const selectIsInvestigatorDisabled = (code: string) =>
	createSelector([selectInvestigatorBoards], (boards) =>
		boards.some(propEq(code, "signatureGroupId")),
	);
