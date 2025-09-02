import { boardBackgroundUpdated } from "@modules/board/base/entities/background/updateBoardBackground";
import {
	selectBoardById,
	setBoardProgress,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof boardBackgroundUpdated>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.loaded) {
		return;
	}

	yield put(
		setBoardProgress({
			boardId,
			progress: 100,
		}),
	);
}

export function* loadBoardOnBackgroundUpdateSaga() {
	yield takeEvery(boardBackgroundUpdated.match, worker);
}
