import type { BoardKey } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import { type ChangeBoardPropPayload, changeBoardProp } from "../actions";
import { setBoardPropInternal } from "../board";

function* changeBoardPropSaga<K extends BoardKey>() {
	const action: ChangeBoardPropPayload<K> = yield take(changeBoardProp.match);

	yield put(setBoardPropInternal(action));
}

export function* watchChangeBoardPropSaga() {
	yield takeEvery(changeBoardProp.match, changeBoardPropSaga);
}
