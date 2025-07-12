import { selectBoardInvestigatorSettings } from "@modules/board/base/entities/lib";
import {
	isBoardExists,
	selectBoardById,
	setBoard,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { createInvestigatorBoard } from "../../../createInvestigatorBoard";
import { resetBoard } from "./resetBoard";

function* worker({ payload }: ReturnType<typeof resetBoard>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);

	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (!isBoardExists(board)) {
		return;
	}

	const settingsSelector = selectBoardInvestigatorSettings(boardId);

	const {
		physicalTrauma = 0,
		mentalTrauma = 0,
	}: ReturnType<typeof settingsSelector> = yield select(settingsSelector);

	const data = createInvestigatorBoard({
		...board,
		physicalTrauma,
		mentalTrauma,
	});

	yield put(
		setBoard({
			boardId,
			data,
			history: false,
		}),
	);
}

export function* resetBoardSaga() {
	yield takeEvery(resetBoard.match, worker);
}
