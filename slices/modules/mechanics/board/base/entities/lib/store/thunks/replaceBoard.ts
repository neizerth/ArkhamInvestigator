import { selectBoardById, setBoard } from "@modules/board/base/shared/lib";
import type {
	BoardId,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { mergeInvestigatorBoards } from "../../mergeInvestigatorBoards";

export type ReplaceBoardPayload = {
	boardId: BoardId;
	board: InvestigatorBoard;
};

export const replaceBoard =
	(payload: ReplaceBoardPayload): AppThunk =>
	(dispatch, getState) => {
		const { board, boardId } = payload;

		const state = getState();
		const sourceBoard = selectBoardById(boardId)(state);

		if (!sourceBoard) {
			return;
		}

		const data = mergeInvestigatorBoards({
			sourceBoard,
			targetBoard: board,
			keepActions: false,
			keepClues: false,
			keepResources: false,
		});

		dispatch(
			setBoard({
				boardId,
				data,
				history: false,
			}),
		);
	};

export type ReplaceCurrentBoardPayload = Omit<ReplaceBoardPayload, "boardId">;

export const replaceCurrentBoard =
	(payload: ReplaceCurrentBoardPayload): AppThunk =>
	(dispatch) =>
		dispatch(
			replaceBoard({
				...payload,
				boardId: "current",
			}),
		);
