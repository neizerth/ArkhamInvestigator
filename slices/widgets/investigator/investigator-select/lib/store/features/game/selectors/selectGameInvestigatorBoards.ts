import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import {
	selectInvestigatorSettings,
	selectSelectedInvestigators,
} from "@shared/lib";

export const selectGameInvestigatorBoards = createSelector(
	[selectSelectedInvestigators, selectInvestigatorSettings],
	(selectedInvestigators, settings = {}) => {
		return selectedInvestigators.map((selection, index) => {
			const investigatorSettings = settings?.[selection.code] || {};

			return createInvestigatorBoard({
				...selection,
				...investigatorSettings,
				investigator: selection.signature,
				id: index + 1,
				index,
			});
		});
	},
);
