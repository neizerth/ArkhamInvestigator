import { createSelector } from "@reduxjs/toolkit";
import {
	selectInvestigatorMedia,
	selectInvestigatorSources,
	selectSelectedInvestigators,
} from "@shared/lib";
import { getInvestigatorBoards } from "@widgets/investigator/investigator-select/lib/board";

export const selectGameInvestigatorBoards = createSelector(
	[
		selectSelectedInvestigators,
		selectInvestigatorMedia,
		selectInvestigatorSources,
	],
	(selectedInvestigators, mediaItems, investigators) =>
		getInvestigatorBoards({
			selectedInvestigators,
			mediaItems,
			investigators,
		}),
);
