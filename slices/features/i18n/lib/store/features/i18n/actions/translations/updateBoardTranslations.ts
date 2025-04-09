import { translateInvestigator } from "@features/i18n/lib/translateInvestigator";
import {
	propIncludes,
	selectInvestigatorBoards,
	selectInvestigatorSources,
	selectSelectedInvestigators,
	setInvestigatorBoards,
	setSelectedInvestigators,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import type { InvestigatorSource } from "@shared/model";
import { isNotNil, omit } from "ramda";
import { selectInvestigatorTranslations } from "../../i18n";

const getCode = ({
	investigator,
}: {
	investigator: InvestigatorSource;
}) => investigator.code;

export const updateBoardTranslations = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const boards = selectInvestigatorBoards(state);
	const boardCodes = boards
		.map(getCode)
		.concat(boards.flatMap(({ details }) => details.alternate.map(getCode)));

	const sources = selectInvestigatorSources(state)
		.filter(propIncludes("code", boardCodes))
		.reduce((target, item) => {
			target.set(item.code, item);
			return target;
		}, new Map());

	const translations = selectInvestigatorTranslations(state);
	const selected = selectSelectedInvestigators(state);

	const translateByCode = (code?: string) => {
		const empty = {
			translated: [],
		};

		if (!code) {
			return empty;
		}
		const investigator = sources.get(code);

		if (!investigator) {
			return empty;
		}

		return translateInvestigator(investigator, translations);
	};

	const data = boards.map((board) => {
		const { code } = board.investigator;

		const investigator = {
			...board.investigator,
			...translateByCode(code),
		};

		const detailsInvestigator = {
			...board.details.investigator,
			...translateByCode(board.details.investigator.code),
		};

		const details = {
			...board.details,
			investigator: omit(["translated"], detailsInvestigator),
			alternate: board.details.alternate.map((item) => ({
				...item,
				investigator: {
					...item.investigator,
					...translateByCode(item.investigator.code),
				},
			})),
		};

		const selection = {
			...board.selection,
			details,
		};

		return {
			...board,
			investigator,
			details,
			selection,
		};
	});

	const selectedData = selected
		.map(
			({ code }) =>
				boards.find(({ investigator }) => investigator.code === code)
					?.selection,
		)
		.filter(isNotNil);

	dispatch(setInvestigatorBoards(data));
	dispatch(setSelectedInvestigators(selectedData));
};
