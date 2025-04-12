import { createSelector } from "@reduxjs/toolkit";
import { selectSelectedInvestigators } from "@shared/lib";
import { getInvestigatorBoard } from "../../../../board";

export const selectGameInvestigatorBoards = createSelector(
	[selectSelectedInvestigators],
	(selectedInvestigators) =>
		selectedInvestigators.map((selection, index) =>
			getInvestigatorBoard({
				selection,
				id: index + 1,
			}),
		),
);
