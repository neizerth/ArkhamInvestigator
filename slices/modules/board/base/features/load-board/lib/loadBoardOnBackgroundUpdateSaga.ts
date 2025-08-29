import { boardBackgroundUpdated } from "@modules/board/base/entities/background/updateBoardBackground";
import { selectBoardById, setBoardProp } from "@modules/board/base/shared/lib";
import { delay, put, select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof boardBackgroundUpdated>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.loaded) {
		return;
	}

	yield delay(1000);

	yield put(
		setBoardProp({
			boardId: board.id,
			prop: "loaded",
			value: true,
		}),
	);
}

export function* loadBoardOnBackgroundUpdateSaga() {
	yield takeEvery(boardBackgroundUpdated.match, worker);
}
