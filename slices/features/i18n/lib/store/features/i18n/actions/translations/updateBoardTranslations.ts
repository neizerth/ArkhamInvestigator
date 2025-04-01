import { translateInvestigator } from "@features/i18n/lib/translateInvestigator";
import type { AppThunk } from "@shared/lib";
import { propEq } from "ramda";
import {
	selectInvestigatorBoards,
	setInvestigatorBoards,
} from "../../../../../../../../shared/lib/store/features/board/board";
import { selectInvestigatorSources } from "../../../../../../../../shared/lib/store/features/investigators/investigatorSources/investigatorSources";
import { selectInvestigatorTranslations } from "../../i18n";

export const updateBoardTranslations = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const investigators = selectInvestigatorSources(state);
	const boards = selectInvestigatorBoards(state);
	const translations = selectInvestigatorTranslations(state);

	const data = boards.map((item) => {
		const investigator = investigators.find(
			propEq(item.investigator.code, "code"),
		);

		if (!investigator) {
			return item;
		}

		return {
			...item,
			investigator: translateInvestigator(investigator, translations),
		};
	});

	dispatch(setInvestigatorBoards(data));
};
