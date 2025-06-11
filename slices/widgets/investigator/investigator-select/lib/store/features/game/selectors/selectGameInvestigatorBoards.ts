import { createSelector } from "@reduxjs/toolkit";
import {
	selectInvestigatorSettings,
	selectSelectedInvestigators,
} from "@shared/lib";
import { getInvestigatorBoard } from "../../../../board";

export const selectGameInvestigatorBoards = createSelector(
	[selectSelectedInvestigators, selectInvestigatorSettings],
	(selectedInvestigators, settings = {}) => {
		return selectedInvestigators.map((selection, index) => {
			const investigatorSettings = settings?.[selection.code] || {};

			return getInvestigatorBoard({
				selection,
				index,
				...investigatorSettings,
			});
		});
	},
);
