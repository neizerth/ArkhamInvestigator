import { selectBoardProp, setBoardProp } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	gameTextHeightUpdated,
	updateGameTextHeight,
} from "./updateGameTextHeight";

function* worker({ payload }: ReturnType<typeof updateGameTextHeight>) {
	const { boardId, value } = payload;
	const heightSelector = selectBoardProp({
		boardId,
		prop: "gameTextHeight",
	});
	const height: ReturnType<typeof heightSelector> =
		yield select(heightSelector);

	if (height || height === value) {
		return;
	}

	yield put(
		setBoardProp({
			boardId,
			prop: "gameTextHeight",
			value,
		}),
	);

	yield put(gameTextHeightUpdated(payload));
}

export function* updateGameTextHeightSaga() {
	yield takeEvery(updateGameTextHeight.match, worker);
}
