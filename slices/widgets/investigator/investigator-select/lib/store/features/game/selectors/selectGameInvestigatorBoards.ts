import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";
import {
	selectInvestigatorSettings,
	selectSelectedInvestigators,
} from "@shared/lib";
import type { RootState } from "@shared/model";

export const selectGameInvestigatorBoards = (state: RootState) => {
	const selectedInvestigators = selectSelectedInvestigators(state);
	const settings = selectInvestigatorSettings(state) || {};
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
};
