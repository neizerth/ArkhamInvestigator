import { translateInvestigator } from "@features/i18n/lib/translateInvestigator";
import type { AppThunk } from "@shared/lib";
import { omit } from "ramda";
import {
	selectInvestigatorBoards,
	setInvestigatorBoards,
} from "../../../../../../../../shared/lib/store/features/board/board";
import { selectInvestigatorSources } from "../../../../../../../../shared/lib/store/features/investigators/investigatorSources/investigatorSources";
import { propIncludes } from "../../../../../../../../shared/lib/util/criteria";
import {
	selectArkhamDBInvestigators,
	selectInvestigatorTranslations,
} from "../../i18n";

export const updateBoardTranslations = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const boards = selectInvestigatorBoards(state);
	const boardCodes = boards.map(({ investigator }) => investigator.code);

	const arkhamSources = selectArkhamDBInvestigators(state)
		.filter(propIncludes("code", boardCodes))
		.reduce((target, item) => {
			target.set(item.code, item);
			return target;
		}, new Map());

	const sources = selectInvestigatorSources(state)
		.filter(propIncludes("code", boardCodes))
		.reduce((target, item) => {
			target.set(item.code, item);
			return target;
		}, new Map());

	const translations = selectInvestigatorTranslations(state);

	const data = boards.map((item) => {
		const { code } = item.investigator;
		const investigator = sources.get(code);

		const source = {
			...investigator,
			...(arkhamSources.get(code) || {}),
		};

		const translatedInvestigator = translateInvestigator(source, translations);

		return {
			...item,
			investigator: translatedInvestigator,
			details: {
				...item.details,
				investigator: omit(["translated"], translatedInvestigator),
			},
		};
	});

	dispatch(setInvestigatorBoards(data));
};
