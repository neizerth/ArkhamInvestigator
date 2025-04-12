import {
	getBoardStats,
	goBack,
	mergeBoardStats,
	selectCurrentBoard,
	selectReplaceInvestigator,
	setCurrentBoard,
	setReplaceInvestigator,
} from "@shared/lib";
import type {
	AppThunk,
	InvestigatorBoard,
	InvestigatorBoardValues,
	SelectedInvestigator,
} from "@shared/model";

export const updateBoardFromSelection =
	(selection: SelectedInvestigator): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		const replace = selectReplaceInvestigator(state);

		if (!board) {
			return;
		}
		const investigator = selection.signature;
		const stats = getBoardStats(investigator);

		const additionalAction = Boolean(investigator.additionalAction);

		const baseValue: InvestigatorBoardValues = {
			...board.initialValue,
			...stats,
			additionalAction,
		};

		const value = {
			...mergeBoardStats(board, baseValue),
			additionalAction,
		};

		const updatedBoard: InvestigatorBoard = {
			...board,
			investigator,
			image: selection.image,
			signatureGroupId: selection.signatureGroupId,
			skinId: selection.skin?.id,

			initialValue: baseValue,
			baseValue,
			value,

			history: [],
			historyIndex: -1,
			checkHistory: [],
		};

		dispatch(setCurrentBoard(updatedBoard));

		if (!replace) {
			return;
		}
		dispatch(setReplaceInvestigator(false));
		dispatch(goBack());
	};
