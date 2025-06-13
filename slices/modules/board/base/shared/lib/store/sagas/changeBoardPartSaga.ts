import { put, take, takeEvery } from "redux-saga/effects";
import { changeBoardValuePart } from "../actions";
import type { ChangeBoardPartPayload } from "../actions";
import { setBoardPartInternal } from "../board";

function* changeBoardPartSaga() {
	const action: ChangeBoardPartPayload = yield take(changeBoardValuePart.match);
	yield put(setBoardPartInternal(action));
}

export function* watchChangeBoardPartSaga() {
	yield takeEvery(changeBoardValuePart.match, changeBoardPartSaga);
}
