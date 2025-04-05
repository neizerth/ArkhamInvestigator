import { selectTranslatedInvestigators } from "@features/i18n";
import { createSelector } from "@reduxjs/toolkit";
import {
	selectInvestigatorMedia,
	selectSelectedInvestigators,
} from "@shared/lib";
import { getInvestigatorBoards } from "@widgets/investigator/investigator-select/lib/board";

export const selectGameInvestigatorBoards = createSelector(
	[
		selectSelectedInvestigators,
		selectInvestigatorMedia,
		selectTranslatedInvestigators,
	],
	(selectedInvestigators, mediaItems, investigators) =>
		getInvestigatorBoards({
			selectedInvestigators,
			mediaItems,
			investigators,
		}),
);
