import { selectTranslatedInvestigators } from "@features/i18n/lib/store/features/i18n/selectors/selectTranslatedInvestigators";
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
