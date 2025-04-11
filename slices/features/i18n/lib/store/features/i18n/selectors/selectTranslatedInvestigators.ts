import { createSelector } from "@reduxjs/toolkit";
import { selectSignatures } from "@shared/lib";
import { translateInvestigator } from "../../../../translateInvestigator";
import { selectInvestigatorTranslations } from "../i18n";

export const selectTranslatedInvestigators = createSelector(
	[selectSignatures, selectInvestigatorTranslations],
	(sources, translations) =>
		sources.map((item) => {
			return translateInvestigator(item, translations);
		}),
);
