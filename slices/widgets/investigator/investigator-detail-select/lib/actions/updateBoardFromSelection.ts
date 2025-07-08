import {
	isBoardExists,
	selectCurrentBoard,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import type {
	InvestigatorBoard,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import {
	getBoardStats,
	goBack,
	mergeBoardStats,
	selectInvestigatorSettingsByCode,
	selectReplaceInvestigator,
	setReplaceInvestigator,
} from "@shared/lib";
import type { AppThunk, SelectedInvestigator } from "@shared/model";

export const updateBoardFromSelection =
	(selection: SelectedInvestigator): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		const replace = selectReplaceInvestigator(state);

		if (!isBoardExists(board)) {
			return;
		}
		const { signatureGroupId } = board;

		const { physicalTrauma = 0, mentalTrauma = 0 } =
			selectInvestigatorSettingsByCode(signatureGroupId)(state);

		const investigator = selection.signature;
		const stats = getBoardStats(investigator);

		const initialValue: InvestigatorBoardValues = {
			...board.initialValue,
			...stats,
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

		dispatch(
			setBoardPart({
				boardId: board.id,
				data: updatedBoard,
			}),
		);

		if (!replace) {
			return;
		}
		dispatch(setReplaceInvestigator(false));
		dispatch(goBack());
	};
