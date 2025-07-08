import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { setValueFromHistoryIndex } from "./setBoardFromHistoryIndex";

type Options = PropsWithBoardId & {
	delta: number;
};

export const setBoardFromHistoryDelta =
	({ delta, boardId }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}

		const index = board.historyIndex + delta;

		const historyIndex = Math.min(
			Math.max(-1, index),
			board.history.length - 1,
		);

		dispatch(
			setValueFromHistoryIndex({
				boardId,
				historyIndex,
			}),
		);
	};
