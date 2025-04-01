import { selectInvestigatorTranslations } from "@features/i18n";
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
		selectInvestigatorTranslations,
	],
	(
		selectedInvestigators,
		mediaItems,
		investigators,
		investigatorTranslations,
	) =>
		getInvestigatorBoards({
			selectedInvestigators,
			mediaItems,
			investigators,
			investigatorTranslations,
		}),
);
