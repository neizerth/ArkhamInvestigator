import type { AppThunk } from "@shared/model";

import {
	isBoardExists,
	selectBoardById,
	setBoard,
} from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { getBoardFromHistory } from "@modules/board/history/shared/lib";
import { selectCleanInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";

type Options = PropsWithBoardId & {
	historyIndex: number;
};

export const setValueFromHistoryIndex =
	({ historyIndex, boardId }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);
		const cleanBoard = selectCleanInvestigatorBoard(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}

		const { history } = board;

		const data = getBoardFromHistory({
			cleanBoard,
			board,
			history,
			historyIndex,
		});

		dispatch(
			setBoard({
				boardId,
				data,
				history: false,
			}),
		);
	};
