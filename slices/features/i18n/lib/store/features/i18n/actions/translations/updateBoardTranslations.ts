import {
	selectInvestigatorBoards,
	selectSignatureGroups,
	setInvestigatorBoards,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";
import { propEq } from "ramda";

const getCode = ({
	investigator,
}: {
	investigator: InvestigatorSignature;
}) => investigator.code;

export const updateBoardTranslations = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const boards = selectInvestigatorBoards(state);

	const groups = selectSignatureGroups(state);

	const data = boards.map((board) => {
		const group = groups.find(propEq(board.signatureGroupId, "id"));
		const signature = group?.signatures.find(
			propEq(board.investigator.id, "id"),
		);

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
