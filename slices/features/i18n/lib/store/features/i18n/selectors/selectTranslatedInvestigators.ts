import { translateInvestigator } from "@features/i18n/lib/translateInvestigator";
import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorSources } from "../../../../../../../shared/lib/store/features/investigators/investigatorSources";
import { selectInvestigatorTranslations } from "../i18n";

export const selectTranslatedInvestigators = createSelector(
	[selectInvestigatorSources, selectInvestigatorTranslations],
	(sources, translations) =>
		sources.map((item) => {
			return translateInvestigator(item, translations);
		}),
);
