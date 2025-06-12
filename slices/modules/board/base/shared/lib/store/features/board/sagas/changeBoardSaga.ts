import { put, take, takeEvery } from "redux-saga/effects";
import { changeBoardValue } from "../actions";
import type { ChangeBoardPayload } from "../actions";
import { setBoardInternal } from "../board";

function* changeBoardSaga() {
	const action: ChangeBoardPayload = yield take(changeBoardValue.match);

	yield put(setBoardInternal(action));
}

export function* watchChangeBoardSaga() {
	yield takeEvery(changeBoardValue.match, changeBoardSaga);
}
