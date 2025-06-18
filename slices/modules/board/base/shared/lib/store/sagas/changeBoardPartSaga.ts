import { put, take } from "redux-saga/effects";
import { changeBoardValuePart } from "../actions";
import type { ChangeBoardPartPayload } from "../actions";
import { setBoardPartInternal } from "../board";

export function* watchChangeBoardPartSaga() {
	const payload: ChangeBoardPartPayload = yield take(
		changeBoardValuePart.match,
	);
	yield put(setBoardPartInternal(payload));
}
