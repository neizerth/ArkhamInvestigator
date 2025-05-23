import {
	getBoardStats,
	goBack,
	mergeBoardStats,
	selectCurrentBoard,
	selectInvestigatorSettingsByCode,
	selectReplaceInvestigator,
	setBoard,
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
		const { signatureGroupId } = board;

		const { physicalTrauma = 0, mentalTrauma = 0 } =
			selectInvestigatorSettingsByCode(signatureGroupId)(state);

		const investigator = selection.signature;
		const stats = getBoardStats(investigator);

		const additionalAction = Boolean(investigator.additionalAction);

		const initialValue: InvestigatorBoardValues = {
			...board.initialValue,
			...stats,
			additionalAction,
		};

		const baseValue = {
			...initialValue,
		};

		const merged = mergeBoardStats(board, baseValue);

		const initStats = replace
			? {}
			: {
					health: Math.max(0, stats.health - physicalTrauma),
					sanity: Math.max(0, stats.sanity - mentalTrauma),
				};

		const value = {
			...merged,
			...initStats,
			additionalAction,
		};

		const updatedBoard: InvestigatorBoard = {
			...board,
			investigator,
			image: selection.image,
			signatureGroupId: selection.signatureGroupId,
			skinId: selection.skin?.id,

			initialValue,
			baseValue,
			value,

			history: [],
			historyIndex: -1,
			checkHistory: [],
			usedAbilities: [],
		};

		dispatch(setBoard(updatedBoard));

		if (!replace) {
			return;
		}
		dispatch(setReplaceInvestigator(false));
		dispatch(goBack());
	};
