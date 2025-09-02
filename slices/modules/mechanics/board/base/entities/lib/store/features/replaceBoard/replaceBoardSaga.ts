import {
	isBoardExists,
	selectBoardById,
	setBoard,
} from "@modules/board/base/shared/lib";
import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { put, select, takeEvery } from "redux-saga/effects";
import { mergeInvestigatorBoards } from "../../../mergeInvestigatorBoards";
import { replaceBoard } from "./replaceBoard";

function* worker({ payload }: ReturnType<typeof replaceBoard>) {
	const { boardId, board } = payload;

	const boardSelector = selectBoardById(boardId);

	const sourceBoard: ReturnType<typeof boardSelector> =
		yield select(boardSelector);

	if (!isBoardExists(sourceBoard)) {
		return;
	}

	const boardData = mergeInvestigatorBoards({
		sourceBoard,
		targetBoard: board,
		keepActions: false,
		keepClues: false,
		keepResources: false,
	});

	const data: InvestigatorBoard = {
		...boardData,
		loaded: false,
		loadProgress: 0,
		background: null,
		gameTextSize: null,
	};

	yield put(
		setBoard({
			boardId,
			data,
			history: false,
		}),
	);
}

export function* replaceBoardSaga() {
	yield takeEvery(replaceBoard.match, worker);
}
