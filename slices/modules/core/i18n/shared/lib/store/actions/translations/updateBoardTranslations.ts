import {
	selectInvestigatorBoards,
	selectSignatureGroups,
	setInvestigatorBoards,
	whereId,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const updateBoardTranslations = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const boards = selectInvestigatorBoards(state);

	const groups = selectSignatureGroups(state);

	const data = boards.map((board) => {
		const group = groups.find(whereId(board.signatureGroupId));
		const signature = group?.signatures.find(whereId(board.investigator.id));

		if (!signature) {
			return board;
		}

		return {
			...board,
			investigator: signature,
		};
	});

	dispatch(setInvestigatorBoards(data));
};
