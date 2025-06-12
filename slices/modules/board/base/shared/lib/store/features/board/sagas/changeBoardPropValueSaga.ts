import type { InvestigatorBoardStat as Key } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "../actions/changeBoardPropValue";
import { setBoardValuePropInternal } from "../board";

function* changeBoardPropValueSaga<K extends Key>() {
	const action: ChangeBoardPropValuePayload<K> = yield take(
		changeBoardPropValue.match,
	);

	yield put(setBoardValuePropInternal(action));
}

export function* watchChangeBoardPropValueSaga() {
	yield takeEvery(changeBoardPropValue.match, changeBoardPropValueSaga);
}
