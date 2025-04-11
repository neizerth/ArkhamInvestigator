import { createSelector } from "@reduxjs/toolkit";
import {
	selectInvestigatorMedia,
	selectSelectedInvestigators,
	selectSignatures,
} from "@shared/lib";
import { getInvestigatorBoards } from "../../../../board";

export const selectGameInvestigatorBoards = createSelector(
	[selectSelectedInvestigators, selectInvestigatorMedia, selectSignatures],
	(selectedInvestigators, mediaItems, investigators) =>
		getInvestigatorBoards({
			selectedInvestigators,
			mediaItems,
			investigators,
		}),
);
