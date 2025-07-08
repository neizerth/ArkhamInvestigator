import type { AppThunk } from "@shared/model";

import {
	isBoardExists,
	selectBoardById,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import type {
	InvestigatorBoard,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { selectCleanInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";
import { omit } from "ramda";
import { getBoardValueFromHistory } from "../../getBoardValueFromHistory";

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

		const historyItems =
			historyIndex === -1 ? [] : history.slice(0, historyIndex + 1);
		const lastItem = history[historyIndex];

		const values = getBoardValueFromHistory({
			board: cleanBoard,
			historyItems,
		});

		const boardProps = lastItem
			? omit(["id"], lastItem)
			: {
					usedAbilities: cleanBoard.initialUsedAbilities,
				};
		const data: InvestigatorBoard = {
			...board,
			...boardProps,
			...values,
			historyIndex,
		};

		dispatch(
			setBoardPart({
				boardId,
				data,
				history: false,
			}),
		);
	};
