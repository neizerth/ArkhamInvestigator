import {
	isBoardExists,
	selectBoardById,
	setBoard,
} from "@modules/board/base/shared/lib";
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

	const data = mergeInvestigatorBoards({
		sourceBoard,
		targetBoard: board,
		keepActions: false,
		keepClues: false,
		keepResources: false,
	});

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
