import {
	isBoardExists,
	selectCurrentBoard,
	setBoard,
} from "@modules/board/base/shared/lib";
import { goBack } from "@modules/core/router/shared/lib";
import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";
import { selectInvestigatorSettingsByCode } from "@modules/signature/base/shared/lib";
import { selectReplaceInvestigator, setReplaceInvestigator } from "@shared/lib";
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

		const updatedBoard = createInvestigatorBoard({
			id: board.id,
			index: board.index,
			investigator,
			signatureGroupId: selection.signatureGroupId,
			image: selection.image,
			skinId: selection.skin?.id,

			physicalTrauma,
			mentalTrauma,
		});

		dispatch(
			setBoard({
				boardId: board.id,
				data: updatedBoard,
				history: false,
			}),
		);

		if (!replace) {
			return;
		}
		dispatch(setReplaceInvestigator(false));
		dispatch(goBack());
	};
