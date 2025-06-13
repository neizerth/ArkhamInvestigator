import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import {
	type ChangeBoardValuePartPayload,
	changeBoardValuePart,
} from "../actions";
import { changeBoardPropValue } from "../actions/changeBoardPropValue";
import { setBoardValuePartInternal } from "../board";

function* changeBoardValuePartSaga<K extends Key>() {
	const action: ChangeBoardValuePartPayload<K> = yield take(
		changeBoardPropValue.match,
	);

	yield put(setBoardValuePartInternal(action));
}

export function* watchChangeBoardValuePartSaga() {
	yield takeEvery(changeBoardValuePart.match, changeBoardValuePartSaga);
}
