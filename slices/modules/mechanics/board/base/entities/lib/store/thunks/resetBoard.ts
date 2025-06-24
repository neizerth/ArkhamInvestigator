import { selectBoardById, setBoard } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectInvestigatorSettingsByCode } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { createInvestigatorBoard } from "../../createInvestigatorBoard";

export const resetBoard =
	(boardId: BoardId): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!board) {
			return;
		}

		const { physicalTrauma = 0, mentalTrauma = 0 } =
			selectInvestigatorSettingsByCode(board.signatureGroupId)(state);

		const data = createInvestigatorBoard({
			...board,
			physicalTrauma,
			mentalTrauma,
		});

		dispatch(
			setBoard({
				boardId,
				data,
				history: false,
			}),
		);
	};

export const resetCurrentBoard = (): AppThunk => (dispatch) =>
	dispatch(resetBoard("current"));
