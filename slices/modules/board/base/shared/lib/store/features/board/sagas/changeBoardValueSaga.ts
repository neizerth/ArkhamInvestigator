import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import { type ChangeBoardValuePayload, changeBoardValue } from "../actions";
import { changeBoardPropValue } from "../actions/changeBoardPropValue";
import { setBoardValueInternal } from "../board";

function* changeBoardValueSaga<K extends Key>() {
	const action: ChangeBoardValuePayload<K> = yield take(
		changeBoardPropValue.match,
	);

	yield put(setBoardValueInternal(action));
}

export function* watchChangeBoardValueSaga() {
	yield takeEvery(changeBoardValue.match, changeBoardValueSaga);
}
